
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { MessageCircle, Send, Smile } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

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

  // Generate a color based on username for consistent chat colors
  const getUserColor = (name: string) => {
    const colors = [
      'text-violet-500',
      'text-blue-500',
      'text-sky-500',
      'text-teal-500',
      'text-emerald-500',
      'text-amber-500',
      'text-rose-500',
      'text-pink-500'
    ];
    
    // Simple hash function to get consistent color for a username
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };
  
  return (
    <div className="border rounded-xl overflow-hidden bg-card shadow-sm">
      <div className="p-3 border-b bg-muted/30 flex items-center justify-between">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-primary" />
          {t('event.eventChat')}
        </h3>
        <span className="text-xs text-muted-foreground">
          {messages.length} {messages.length === 1 ? 'message' : 'messages'}
        </span>
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
          <div className="space-y-2">
            {messages.map((message, index) => {
              const isFirstOfTheDay = index === 0 || 
                new Date(message.timestamp).toDateString() !== new Date(messages[index - 1].timestamp).toDateString();
              
              return (
                <React.Fragment key={message.id}>
                  {isFirstOfTheDay && (
                    <div className="flex items-center my-3">
                      <div className="flex-grow h-px bg-muted"></div>
                      <span className="px-3 text-xs text-muted-foreground">
                        {format(message.timestamp, 'MMMM d')}
                      </span>
                      <div className="flex-grow h-px bg-muted"></div>
                    </div>
                  )}
                  
                  <div className="flex group">
                    <div className="flex-grow">
                      <div className="rounded-lg p-2.5 bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="flex justify-between items-start mb-1">
                          <span className={cn("text-xs font-semibold", getUserColor(message.author.name))}>
                            {message.author.name}
                          </span>
                          <span className="text-[10px] text-muted-foreground ml-2">
                            {format(message.timestamp, 'p')}
                          </span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
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
            className="flex-grow text-sm h-10 rounded-full focus-visible:ring-1"
          />
          <Button 
            size="sm"
            variant="default"
            className="rounded-full aspect-square p-0 w-10 h-10"
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
