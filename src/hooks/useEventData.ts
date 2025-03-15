
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Group } from '@/types/group';
import { Player } from '@/types/player';

interface EventData {
  id: string;
  title: string;
  location: string;
  locationDetails: string;
  date: Date;
  time: string;
  duration: string;
  format: string;
  maxPlayers: number;
  price: number;
  isPrivate: boolean;
  host: {
    id: string;
    name: string;
    avatar: string;
  };
  coHosts: {
    id: string;
    name: string;
    avatar: string;
  }[];
  description: string;
  imageUrl: string;
  groups: Group[];
}

interface ChatMessage {
  id: string;
  author: { 
    id: string; 
    name: string; 
    avatar?: string;
  };
  text: string;
  timestamp: Date;
}

export const useEventData = (eventId: string) => {
  const { toast } = useToast();
  
  // Mock event data
  const mockEvent: EventData = {
    id: '1',
    title: 'Saturday Morning Kickabout',
    location: 'Hackney Marshes, London',
    locationDetails: 'Meet at pitch 3, near the car park entrance',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    time: '09:00',
    duration: '90 mins',
    format: '6v6',
    maxPlayers: 12,
    price: 5,
    isPrivate: false,
    host: {
      id: '1',
      name: 'Alex Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    coHosts: [
      {
        id: '2',
        name: 'Sarah Smith',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      }
    ],
    description: 'Casual 6-a-side match on Saturday morning. All skill levels welcome! We\'ll play for about 90 minutes. There\'s a small fee to cover pitch rental. Please bring both dark and light colored shirts so we can make teams on the day.',
    imageUrl: 'https://images.unsplash.com/photo-1592656094267-764a45160876?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    groups: [
      { 
        id: '1', 
        name: 'Sunday League', 
        memberCount: 14,
        members: [
          { id: '1', name: 'Alex Johnson', role: 'Host' as const, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
          { id: '2', name: 'Sarah Smith', role: 'Admin' as const, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
          { id: '3', name: 'Mike Wilson', role: 'Member' as const, avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
          { id: '4', name: 'Jessica Taylor', role: 'Member' as const, avatar: 'https://randomuser.me/api/portraits/women/23.jpg' }
        ]
      },
      { 
        id: '2', 
        name: 'Neighborhood Crew', 
        memberCount: 8,
        members: [
          { id: '1', name: 'Alex Johnson', role: 'Host' as const, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
          { id: '5', name: 'David Brown', role: 'Member' as const, avatar: 'https://randomuser.me/api/portraits/men/86.jpg' },
          { id: '6', name: 'Emma Davis', role: 'Member' as const, avatar: 'https://randomuser.me/api/portraits/women/12.jpg' }
        ]
      }
    ]
  };

  // Mock images
  const mockImages = [
    'https://images.unsplash.com/photo-1592656094267-764a45160876?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  ];

  const [isJoined, setIsJoined] = useState(false);
  const [currentImages, setCurrentImages] = useState(mockImages);
  const [players, setPlayers] = useState<Player[]>([
    { id: '1', name: 'Alex Johnson', isConfirmed: true, isAdmin: true, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: '2', name: 'Sarah Smith', isConfirmed: true, isAdmin: false, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: '3', name: 'Mike Wilson', isConfirmed: true, isAdmin: false, avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
    { id: '4', name: 'Jessica Taylor', isConfirmed: false, isAdmin: false, avatar: 'https://randomuser.me/api/portraits/women/23.jpg' },
    { id: '5', name: 'David Brown', isConfirmed: true, isAdmin: false, avatar: 'https://randomuser.me/api/portraits/men/86.jpg' },
    { id: '6', name: 'Emma Davis', isConfirmed: false, isAdmin: false, avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
    { id: '7', name: 'Ryan Clark', isConfirmed: true, isAdmin: false },
  ]);
  
  // Mock chat messages
  const [mockMessages, setMockMessages] = useState<ChatMessage[]>([
    { 
      id: '1', 
      author: { id: '2', name: 'Sarah Smith', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
      text: 'Looking forward to the game! Should we bring anything specific?',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    },
    {
      id: '2',
      author: { id: '1', name: 'Alex Johnson', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
      text: 'Just regular football gear and water! If you have both light and dark jerseys, that would help for making teams.',
      timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000),
    },
    {
      id: '3',
      author: { id: '3', name: 'Mike Wilson', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
      text: 'Is there parking available at the field?',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    }
  ]);

  // Handle join event
  const handleJoinEvent = () => {
    if (isJoined) {
      // Remove self from players list
      setPlayers(players.filter(player => player.id !== 'current-user'));
      toast({
        title: "Left Event",
        description: "You have been removed from the event.",
      });
    } else {
      // Add self to players list as an unconfirmed player (reserve)
      setPlayers([
        ...players, 
        { 
          id: 'current-user', 
          name: 'You', 
          isConfirmed: false, 
          isAdmin: false,
          avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
        }
      ]);
      toast({
        title: "Joined Event",
        description: "You have been added to the reserve list.",
      });
    }
    setIsJoined(!isJoined);
  };
  
  // Handle add friend
  const handleAddFriend = (name: string) => {
    // Generate a random ID for the friend
    const friendId = `friend-${Date.now()}`;
    
    // Add the friend to the players list as an unconfirmed player (reserve)
    const newPlayer = {
      id: friendId,
      name: name,
      isConfirmed: false,
      isAdmin: false,
      // No avatar provided, will use UI avatars
    };
    
    setPlayers([...players, newPlayer]);
    
    toast({
      title: "Friend Added",
      description: `${name} has been linked to your account and added to the event as your friend.`,
    });
  };
  
  // Handle add chat message
  const handleSendMessage = (messageText: string) => {
    if (!messageText.trim()) return;
    
    const newMessage = {
      id: `message-${Date.now()}`,
      author: { 
        id: 'current-user', 
        name: 'You', 
        avatar: 'https://randomuser.me/api/portraits/lego/1.jpg' 
      },
      text: messageText,
      timestamp: new Date(),
    };
    
    setMockMessages([...mockMessages, newMessage]);
  };

  // Handle image upload
  const handleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setCurrentImages([imageUrl, ...currentImages.slice(1)]);
    
    toast({
      title: "Image Updated",
      description: "Your event image has been updated successfully.",
    });
  };

  // Handle member role update
  const handleUpdateMemberRole = (groupId: string, memberId: string, role: string) => {
    // In a real application, this would update the role in the database
    console.log(`Updated role for member ${memberId} in group ${groupId} to ${role}`);
  };

  return {
    event: mockEvent,
    players,
    isJoined,
    currentImages,
    messages: mockMessages,
    handleJoinEvent,
    handleAddFriend,
    handleSendMessage,
    handleImageUpload,
    handleUpdateMemberRole
  };
};
