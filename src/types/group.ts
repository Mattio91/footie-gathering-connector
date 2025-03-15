
export interface GroupMember {
  id: string;
  name: string;
  avatar?: string;
  role: 'New' | 'Member' | 'Founder' | 'Co-Admin' | 'Admin';
  participationStatus?: 'joined' | 'tentative' | 'skipping' | 'none';
}

export interface Group {
  id: string;
  name: string;
  memberCount: number;
  members?: GroupMember[];
}
