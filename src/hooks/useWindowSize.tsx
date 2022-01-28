import { useState, useEffect } from 'react';

type WindowDimensions = {
  width: number;
  height: number;
}

function getWindowDimensions(): WindowDimensions {
  // make sure your function is being called in client side only
  if (typeof window !== 'undefined') {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  
}

export default function useWindow(): WindowDimensions {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}