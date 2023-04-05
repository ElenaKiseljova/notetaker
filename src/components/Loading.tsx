type TLoadingProps = {
  show: boolean,
  children?: React.ReactNode;
}
const Loading: React.FC<TLoadingProps> = ({show, children}) => {
  return (
    <div className="flex flex-col">
      <div className={`btn btn-ghost btn-circle btn-outline loading my-4 self-center ${
        show ? '' : 'hidden'
      }`}></div>

      <div className={` w-full ${
        show ? 'pointer-events-none opacity-50' : ''
      }`}>
        {children}
      </div>  
    </div>
  );
}

export default Loading;