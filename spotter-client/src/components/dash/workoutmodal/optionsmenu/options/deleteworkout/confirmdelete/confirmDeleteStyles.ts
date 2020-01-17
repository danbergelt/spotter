import { useWindowSize } from "react-use";

export const useDeleteWorkoutStyles = () => {
  const { width }: { width: number } = useWindowSize();

  return {
    overlay: {
      background: "transparent"
    },
    content: {
      width: "250px",
      height: "175px",
      marginLeft: width <= 800 ? "40vw" : "60vw",
      marginTop: width <= 800 ? "58vh" : "35.5vh"
    }
  };
};
