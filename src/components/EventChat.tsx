
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { MessageCircle, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ChatMessage {
  id: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  text: string;
  timestamp: Date;
}

interface EventChatProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
}

const EventChat = ({ messages, onSendMessage }: EventChatProps) => {
  const { t } = useTranslation();
  const [newMessage, setNewMessage] = useState('');
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="border rounded-xl overflow-hidden bg-card">
      <div className="p-4 border-b">
        <h3 className="font-semibold flex items-center">
          <MessageCircle className="h-4 w-4 mr-2" />
          {t('event.eventChat')}
        </h3>
      </div>
      
      <div className="h-64 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
            <MessageCircle className="h-12 w-12 mb-2 opacity-20" />
            <p>{t('event.noMessages')}</p>
            <p className="text-sm">{t('event.beFirst')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="flex space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden">
                  <img 
                    src={message.author.avatar || `https://ui-avatars.com/api/?name=${message.author.name}`} 
                    alt={message.author.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex items-baseline space-x-2">
                    <span className="font-medium text-sm">{message.author.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {format(message.timestamp, 'p')}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-3 border-t bg-muted/30">
        <div className="flex space-x-2">
          <Input 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('event.typeMessage')}
            className="flex-grow"
          />
          <Button 
            size="icon"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventChat;
