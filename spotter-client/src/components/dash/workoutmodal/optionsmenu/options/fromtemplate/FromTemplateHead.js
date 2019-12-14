import React from "react";
import { FiX } from "react-icons/fi";

const FromTemplateHead = ({ closeHandler, search, setSearch }) => {
  return (
    <>
      <div className="from-template-header">
        <div className="from-template-title">Load Template</div>
        <div onClick={closeHandler} className="from-template-exit">
          <FiX
            // inline styles as a convenience
            data-testid="quit-from"
            style={{ display: "flex", alignItems: "center" }}
          />
        </div>
      </div>
      <input
        autoFocus
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search..."
        className="from-template-search"
      />
    </>
  );
};

export default FromTemplateHead;
