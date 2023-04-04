import React, { useState } from "react";

import { useSession } from "next-auth/react";

import { api, RouterOutputs } from "~/utils/api";

type Topic = RouterOutputs['topic']['getAll'][0];

const Content: React.FC = () => {
  const {data: sessionData} = useSession();

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const {data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => {
        setSelectedTopic(selectedTopic ?? data[0] ?? null)
      }
    }
  );

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      void refetchTopics();
    }
  });

  return (
    <div className=" mx-5 mt-5 grid grid-cols-4 gap-2">
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
      </div>
      <div className=" col-span-3">
        Notes for 
        {selectedTopic?.title ?? 'Undefined topic'}
      </div>      
    </div>
  );
}

export default Content;