import type { RouterOutputs } from '~/utils/api';

import NoteCard from '~/components/note/NoteCard';

type TNote = RouterOutputs['note']['getAll'][0];

type TNoteListProps = {
  notes: TNote[] | undefined;
  onDelete: (id: string) => void;
}

const NoteList: React.FC<TNoteListProps> = ({notes, onDelete}) => {
  if (typeof notes === 'undefined') {
    return <span></span>;
  }

  return (
    <div>
      {notes.map((note) => (
        <div key={note.id} className="mt-5">
          <NoteCard 
            note={note}
            onDelete={() => onDelete(note.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default NoteList;