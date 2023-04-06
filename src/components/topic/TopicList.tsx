import type { RouterOutputs } from "~/utils/api";

import TopicItem from "~/components/topic/TopicItem";

type TTopic = RouterOutputs['topic']['getAll'][0];

type TTopicListProps = {
  topics: TTopic[] | undefined;
  onDelete: (id: string) => void;
}

const TopicList: React.FC<TTopicListProps> = ({topics, onDelete}) => {
  if (typeof topics === undefined || topics?.length === 0) {
    return (
      <p className=" text-base">Here You will see list of your Topics. But You should create at least one Topic for see that.</p>
    );
  }

  return (
    <ul className="menu rounded-box grid columns-1 gap-2 w-full bg-base-100 p-2">
      {topics?.map((topic) => (
        <TopicItem 
          key={topic.id} 
          topic={topic} 
          onDelete={() => onDelete(topic.id)} 
        />
      ))}
    </ul>
  );
}

export default TopicList;