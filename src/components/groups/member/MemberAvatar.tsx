
interface MemberAvatarProps {
  name: string;
  avatar?: string;
}

const MemberAvatar = ({ name, avatar }: MemberAvatarProps) => {
  return (
    <div className="w-6 h-6 rounded-full overflow-hidden">
      <img 
        src={avatar || `https://ui-avatars.com/api/?name=${name}`} 
        alt={name} 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default MemberAvatar;
