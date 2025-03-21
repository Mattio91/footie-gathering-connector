
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Lock, Globe, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GroupCard from '@/components/group/GroupCard';
import TablePagination from '@/components/home/TablePagination';
import { useTranslation } from 'react-i18next';
import { mockGroups } from '@/data/mockGroupsData';

const Groups = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPrivatePage, setCurrentPrivatePage] = useState(1);
  const [currentPublicPage, setCurrentPublicPage] = useState(1);
  const pageSize = 10;
  
  // Filter groups based on search query
  const filteredGroups = mockGroups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (group.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false)
  );
  
  // Split into private and public groups
  const privateGroups = filteredGroups.filter(group => group.isPrivate);
  const publicGroups = filteredGroups.filter(group => !group.isPrivate);
  
  // Pagination calculations
  const privateTotalPages = Math.ceil(privateGroups.length / pageSize);
  const publicTotalPages = Math.ceil(publicGroups.length / pageSize);
  
  const privateStartIndex = (currentPrivatePage - 1) * pageSize;
  const privateEndIndex = Math.min(privateStartIndex + pageSize, privateGroups.length);
  const currentPrivateGroups = privateGroups.slice(privateStartIndex, privateEndIndex);
  
  const publicStartIndex = (currentPublicPage - 1) * pageSize;
  const publicEndIndex = Math.min(publicStartIndex + pageSize, publicGroups.length);
  const currentPublicGroups = publicGroups.slice(publicStartIndex, publicEndIndex);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search groups..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Group
          </Button>
        </div>
        
        {/* Private Groups Section */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Lock className="h-5 w-5 mr-2" />
            <h2 className="text-xl font-semibold">Private Groups</h2>
          </div>
          
          {currentPrivateGroups.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPrivateGroups.map((group) => (
                  <GroupCard key={group.id} group={group} />
                ))}
              </div>
              
              <TablePagination
                currentPage={currentPrivatePage}
                totalPages={privateTotalPages}
                onPageChange={setCurrentPrivatePage}
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
        
        {/* Public Groups Section */}
        <div>
          <div className="flex items-center mb-4">
            <Globe className="h-5 w-5 mr-2" />
            <h2 className="text-xl font-semibold">Public Groups</h2>
          </div>
          
          {currentPublicGroups.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPublicGroups.map((group) => (
                  <GroupCard key={group.id} group={group} />
                ))}
              </div>
              
              <TablePagination
                currentPage={currentPublicPage}
                totalPages={publicTotalPages}
                onPageChange={setCurrentPublicPage}
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Groups;
