
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
  city: string;
  memberCount: number;
  isPrivate: boolean;
  description?: string;
  image?: string;
  members?: GroupMember[];
}
