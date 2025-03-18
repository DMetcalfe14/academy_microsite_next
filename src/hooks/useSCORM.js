import { useEffect } from 'react';

const useScorm = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pipwerks = require('pipwerks-scorm-api-wrapper');
      pipwerks.SCORM.init();
      console.log('SCORM Initialized (Static Export)');

      return () => {
        pipwerks.SCORM.save();
        pipwerks.SCORM.quit();
        console.log('SCORM Terminated');
      };
    }
  }, []);

  const setScormData = (key, value) => {
    if (typeof window !== 'undefined') {
      const pipwerks = require('pipwerks-scorm-api-wrapper');
      pipwerks.SCORM.set(key, value);
    }
  };

  return { setScormData };
};

export default useScorm;
