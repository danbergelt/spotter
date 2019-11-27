import React from "react";
import { connect } from "react-redux";

const TagsModalManage = ({ tags }) => {

  if (!tags.length) {
    return <div>No tags found</div>;
  } else {
    return tags.map((tag, i) => <div key={i}>tag</div>);
  }
};

const mapStateToProps = state => {
  return {
    tags: state.tagsReducer.tags
  };
};

export default connect(mapStateToProps, {})(TagsModalManage);
