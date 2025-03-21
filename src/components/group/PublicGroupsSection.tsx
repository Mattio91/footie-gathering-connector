
import { Globe } from 'lucide-react';
import { Group } from '@/types/group';
import GroupCard from '@/components/group/GroupCard';
import TablePagination from '@/components/home/TablePagination';

interface PublicGroupsSectionProps {
  publicGroups: Group[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PublicGroupsSection = ({ 
  publicGroups, 
  currentPage, 
  totalPages, 
  onPageChange 
}: PublicGroupsSectionProps) => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <Globe className="h-5 w-5 mr-2" />
        <h2 className="text-xl font-semibold">Public Groups</h2>
      </div>
      
      {publicGroups.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
          
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            tableId="public-groups"
          />
        </>
      ) : (
        <div className="bg-muted/30 rounded-lg p-8 text-center">
          <Globe className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">No public groups found</p>
        </div>
      )}
    </div>
  );
};

export default PublicGroupsSection;
