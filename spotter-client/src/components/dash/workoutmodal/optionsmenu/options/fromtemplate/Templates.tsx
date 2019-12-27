import React, { useCallback } from "react";
import Template from "./Template";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_TEMPLATE } from "../../../../../../actions/optionsActions";
import axiosWithAuth from "../../../../../../utils/axiosWithAuth";
import { Template as T } from "src/types/Template";
import { State } from "src/types/State";

interface Props {
  setActive: React.Dispatch<React.SetStateAction<{} | T>>;
  active: Partial<T>;
  search: string;
}

// templates container

const Templates: React.FC<Props> = ({ setActive, active, search }) => {
  const dispatch = useDispatch();

  const fetchToken = (state: State) => state.globalReducer.t;
  const t: string | null = useSelector(fetchToken);

  const fetchErr = (state: State) => state.optionsReducer.templatesErr;
  const err: string = useSelector(fetchErr);

  const fetchTemplates = (state: State) => state.optionsReducer.templates;
  const templates: Array<T> = useSelector(fetchTemplates);

  const deleteTemplate: (id: string) => Promise<void> = useCallback(
    async id => {
      await axiosWithAuth(t).delete(
        `${process.env.REACT_APP_T_API}/api/auth/templates/${id}`
      );
      dispatch<{ type: string; payload: string }>({
        type: DELETE_TEMPLATE,
        payload: id
      });
    },
    [dispatch, t]
  );
  // search filter
  const filter: Array<T> = templates.filter(t =>
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
