import { useState } from 'react';

import { type RouterOutputs } from '~/utils/api';

import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

export type TNoteFull = RouterOutputs['note']['getAll'][0];

type TNoteCardProps = {
  note: TNoteFull;
  onDelete: () => void;
}

const NoteCard: React.FC<TNoteCardProps> = ({note, onDelete}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <div className=' card mt-5 border border-gray-200 bg-base-100 shadow-xl'>
      <div className=" card-body m-0 p-3">
        <div className={`collapse collapse-arrow ${
            isExpanded ? 'collapse-open' : ''
          }`}
          onClick={() => setIsExpanded((cur) => !cur)}
        >
          <div className=" collapse-title text-xl font-bold">
            {note.title}
          </div>

          <div className="collapse-content"> 
            <article className="prose lg:prose-xl">
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </article>            
          </div>
        </div>
        <div className=" card-actions mx-2 flex justify-end">
          <button
              className=' btn btn-warning btn-xs px-5'
              onClick={onDelete}
            >Delete</button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;