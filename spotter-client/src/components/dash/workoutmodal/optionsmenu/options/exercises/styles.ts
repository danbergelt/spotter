import { useWindowSize } from "react-use";

export const useExerciseModalStyles = () => {
  const { width }: { width: number } = useWindowSize();

  return {
    overlay: {
      background: "transparent"
    },
    content: {
      width: "275px",
      height: "max-content",
      marginLeft: width <= 800 ? "40vw" : "60vw",
      marginTop: width <= 800 ? "60vh" : "29.5vh"
    }
  };
};
