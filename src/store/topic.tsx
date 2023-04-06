import { createContext, useState } from 'react';

import type { RouterOutputs } from '~/utils/api';

type TTopic = RouterOutputs['topic']['getAll'][0];

type TTopicContext = {
  selectedTopic: TTopic | null;
  topicIdWithErrorDeleting: string | null;
  selectTopic: (topic: TTopic | null) => void;
  setTopicIdWithErrorDeleting: (topicId: string | null) => void;
}

type TTopicContextProviderProps = {
  children?: React.ReactNode;
}

const TopicContext = createContext<TTopicContext>({
  selectedTopic: null,
  topicIdWithErrorDeleting: null,
  selectTopic: () => undefined,  
  setTopicIdWithErrorDeleting: () => undefined,
});

export const TopicContextProvider: React.FC<TTopicContextProviderProps> = ({children}) => {
  const [selectedTopic, setSelectedTopic] = useState<TTopic | null>(null);
  const [topicIdWithErrorDeleting, setTopicIdWithErrorDeleting] = useState<string | null>(null);

  const selectTopicHandler = (topic: TTopic | null) => {
    setSelectedTopic(topic);
  }

  const setTopicIdWithErrorDeletingHandler = (topicId: string | null) => {
    setTopicIdWithErrorDeleting(topicId);
  }

  const context: TTopicContext = {
    selectedTopic: selectedTopic,
    topicIdWithErrorDeleting: topicIdWithErrorDeleting,
    selectTopic: selectTopicHandler,
    setTopicIdWithErrorDeleting: setTopicIdWithErrorDeletingHandler,
  };

  return (
    <TopicContext.Provider value={context}>
      {children}
    </TopicContext.Provider>
  );
};

export default TopicContext;