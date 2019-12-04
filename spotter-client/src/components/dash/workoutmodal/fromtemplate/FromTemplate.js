import React, { useState, useCallback } from "react";
import axiosWithAuth from '../../../../utils/axiosWithAuth'
import Modal from "react-modal";
import { FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { FROM_TEMPLATE } from "../../../../actions/workoutActions";
import { isEmpty } from "lodash";
import { styles } from "./styles";
import {
  SET_FROM_TEMPLATE,
  DELETE_TEMPLATE
} from "../../../../actions/optionsActions";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

const FromTemplate = () => {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState({});
  const fromTemplate = useSelector(state => state.optionsReducer.fromTemplate);
  const err = useSelector(state => state.optionsReducer.templatesErr);
  const templates = useSelector(state => state.optionsReducer.templates)
  const dispatch = useDispatch();
  const generate = useCallback(
    template => {
      dispatch({ type: FROM_TEMPLATE, payload: template });
    },
    [dispatch]
  );

  const close = useCallback(() => {
    dispatch({ type: SET_FROM_TEMPLATE, payload: false });
  }, [dispatch]);

  // handles state when new template is generated
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

  // search filter
  const filter = templates.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  const deleteTemplate = async id => {
    try {
      await axiosWithAuth().delete(
        `${process.env.REACT_APP_T_API}/api/auth/templates/${id}`
      );
      dispatch({ type: DELETE_TEMPLATE, payload: id });
    } catch (error) {
      console.log(error);
    }
  };

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
                    onClick={() => deleteTemplate(el._id)}
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

export default FromTemplate;
