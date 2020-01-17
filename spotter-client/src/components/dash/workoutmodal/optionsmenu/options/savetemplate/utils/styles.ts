import { useWindowSize } from "react-use";

export const useSaveTemplateStyles = () => {
  const { width }: { width: number } = useWindowSize();
  return {
    overlay: {
      background: "transparent"
    },
    content: {
      width: "250px",
      height: "max-content",
      marginLeft: width <= 800 ? "40vw" : "60vw",
      marginTop: width <= 800 ? "58vh" : "18vh"
    }
  };
};
