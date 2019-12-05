import React from "react";
import FromTemplate from "./FromTemplate";
import { useDispatch } from "react-redux";
import { FiPackage } from "react-icons/fi";
import {
  SET_TEMPLATES,
  SET_TEMPLATES_ERR,
  SET_FROM_TEMPLATE
} from "../../../../../../actions/optionsActions";
import axiosWithAuth from "../../../../../../utils/axiosWithAuth";

// option to open from template modal, triggers an API call to fetch all templates

const FromTemplateOption = ({ iconClass }) => {
  const dispatch = useDispatch();

  const openFromTemplateModal = async () => {
    try {
      const res = await axiosWithAuth().get(
        `${process.env.REACT_APP_T_API}/api/auth/templates`
      );
      dispatch({ type: SET_TEMPLATES, payload: res.data.templates });
    } catch (error) {
      if (error.response)
        dispatch({
          type: SET_TEMPLATES_ERR,
          payload: error.response.data.error
        });
    }
    dispatch({ type: SET_FROM_TEMPLATE, payload: true });
  };

  return (
    <>
      <div
        onClick={openFromTemplateModal}
        className="add-workout-options-button"
      >
        <FiPackage className={iconClass} /> From Template
      </div>
      <FromTemplate />
    </>
  );
};

export default FromTemplateOption;
