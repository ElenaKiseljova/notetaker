import { type KeyboardEvent, type MouseEvent, useState } from 'react';

import { useSession } from 'next-auth/react';

import { api, type RouterOutputs } from '~/utils/api';

import NoteEditor, { type TNote } from '~/components/NoteEditor';
import NoteList from '~/components/NoteList';
import Loading from './Loading';

type TTopic = RouterOutputs['topic']['getAll'][0];

const Content: React.FC = () => {
  const isMobile: boolean = window.matchMedia(
    'screen and (hover: none)'
  ).matches;

  const {data: sessionData} = useSession();

  const [isUpdatingTopics, setIsUpdatingTopics] = useState<boolean>(false);
  const [isCreatingNote, setIsCreatingNote] = useState<boolean>(false);
  const [isDeletingNote, setIsDeletingNote] = useState<boolean>(false);
  const [newTopic, setNewTopic] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<TTopic | null>(null);

  const {data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => {
        setSelectedTopic(selectedTopic ?? data[0] ?? null)
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
      setIsUpdatingTopics(true);    
    },
    onSettled: () => {
      setIsUpdatingTopics(false);   
    },
    onSuccess: () => {
      void refetchTopics();
    }
  });

  const deleteTopic = api.topic.delete.useMutation({
    onMutate: () => {
      setIsUpdatingTopics(true);    
    },
    onSettled: () => {
      setIsUpdatingTopics(false);      
    },
    onSuccess: () => {
      void refetchTopics();
      void refetchNotes();
    }
  });

  const deleteTopicHandler = (id: string, e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.currentTarget.style.pointerEvents = 'none';
    e.currentTarget.style.opacity = '0.5';
    e.currentTarget.style.filter = 'grayscale(1)'
    
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

  const saveNewTopic = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      createTopic.mutate({
        title: e.currentTarget.value,
      });

      e.currentTarget.value = '';
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
    <div className=" w-screen mx-5 mt-5 grid grid-cols-1 lg:grid-cols-4 gap-2">
      <div className=" px-2">
        <ul className="menu rounded-box grid columns-1 gap-2 w-full bg-base-100 p-2">
          {topics?.map((topic) => (
            <li 
              key={topic.id}
              className=' grid grid-cols-7 gap-2 items-center'
            >
              <a 
                href="#"
                className={` transition-all ease-in-out motion-reduce:transition-none duration-300 ${
                  selectedTopic?.id === topic.id ? 'col-span-7 active' : 'col-span-6'
                }`}
                onClick={(e) => {
                  e.preventDefault();

                  setSelectedTopic(topic);
                }}
              >
                {topic.title}
              </a>
              {selectedTopic?.id !== topic.id && 
                <button 
                  className="btn btn-square btn-outline btn-error btn-sm justify-self-end"
                  onClick={(e) => deleteTopicHandler(topic.id, e)}
                >
                  <span className="hidden">Delete</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              }              
            </li>
          ))}
        </ul>

        <div className=" divider"></div>

        <Loading show={isUpdatingTopics}>
          {isMobile ?
            <div className="w-full">
              {newTopicInput}

              <button 
                className=" btn btn-primary mt-2"
                disabled={
                  newTopic.trim().length < 3
                }
                onClick={() => {
                  createTopic.mutate({
                    title: newTopic,
                  });

                  setNewTopic('');
                }}
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
      </div>
      <div className={` col-span-3 ${
          isUpdatingTopics ? 'pointer-events-none opacity-50' : ''
        }`}>

        <div className={isDeletingNote ? ' pointer-events-none opacity-50' : ''}>
          <NoteList notes={notes} onDelete={deleteNoteHandler} />
        </div>        

        <Loading show={isCreatingNote}>
          <NoteEditor onSave={saveNoteHandler} />
        </Loading>       
      </div>      
    </div>
  );
}

export default Content;