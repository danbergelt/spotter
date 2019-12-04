import React, { useState, useCallback } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { FROM_TEMPLATE } from "../../../../actions/workoutActions";
import { isEmpty } from "lodash";
import { styles } from "./styles";
import {
  SET_FROM_TEMPLATE,
  DELETE_TEMPLATE
} from "../../../../actions/optionsActions";
import Template from "./Template";
import FromTemplateHead from "./FromTemplateHead";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

const FromTemplate = () => {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState({});

  const fromTemplate = useSelector(state => state.optionsReducer.fromTemplate);
  const err = useSelector(state => state.optionsReducer.templatesErr);
  const templates = useSelector(state => state.optionsReducer.templates);

  const dispatch = useDispatch();

  const deleteTemplate = useCallback(
    id => {
      dispatch({ type: DELETE_TEMPLATE, payload: id });
    },
    [dispatch]
  );

  // handles state when new template is generated
  const genHandler = template => {
    dispatch({ type: FROM_TEMPLATE, payload: template });
    dispatch({ type: SET_FROM_TEMPLATE, payload: false });
    setActive({});
  };

  const closeHandler = () => {
    dispatch({ type: SET_FROM_TEMPLATE, payload: false });
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
        <FromTemplateHead
          closeHandler={closeHandler}
          search={search}
          setSearch={setSearch}
        />
        <div className="templates-container">
          {/* if there are templates + if there are results from the search filter, display those templates */}
          {templates.length ? (
            filter.length ? (
              filter.map(template => (
                <Template
                  setActive={setActive}
                  onDelete={deleteTemplate}
                  key={template._id}
                  template={template}
                  active={active}
                />
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

export default FromTemplate;
