const CheckboxSkeleton = () => {
  return (
    <div 
      className="flex items-center mb-2"
      aria-hidden="true"
    >

      <div 
        className="w-5 h-5 bg-gray-400 animate-pulse rounded mr-2" 
        role="presentation"
      ></div>

      <div 
        className="h-4 w-32 bg-gray-400 animate-pulse rounded" 
        role="presentation"
      ></div>
    </div>
  );
};

export default CheckboxSkeleton;
