
export interface PlayerStatistics {
  gamesPlayed: number;
  gamesWon: number;
  winRate: number;
  manOfTheMatch: number;
}

export interface Player {
  id: string;
  name: string;
  isConfirmed: boolean;
  isAdmin: boolean;
  isTentative?: boolean;
  isSkipping?: boolean;
  avatar?: string;
  participationStatus?: 'joined' | 'tentative' | 'skipping' | 'none';
  statistics?: PlayerStatistics;
}
