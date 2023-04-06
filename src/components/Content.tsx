import { useContext, useState } from 'react';

import { useSession } from 'next-auth/react';

import { api } from '~/utils/api';
import TopicContext from '~/store/topic';

import NoteEditor, { type TNote } from '~/components/note/NoteEditor';
import NoteList from '~/components/note/NoteList';
import Loading from '~/components/Loading';
import TopicList from '~/components/topic/TopicList';
import TopicCreate from '~/components/topic/TopicCreate';

const Content: React.FC = () => {
  const {data: sessionData} = useSession();

  const { selectedTopic, selectTopic, setTopicIdWithErrorDeleting} = useContext(TopicContext);

  const [isCreatingTopic, setIsCreatingTopic] = useState<boolean>(false);
  const [isDeletingTopic, setIsDeletingTopic] = useState<boolean>(false);

  const [isCreatingNote, setIsCreatingNote] = useState<boolean>(false);
  const [isDeletingNote, setIsDeletingNote] = useState<boolean>(false);

  const {data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => {
        selectTopic(selectedTopic ?? data[0] ?? null);
      }
    }
  );

  const {data: notes, refetch: refetchNotes } = api.note.getAll.useQuery(
    {
      topicId: selectedTopic?.id ?? '',
    },
    {
      enabled: sessionData?.user !== undefined && selectedTopic !== null,
    }
  );

  const createTopic = api.topic.create.useMutation({
    onMutate: () => {
      setIsCreatingTopic(true);    
    },
    onSettled: () => {
      setIsCreatingTopic(false);   
    },
    onSuccess: () => {
      void refetchTopics();
    }
  });

  const createTopicHandler = (newTopicTitle: string) => {
    createTopic.mutate({
      title: newTopicTitle,
    });
  };

  const deleteTopic = api.topic.delete.useMutation({
    onMutate: () => {
      setIsDeletingTopic(true);
    },
    onError: (_, data) => {
      setTopicIdWithErrorDeleting(data.id);

      setIsDeletingTopic(false);
    },
    onSuccess: () => {
      void refetchTopics();
      void refetchNotes();

      setIsDeletingTopic(false);
    }
  });

  const deleteTopicHandler = (id: string) => {
    void deleteTopic.mutate({
      id,
    });
  };

  const createNote = api.note.create.useMutation({
    onMutate: () => {
      setIsCreatingNote(true);
    },
    onSettled: () => {
      setIsCreatingNote(false);
    },
    onSuccess: () => {
      void refetchNotes();
    }
  });

  const saveNoteHandler = ({title, content}: TNote) => {
    void createNote.mutate({
      title,
      content,
      topicId: selectedTopic?.id ?? '',
    });
  };

  const deleteNote = api.note.delete.useMutation({
    onMutate: () => {
      setIsDeletingNote(true);
    },
    onSettled: () => {
      setIsDeletingNote(false);
    },
    onSuccess: () => {
      void refetchNotes();
    }
  });

  const deleteNoteHandler = (id: string) => {
    void deleteNote.mutate({
      id,
    });
  };  

  return (
    <div className=" w-screen mx-5 mt-5 grid grid-cols-1 auto-rows-max lg:grid-cols-4 gap-2">
      <div className=" h-fit px-2">
        <TopicList topics={topics} onDelete={deleteTopicHandler} />

        <div className=" divider"></div>

        <TopicCreate isCreatingTopic={isCreatingTopic} onCreate={createTopicHandler} />            
      </div>
      <div className={` col-span-3 h-fit ${
          isDeletingNote || isDeletingTopic ? 'pointer-events-none opacity-50' : ''
        }`}>

        {selectedTopic &&
          <>
            <NoteList notes={notes} onDelete={deleteNoteHandler} />     

            <Loading show={isCreatingNote}>
              <NoteEditor onSave={saveNoteHandler} />
            </Loading> 
          </>
        }     
      </div>      
    </div>
  );
}

export default Content;