import { useWindowSize } from "react-use";
import { Z_FIXED } from "zlib";

export const useTagModalStyles = () => {
  const { width } = useWindowSize();

  return {
    overlay: {
      background: "transparent"
    },
    content: {
      width: width <= 800 ? "290px" : "300px",
      height: "350px",
      marginLeft: width <= 800 ? "40vw" : "55vw",
      marginTop: width <= 800 ? "50vh" : 0
    }
  };
};
