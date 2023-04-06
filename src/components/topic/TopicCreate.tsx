import { type KeyboardEvent, useState } from "react";

import Loading from "~/components/Loading";

type TTopicCreateProps = {
  isCreatingTopic: boolean;
  onCreate: (topicTitle: string) => void;
}

const TopicCreate: React.FC<TTopicCreateProps> = ({onCreate, isCreatingTopic = false}) => {
  const isMobile: boolean = window.matchMedia(
    'screen and (hover: none)'
  ).matches;

  const [newTopic, setNewTopic] = useState<string>('');

  const saveNewTopic = (e: KeyboardEvent<HTMLInputElement> | null) => {
    if (e === null) {
      onCreate(newTopic);

      setNewTopic('');
    } else {
      if (e.key === 'Enter') {
        onCreate(e.currentTarget.value);
  
        e.currentTarget.value = '';

        setNewTopic('');
      }
    }    
  };

  const newTopicInput = <input 
    type="text" 
    placeholder="New Topic" 
    className="input input-bordered input-md w-full" 
    onKeyDown={saveNewTopic}
    onInput={(e) => setNewTopic(e.currentTarget.value)}
    value={newTopic}
  />;

  return (
    <Loading show={isCreatingTopic}>
      {isMobile ?
        <div className="w-full">
          {newTopicInput}

          <button 
            className=" btn btn-primary mt-2"
            disabled={
              newTopic.trim().length < 3
            }
            onClick={() => saveNewTopic(null)}
          >
            Add topic
          </button>
        </div>
        : 
        <div className=" tooltip tooltip-right w-full" data-tip="Press Enter to save topic">
          {newTopicInput}
        </div>
      } 
    </Loading> 
  );
}

export default TopicCreate;