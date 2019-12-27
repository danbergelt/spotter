import React from "react";
import { FiX } from "react-icons/fi";

interface Props {
  message: string;
  setMessage: React.Dispatch<
    React.SetStateAction<{
      success?: string;
      error?: string;
    }>
  >;
}

const Message: React.FC<Props> = ({ message, setMessage }) => {
  return (
    <div
      className={
        message !== "New tag created"
          ? "tag-creation failure"
          : "tag-creation success"
      }
    >
      {message}
      <div
        onClick={() => setMessage({})}
        style={{ fontSize: "1.2rem", cursor: "pointer" }}
      >
        <FiX />
      </div>
    </div>
  );
};

export default Message;