
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
    <div className="border rounded-xl overflow-hidden bg-card shadow-sm">
      {/* Chat messages container */}
      <div className="h-64 overflow-y-auto p-3">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
            <MessageCircle className="h-12 w-12 mb-2 opacity-20" />
            <p>{t('event.noMessages')}</p>
            <p className="text-sm">{t('event.beFirst')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((message) => {
              // Determine if this is a consecutive message from the same author
              const messageStyle = "px-3 py-2 rounded-lg max-w-[85%]";
              return (
                <div key={message.id} className="flex items-end gap-2 group">
                  {/* Avatar only shown for first message or different author */}
                  <div className="flex-shrink-0 w-7 h-7 rounded-full overflow-hidden">
                    <img 
                      src={message.author.avatar || `https://ui-avatars.com/api/?name=${message.author.name}`} 
                      alt={message.author.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-medium text-xs">
                        {message.author.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        {format(message.timestamp, 'p')}
                      </span>
                    </div>
                    <div className={`${messageStyle} bg-muted/50 text-sm`}>
                      {message.text}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Message input */}
      <div className="p-2 border-t bg-background/60">
        <div className="flex gap-2">
          <Input 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('event.typeMessage')}
            className="flex-grow text-sm h-9 focus-visible:ring-1"
          />
          <Button 
            size="sm"
            variant="secondary"
            className="aspect-square p-0 w-9 h-9"
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
