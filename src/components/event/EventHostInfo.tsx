
import { GroupMember } from '@/types/group';

interface EventHostInfoProps {
  host: {
    id: string;
    name: string;
    avatar?: string;
  };
  coHosts?: {
    id: string;
    name: string;
    avatar?: string;
  }[];
}

const EventHostInfo = ({ host, coHosts }: EventHostInfoProps) => {
  return (
    <div className="rounded-lg border p-3">
      <div className="text-sm">
        <div className="font-medium mb-1">Organized by</div>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
            <img 
              src={host.avatar || `https://ui-avatars.com/api/?name=${host.name}`} 
              alt={host.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <span>{host.name}</span>
        </div>
        
        {coHosts && coHosts.length > 0 && (
          <div className="mt-2">
            <div className="font-medium mb-1">Co-hosts</div>
            <div className="space-y-2">
              {coHosts.map(coHost => (
                <div key={coHost.id} className="flex items-center">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                    <img 
                      src={coHost.avatar || `https://ui-avatars.com/api/?name=${coHost.name}`}
                      alt={coHost.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span>{coHost.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventHostInfo;
