import { useState } from 'react';
import Image from 'next/image';

import type { RouterOutputs } from '~/utils/api';

import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { type Components } from 'react-markdown';

type TNote = RouterOutputs['note']['getAll'][0];

type TNoteCardProps = {
  note: TNote;
  onDelete: () => void;
}

const NoteCard: React.FC<TNoteCardProps> = ({note, onDelete}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const customRenderers: Components = {
   img(props) {
      const { src, alt } = props

      return (
        <Image
          src={typeof src === 'string' && src.length > 0 ? src : '#'}
          alt={typeof alt === 'string' && alt.length > 0 ? alt : 'Next image'}
          width={200}
          height={400}
        />
      );
    },
  };

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
              <ReactMarkdown components={customRenderers}>{note.content}</ReactMarkdown>
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