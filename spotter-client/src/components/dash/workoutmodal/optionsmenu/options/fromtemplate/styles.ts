import { useWindowSize } from 'react-use';

export const useFromTemplateStyles = () => {
  const { width }: { width: number } = useWindowSize();

  return {
    overlay: {
      background: 'transparent'
    },
    content: {
      width: width <= 500 ? '275px' : '250px',
      height: '325px',
      marginLeft:
        (width <= 500 && '14vw') || (width <= 800 && '40vw') || '60vw',
      marginTop: width <= 800 ? '50vh' : '23vh'
    }
  };
};
