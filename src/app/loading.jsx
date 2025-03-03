const LoadingSpinner = () => {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-92px)] w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-opacity-75"></div>
      </div>
    );
  };
  
  export default LoadingSpinner;
  