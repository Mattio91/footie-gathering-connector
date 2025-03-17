
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { MessageCircle, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
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

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);
  
  return (
    <div className="border rounded-xl overflow-hidden bg-card shadow-sm">
      <div className="p-3 border-b bg-muted/30">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-muted-foreground" />
          {t('event.eventChat')}
        </h3>
      </div>
      
      {/* Chat messages container */}
      <ScrollArea className="h-[320px] p-3">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
            <MessageCircle className="h-12 w-12 mb-2 opacity-20" />
            <p>{t('event.noMessages')}</p>
            <p className="text-sm">{t('event.beFirst')}</p>
          </div>
        ) : (
          <div className="space-y-1.5">
            {messages.map((message) => (
              <div key={message.id} className="flex items-start gap-2 group py-0.5">
                <div className="flex-grow">
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span className="font-medium text-xs">
                      {message.author.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {format(message.timestamp, 'p')}
                    </span>
                  </div>
                  
                  <div className="px-2.5 py-1 rounded-lg bg-muted/40 text-sm inline-block max-w-[calc(100%-8px)]">
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </ScrollArea>
      
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
