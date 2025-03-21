
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { mockGroups } from '@/data/mockGroupsData';
import GroupsHeader from '@/components/group/GroupsHeader';
import PrivateGroupsSection from '@/components/group/PrivateGroupsSection';
import PublicGroupsSection from '@/components/group/PublicGroupsSection';

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
        <GroupsHeader 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <PrivateGroupsSection
          privateGroups={currentPrivateGroups}
          currentPage={currentPrivatePage}
          totalPages={privateTotalPages}
          onPageChange={setCurrentPrivatePage}
        />
        
        <PublicGroupsSection
          publicGroups={currentPublicGroups}
          currentPage={currentPublicPage}
          totalPages={publicTotalPages}
          onPageChange={setCurrentPublicPage}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Groups;
