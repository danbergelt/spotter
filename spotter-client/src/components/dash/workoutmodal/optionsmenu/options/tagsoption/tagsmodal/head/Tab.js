import React from "react";

const Tab = React.memo(({ active, setActive, text, id }) => {

  return (
    <div
      className={
        active === id ? "tags-modal-tab-active" : "tags-modal-tab-not-active"
      }
      onClick={() => setActive(id)}
    >
      {text}
    </div>
  );
});

export default Tab;
