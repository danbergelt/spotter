import React, { useState } from "react";
import Modal from "react-modal";
import { FiX } from "react-icons/fi";
import { connect } from "react-redux";
import { fromTemplate as generate } from "../../../../actions/workoutActions";
import { isEmpty } from "lodash";
import { styles } from "./styles";
import { deleteTemplate } from "../options/localutils/optionsActions";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

const FromTemplate = ({
  dispatch,
  types,
  close,
  fromTemplate,
  templates,
  generate,
  err
}) => {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState({});

  // handles state when new template is generated
  const genHandler = template => {
    generate(template);
    close(dispatch, types);
    setActive({});
  };

  const closeHandler = () => {
    close(dispatch, types);
    setActive({});
    setSearch("");
  };

  // search filter
  const filter = templates.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal
      style={styles}
      isOpen={fromTemplate}
      onRequestClose={closeHandler}
      contentLabel="Generate Template"
    >
      <div className="from-template-container">
        <div className="from-template-header">
          <div className="from-template-title">Generate Template</div>
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
        <div className="templates-container">
          {/* if there are templates + if there are results from the search filter, display those templates */}
          {templates.length ? (
            filter.length ? (
              filter.map(el => (
                <div key={el._id} className="template-container">
                  <div
                    onClick={() => setActive(el)}
                    className={
                      el._id === active._id ? "template active" : "template"
                    }
                  >
                    {el.name}
                  </div>
                  <div
                    onClick={() => deleteTemplate(el._id, dispatch, types)}
                    className="template-delete"
                    data-testid="template-delete"
                  >
                    <FiX />
                  </div>
                </div>
              ))
            ) : (
              <div className="no-templates-found"> No templates found</div>
            )
          ) : (
            <div className="no-templates-found">No templates found</div>
          )}
          {err && <div className="no-templates-found">{err}</div>}
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
