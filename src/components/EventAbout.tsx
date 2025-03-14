
interface EventAboutProps {
  description: string;
}

const EventAbout = ({ description }: EventAboutProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">About this event</h3>
      <p className="text-muted-foreground whitespace-pre-line">
        {description}
      </p>
    </div>
  );
};

export default EventAbout;
