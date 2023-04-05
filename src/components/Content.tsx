import { useState } from 'react';

import { useSession } from 'next-auth/react';

import { api, type RouterOutputs } from '~/utils/api';

import NoteEditor, { type TNote } from '~/components/NoteEditor';
import NoteList from './NoteList';

type TTopic = RouterOutputs['topic']['getAll'][0];

const Content: React.FC = () => {
  const {data: sessionData} = useSession();

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
    onSuccess: () => {
      void refetchTopics();
    }
  });

  const createNote = api.note.create.useMutation({
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
    <div className=" w-screen mx-5 mt-5 grid grid-cols-1 md:grid-cols-4 gap-2">
      <div className=" px-2">
        <ul className="menu rounded-box w-full bg-base-100 p-2">
          {topics?.map((topic) => (
            <li key={topic.id}>
              <a 
                href="#"
                className={selectedTopic?.id === topic.id ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();

                  setSelectedTopic(topic);
                }}
              >
                {topic.title}
              </a>
            </li>
          ))}
        </ul>

        <div className=" divider"></div>

        <div className=" tooltip tooltip-bottom" data-tip="Press Enter to save topic">
          <input 
            type="text" 
            placeholder="New Topic" 
            className="input input-bordered input-sm w-full" 
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                createTopic.mutate({
                  title: e.currentTarget.value,
                });

                e.currentTarget.value = '';
              }
            }}
          />

          <p className=" sm:hidden mt-2 text-gray-400 text-xs text-left">Press Enter to save topic</p>
        </div>        
      </div>
      <div className=" col-span-3">
        <NoteList notes={notes} onDelete={deleteNoteHandler} />
        <NoteEditor onSave={saveNoteHandler} />
      </div>      
    </div>
  );
}

export default Content;