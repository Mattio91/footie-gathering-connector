
import { Lock } from 'lucide-react';
import { Group } from '@/types/group';
import GroupCard from '@/components/group/GroupCard';
import TablePagination from '@/components/home/TablePagination';

interface PrivateGroupsSectionProps {
  privateGroups: Group[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PrivateGroupsSection = ({ 
  privateGroups, 
  currentPage, 
  totalPages, 
  onPageChange 
}: PrivateGroupsSectionProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <Lock className="h-5 w-5 mr-2" />
        <h2 className="text-xl font-semibold">Private Groups</h2>
      </div>
      
      {privateGroups.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {privateGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
          
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            tableId="private-groups"
          />
        </>
      ) : (
        <div className="bg-muted/30 rounded-lg p-8 text-center">
          <Lock className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">No private groups found</p>
        </div>
      )}
    </div>
  );
};

export default PrivateGroupsSection;
