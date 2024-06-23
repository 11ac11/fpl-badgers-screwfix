import { useState, useEffect } from 'react';

const useInnerWidth = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Clean up function to remove event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array ensures effect runs only once on mount

  return innerWidth;
};

export default useInnerWidth;