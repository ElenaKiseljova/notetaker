import {signIn, signOut, useSession} from 'next-auth/react';

import Image from 'next/image';

export const Header = () => {
  const {data: sessionData} = useSession();

  return (
    <header className="navbar bg-primary text-primary-content">
      <div className="flex-1 pl-5 text-3xl font-bold">
        {sessionData?.user?.name ? `Notes for ${sessionData.user.name}` : ''}
      </div>
      <div className="flex-none gap-2">
        <div className=" dropdown dropdown-end">
          {sessionData?.user ? (
            <label 
              tabIndex={0} 
              className=" btn btn-ghost btn-circle avatar"
              onClick={() => void signOut()}
            >
              <div className=" w-10 rounded-full">
                {/* <Image 
                  width={40}
                  height={40}
                  src={sessionData?.user?.image ?? ''}
                  alt={sessionData?.user?.name ?? ''}  
                /> */}
                <Image 
                  width={40}
                  height={40}
                  src={sessionData?.user?.image ?? ''}
                  alt={sessionData?.user?.name ?? ''}  
                />
              </div>
            </label>
          ) : (
            <button 
              className=" btn btn-ghost rounded-btn"
              onClick={() => void signIn()}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  )
}