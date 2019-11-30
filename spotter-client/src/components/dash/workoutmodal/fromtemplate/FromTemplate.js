import React, { useState } from "react";
import Modal from "react-modal";
import { FiX } from "react-icons/fi";
import { connect } from "react-redux";
import { fromTemplate as generate } from "../../../../actions/workoutActions";
import { isEmpty } from "lodash";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

const FromTemplate = ({
  close,
  fromTemplate,
  templates,
  templatesErr,
  generate
}) => {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState({});

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

  const genHandler = template => {
    generate(template);
    close();
    setActive({});
  };

  const closeHandler = () => {
    close();
    setActive({});
    setSearch("");
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
        <div className="templates-container">
          {templates.length ? (
            filter.length ? (
              filter.map(el => (
                <div
                  onClick={() => setActive(el)}
                  className={
                    el._id === active._id ? "template active" : "template"
                  }
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
        <div
          onClick={() => (!isEmpty(active) ? genHandler(active) : null)}
          className="generate-template"
          data-testid="generate-template"
        >
          Generate
        </div>
      </div>
    </Modal>
  );
};

export default connect(null, { generate })(FromTemplate);
