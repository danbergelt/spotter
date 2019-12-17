import React, { useCallback } from "react";
import Template from "./Template";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_TEMPLATE } from "../../../../../../actions/optionsActions";
import axiosWithAuth from "../../../../../../utils/axiosWithAuth";

// templates container

const Templates = ({ setActive, active, search }) => {
  const dispatch = useDispatch();

  const deleteTemplate = useCallback(
    async id => {
      await axiosWithAuth().delete(
        `${process.env.REACT_APP_T_API}/api/auth/templates/${id}`
      );
      dispatch({ type: DELETE_TEMPLATE, payload: id });
    },
    [dispatch]
  );

  const err = useSelector(state => state.optionsReducer.templatesErr);

  const templates = useSelector(state => state.optionsReducer.templates);

  // search filter
  const filter = templates.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="templates-container">
      {/* if there are templates + if there are results from the search filter, display those templates */}
      {templates.length ? (
        filter.length ? (
          filter.map(template => (
            <Template
              setActive={setActive}
              deleteTemplate={deleteTemplate}
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
  );
};

export default Templates;
