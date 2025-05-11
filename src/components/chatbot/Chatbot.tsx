import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, ArrowUp, Sun } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Xin chào! Tôi là trợ lý ảo của Solar Diệp Châu. Tôi có thể giúp gì cho bạn về các sản phẩm năng lượng mặt trời?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Prepare conversation history for the API
      const conversationHistory = messages.map(msg => ({
        role: msg.isUser ? 'user' : 'model',
        parts: [{ text: msg.text }],
      }));

      // Add the current user input to the history
      const currentInput = {
        role: 'user',
        parts: [{ text: `Bạn là trợ lý ảo của Solar Diệp Châu, công ty chuyên cung cấp giải pháp năng lượng mặt trời tại Việt Nam. 
                  Hãy trả lời câu hỏi sau một cách ngắn gọn, hữu ích và thân thiện, đồng thời ghi nhớ các thông tin trước đó trong cuộc trò chuyện này: ${inputValue}` }],
      };
      
      const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': 'AIzaSyCND9BLNkwrtFuNjaKhC-0VbMQpH5rUkQY', // Replace with your actual API key
        },
        body: JSON.stringify({
          contents: [...conversationHistory, currentInput], // Send the whole conversation
          generationConfig: {
            temperature: 0.7,
            topK: 32,
            topP: 0.95,
            maxOutputTokens: 800,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error?.message || `API returned status ${response.status}`);
      }

      const data = await response.json();
      console.log("API response:", data);
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text) {
        const botResponse = data.candidates[0].content.parts[0].text;
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          isUser: false,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMessage]);
      } else if (data.error) {
        console.error('Gemini API Error:', data.error);
        throw new Error(data.error.message || 'API error');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      
      toast({
        variant: "destructive",
        title: "Lỗi kết nối",
        description: "Không thể kết nối với trợ lý ảo. Vui lòng thử lại sau."
      });
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Xin lỗi, tôi đang gặp sự cố kết nối. Vui lòng thử lại sau hoặc liên hệ trực tiếp với chúng tôi qua số điện thoại hoặc email.',
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="bg-white dark:bg-solar-900 rounded-lg shadow-xl w-80 sm:w-96 overflow-hidden mb-4 border border-border animate-fade-in">
          <div className="bg-primary p-4 text-primary-foreground flex justify-between items-center">
            <div className="flex items-center">
              <Sun className="h-5 w-5 mr-2" />
              <h3 className="font-medium">Trợ lý Solar Diệp Châu</h3>
            </div>
            <button
              onClick={handleToggleChat}
              className="text-primary-foreground hover:bg-primary-foreground/10 p-1 rounded-full transition-colors"
              aria-label="Đóng hộp thoại"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="h-80 overflow-y-auto p-4 bg-muted/30">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block text-right">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-muted rounded-lg p-3 flex items-center space-x-2 max-w-[80%]">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t">
            <div className="flex">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Nhập tin nhắn..."
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={inputValue.trim() === '' || isLoading}
                className="ml-2 bg-primary text-primary-foreground hover:bg-primary/90 p-2 rounded-md disabled:opacity-50"
                aria-label="Gửi tin nhắn"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleToggleChat}
        className={`${
          isOpen ? 'bg-muted border border-border' : 'bg-primary text-primary-foreground'
        } h-14 w-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110`}
        aria-label={isOpen ? 'Thu gọn hộp thoại' : 'Mở hộp thoại'}
      >
        {isOpen ? <ArrowUp className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>
    </div>
  );
};

export default Chatbot;
