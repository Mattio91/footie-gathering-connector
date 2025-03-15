
export interface Player {
  id: string;
  name: string;
  isConfirmed: boolean;
  isAdmin: boolean;
  isTentative?: boolean;
  avatar?: string;
}
