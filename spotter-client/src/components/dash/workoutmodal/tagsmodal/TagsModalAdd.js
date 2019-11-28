import React, { useState } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import styles from "../../../../utils/tagStyles";
import adjust from "../../../../utils/darkenColorInJS";
import { toggleTag } from "../../../../actions/workoutActions";

const TagsModalAdd = ({ tags, isLoading, toggleTag }) => {
  const [hover, setHover] = useState(null);
  if (isLoading) {
    return (
      <Loader
        style={{
          margin: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px"
        }}
        type="ThreeDots"
        color="#E9503F"
        height={15}
        width={60}
      />
    );
  }

  if (!tags.length) {
    return <div className="no-tags-found">No tags found</div>;
  }

  return (
    <>
      <div className="tag-add-head" data-testid="add-tag">
        Add
      </div>
      {tags.length
        ? tags.map(tag => (
            <div key={tag._id}>
              <div className="tag-add-container">
                <div
                  onClick={() => toggleTag(tag)}
                  onMouseEnter={() => setHover(tag.color)}
                  onMouseLeave={() => setHover(null)}
                  style={
                    tag.color === hover
                      ? { background: adjust(tag.color, -40), ...styles }
                      : { background: tag.color, ...styles }
                  }
                >
                  {tag.content}
                </div>
              </div>
            </div>
          ))
        : null}
    </>
  );
};

const mapStateToProps = state => {
  return {
    tags: state.tagsReducer.tags,
    isLoading: state.tagsReducer.isLoading
  };
};

export default connect(mapStateToProps, { toggleTag })(TagsModalAdd);
