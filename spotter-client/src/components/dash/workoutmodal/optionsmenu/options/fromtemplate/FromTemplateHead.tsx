import React, { memo } from "react";
import { FiX } from "react-icons/fi";

interface Props {
  closeHandler: () => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const FromTemplateHead: React.FC<Props> = ({
  closeHandler,
  search,
  setSearch
}) => {
  return (
    <>
      <div className="from-template-header">
        <div className="from-template-title">Load Template</div>
        <div
          role="button"
          onClick={closeHandler}
          className="from-template-exit"
        >
          <FiX
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

export default memo(FromTemplateHead);
