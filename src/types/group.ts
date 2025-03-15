
export interface GroupMember {
  id: string;
  name: string;
  role: 'Host' | 'Admin' | 'Member';
  avatar?: string;
}

export interface Group {
  id: string;
  name: string;
  memberCount: number;
  members?: GroupMember[];
}
