import React, { useState } from "react";
import Modal from "react-modal";
import { FiX } from "react-icons/fi";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

const FromTemplate = ({ close, fromTemplate, templates, templatesErr }) => {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("");

  const customStyles = {
    overlay: {
      background: "transparent"
    },
    content: {
      width: "235px",
      height: "325px",
      marginLeft: "60vw",
      marginTop: "30vh"
    }
  };

  const closeHandler = () => {
    close();
    setActive("");
  };

  const filter = templates.filter(t => t.name.includes(search));

  return (
    <Modal
      style={customStyles}
      isOpen={fromTemplate}
      onRequestClose={closeHandler}
      contentLabel="Generate Template"
    >
      <div className="from-template-container">
        <div className="from-template-header">
          <div className="from-template-title">Generate Template</div>
          <div onClick={closeHandler} className="from-template-exit">
            <FiX
              data-testid="quit-template-save"
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
        <div className="templates-container">
          {templates.length ? (
            filter.length ? (
              filter.map(el => (
                <div
                  onClick={() => setActive(el._id)}
                  className={el._id === active ? "template active" : "template"}
                  key={el._id}
                >
                  {el.name}
                </div>
              ))
            ) : (
              <div className="no-templates-found"> No templates found</div>
            )
          ) : (
            <div className="no-templates-found">No templates found</div>
          )}
        </div>
        <div className="generate-template">Generate</div>
      </div>
    </Modal>
  );
};

export default FromTemplate;
