
export interface GroupMember {
  id: string;
  name: string;
  role: 'New' | 'Member' | 'Founder' | 'Co-Admin' | 'Admin';
  avatar?: string;
}

export interface Group {
  id: string;
  name: string;
  memberCount: number;
  members?: GroupMember[];
}
