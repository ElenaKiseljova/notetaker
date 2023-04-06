import {useState} from 'react';

import CodeMirror from '@uiw/react-codemirror';
import {markdown, markdownLanguage} from '@codemirror/lang-markdown';
import {languages} from '@codemirror/language-data';

export type TNote = {
  title: string;
  content: string;
}

type TNoteEditorProps = {
  onSave: (note: TNote) => void;
}

const NoteEditor: React.FC<TNoteEditorProps> = ({onSave}) => {
  const [code, setCode] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  return (
    <div className=" card mt-5 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <input 
            type="text" 
            placeholder="Note title" 
            className="input input-primary input-lg w-full font-bold" 
            value={title}
            onChange={(e) => {
              setTitle(e.currentTarget.value)
            }}
          />
        </h2>

        <CodeMirror 
          value={code}
          width='100%'
          height='30vh'
          minWidth='100%'
          minHeight='30vh'
          extensions={[
            markdown({
              base: markdownLanguage,
              codeLanguages: languages,
            })
          ]}
          onChange={(value) => setCode(value)}
          className=' border border-gray-300'
        />

        <div className=" card-actions justify-end">
          <button 
            className=" btn btn-primary"
            disabled={
              title.trim().length < 3 ||
              code.trim().length < 3
            }
            onClick={() => {
              onSave({
                title,
                content: code,
              });

              setCode('');
              setTitle('');
            }}
          >
            Save note
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteEditor;