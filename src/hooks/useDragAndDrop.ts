
import { useState, useEffect } from 'react';
import { Player } from '@/types/player';
import { useToast } from '@/hooks/use-toast';

type TeamSource = 'teamA' | 'teamB' | 'reserve';

export function useDragAndDrop(initialPlayers: Player[], maxPlayers: number) {
  const [teamA, setTeamA] = useState<Player[]>([]);
  const [teamB, setTeamB] = useState<Player[]>([]);
  const [reservePlayers, setReservePlayers] = useState<Player[]>([]);
  const { toast } = useToast();

  // Initialize teams when players change
  useEffect(() => {
    const confirmedPlayers = initialPlayers.filter(p => p.isConfirmed);
    const halfwayPoint = Math.ceil(confirmedPlayers.length / 2);
    
    setTeamA(confirmedPlayers.slice(0, halfwayPoint));
    setTeamB(confirmedPlayers.slice(halfwayPoint));
    setReservePlayers(initialPlayers.filter(p => !p.isConfirmed));
  }, [initialPlayers]);

  const handleDragStart = (e: React.DragEvent, player: Player, source: TeamSource) => {
    e.dataTransfer.setData('playerId', player.id);
    e.dataTransfer.setData('source', source);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, target: TeamSource) => {
    e.preventDefault();
    const playerId = e.dataTransfer.getData('playerId');
    const source = e.dataTransfer.getData('source') as TeamSource;
    
    if (source === target) return;
    
    // Find the player object
    let player: Player | undefined;
    let sourceArray: Player[];
    let sourceSetFunction: React.Dispatch<React.SetStateAction<Player[]>>;
    
    // Get the player and source array
    if (source === 'teamA') {
      sourceArray = teamA;
      sourceSetFunction = setTeamA;
    } else if (source === 'teamB') {
      sourceArray = teamB;
      sourceSetFunction = setTeamB;
    } else {
      sourceArray = reservePlayers;
      sourceSetFunction = setReservePlayers;
    }
    
    player = sourceArray.find(p => p.id === playerId);
    if (!player) return;
    
    // Remove from source array
    sourceSetFunction(sourceArray.filter(p => p.id !== playerId));
    
    // Add to target array
    if (target === 'teamA') {
      setTeamA([...teamA, {...player, isConfirmed: true}]);
      toast({
        title: "Player moved to Home Team",
        description: `${player.name} has been added to the Home Team.`,
      });
    } else if (target === 'teamB') {
      setTeamB([...teamB, {...player, isConfirmed: true}]);
      toast({
        title: "Player moved to Away Team",
        description: `${player.name} has been added to the Away Team.`,
      });
    } else {
      setReservePlayers([...reservePlayers, {...player, isConfirmed: false}]);
      toast({
        title: "Player moved to Reserve",
        description: `${player.name} has been moved to the reserve list.`,
      });
    }
  };

  return {
    teamA,
    teamB,
    reservePlayers,
    handleDragStart,
    handleDragOver,
    handleDrop
  };
}
