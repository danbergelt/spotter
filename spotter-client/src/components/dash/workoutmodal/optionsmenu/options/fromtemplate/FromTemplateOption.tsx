import React from "react";
import FromTemplate from "./FromTemplate";
import { useDispatch, useSelector } from "react-redux";
import { FiPackage } from "react-icons/fi";
import {
  SET_TEMPLATES,
  SET_TEMPLATES_ERR,
  SET_FROM_TEMPLATE
} from "../../../../../../actions/optionsActions";
import axiosWithAuth from "../../../../../../utils/axiosWithAuth";
import { State } from "src/types/State";
import { AxiosResponse } from "axios";
import { Template } from "src/types/Template";

interface Props {
  iconClass: string;
}

// menu option to open from-template modal, triggers an API call to fetch all templates

const FromTemplateOption: React.FC<Props> = ({ iconClass }) => {
  const dispatch = useDispatch();

  const fetchToken = (state: State) => state.globalReducer.t;
  const t: string | null = useSelector(fetchToken);

  // API call that provides a selection of templates to choose from
  const openFromTemplateModal: () => Promise<void> = async () => {
    try {
      const res: AxiosResponse<any> = await axiosWithAuth(t).get(
        `${process.env.REACT_APP_T_API}/api/auth/templates`
      );
      dispatch<{ type: string; payload: Array<Template> }>({
        type: SET_TEMPLATES,
        payload: res.data.templates
      });
    } catch (error) {
      if (error.response)
        dispatch<{ type: string; payload: string }>({
          type: SET_TEMPLATES_ERR,
          payload: error.response.data.error
        });
    }
    dispatch<{ type: string; payload: boolean }>({
      type: SET_FROM_TEMPLATE,
      payload: true
    });
  };

  return (
    <>
      <div
        onClick={openFromTemplateModal}
        className="add-workout-options-button"
      >
        <FiPackage className={iconClass} /> Load Template
      </div>
      <FromTemplate />
    </>
  );
};

export default FromTemplateOption;
