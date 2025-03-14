
import { FootballPlayer, BallPosition } from '@/lib/footballUtils';

export function useGameInitialization() {
  // Initialize players based on formation
  const initializePlayers = (displayTeamAPlayers: number, displayTeamBPlayers: number) => {
    // For team A (5 players including GK)
    const teamAPositions = [
      { x: 50, y: 10 }, // GK
      { x: 30, y: 30 }, // DEF
      { x: 70, y: 30 }, // DEF
      { x: 40, y: 60 }, // MID/FWD
      { x: 60, y: 60 }  // MID/FWD
    ];
    
    // For team B (5 players including GK)
    const teamBPositions = [
      { x: 50, y: 90 }, // GK
      { x: 30, y: 70 }, // DEF
      { x: 70, y: 70 }, // DEF
      { x: 40, y: 40 }, // MID/FWD
      { x: 60, y: 40 }  // MID/FWD
    ];
    
    // Create actual players
    const initialPlayers: FootballPlayer[] = [];
    let idCounter = 1;
    
    // Add team A players
    for (let i = 0; i < Math.min(displayTeamAPlayers, 5); i++) {
      initialPlayers.push({
        id: idCounter++,
        team: 'A',
        x: teamAPositions[i].x,
        y: teamAPositions[i].y,
        baseX: teamAPositions[i].x,
        baseY: teamAPositions[i].y,
        hasBall: false,
        isDefending: false,
        lastMoveTime: 0
      });
    }
    
    // Add team B players
    for (let i = 0; i < Math.min(displayTeamBPlayers, 5); i++) {
      initialPlayers.push({
        id: idCounter++,
        team: 'B',
        x: teamBPositions[i].x,
        y: teamBPositions[i].y,
        baseX: teamBPositions[i].x,
        baseY: teamBPositions[i].y,
        hasBall: false,
        isDefending: false,
        lastMoveTime: 0
      });
    }
    
    // Give the ball to a random player on team A to start
    const teamAPlayers = initialPlayers.filter(p => p.team === 'A');
    let initialBallPosition: BallPosition = { x: 50, y: 50 };
    
    if (teamAPlayers.length > 0) {
      const randomIndex = Math.floor(Math.random() * teamAPlayers.length);
      const randomPlayer = teamAPlayers[randomIndex];
      randomPlayer.hasBall = true;
      initialBallPosition = { x: randomPlayer.x, y: randomPlayer.y };
    }
    
    return { initialPlayers, initialBallPosition };
  };
  
  return { initializePlayers };
}
