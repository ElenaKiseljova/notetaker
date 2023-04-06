import { type MouseEvent, useState, useContext } from "react";

import TopicContext from "~/store/topic";
import type { RouterOutputs } from "~/utils/api";

type TTopic = RouterOutputs['topic']['getAll'][0];

type TTopicItemProps = {
  topic: TTopic;
  onDelete: () => void;
}

const TopicItem: React.FC<TTopicItemProps>= ({topic, onDelete}) => {
  const {selectedTopic, selectTopic, topicIdWithErrorDeleting, setTopicIdWithErrorDeleting} = useContext(TopicContext);

  const [inDeletingProcess, setInDeletingProcess] = useState<boolean>(false);

  const selectHandler = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
    e.preventDefault();

    selectTopic(topic);
  };

  const deleteHandler = () => {
    setTopicIdWithErrorDeleting(null);
    setInDeletingProcess(true);

    onDelete();
  };

  return (
    <li className={` grid grid-cols-7 gap-2 items-center ${
      inDeletingProcess && topic.id !== topicIdWithErrorDeleting ? ' pointer-events-none opacity-50' : ''
    }`}>
      <a 
        href="#"
        className={` col-span-6 ${
          selectedTopic?.id === topic.id ? 'active' : ''
        }`}
        onClick={selectHandler}
      >
        {topic.title}
      </a>
      <button 
        className="btn btn-square btn-outline btn-error btn-sm justify-self-end"
        onClick={deleteHandler}
      >
        <span className="hidden">Delete</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>            
    </li>
  );
}

export default TopicItem;