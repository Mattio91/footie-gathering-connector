
import { Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import { 
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EventsSearchFilterProps {
  searchQuery: string;
  viewFilter: string;
  onSearchChange: (query: string) => void;
  onViewFilterChange: (filter: string) => void;
}

const EventsSearchFilter = ({ 
  searchQuery, 
  viewFilter, 
  onSearchChange, 
  onViewFilterChange 
}: EventsSearchFilterProps) => {
  const { t } = useTranslation();

  return (
    <Card className="mb-8">
      <CardContent className="pt-6 pb-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-shrink-0 font-medium">{t('events.findEvents')}</div>
          
          <div className="flex flex-1 md:flex-row gap-4 w-full md:w-auto items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('events.searchEvents')}
                className="pl-10 pr-4 w-full"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[120px] justify-between">
                  {viewFilter === 'all' && 'All Events'}
                  {viewFilter === 'joined' && 'Joined'}
                  {viewFilter === 'tentative' && 'Tentative'}
                  {viewFilter === 'open' && 'Open Events'}
                  <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background">
                <DropdownMenuItem onClick={() => onViewFilterChange('all')}>
                  All Events
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onViewFilterChange('joined')}>
                  Joined
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onViewFilterChange('tentative')}>
                  Tentative
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onViewFilterChange('open')}>
                  Open Events
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventsSearchFilter;
