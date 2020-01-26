import { useState, useEffect } from 'react';

/*
  Custom hook that delays a react component from umounting

  Allows us to easily plug in closing animations for unmounting components
*/

const useDelayUnmount = (isMounted: boolean, delay: number) => {
  const [shouldRender, setShouldRender] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isMounted && !shouldRender) {
      setShouldRender(true);
    } else if (!isMounted && shouldRender) {
      timer = setTimeout(() => setShouldRender(false), delay);
    }
    return () => clearTimeout(timer);
  }, [isMounted, delay, shouldRender]);
  return shouldRender;
};

export default useDelayUnmount;
