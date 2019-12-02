import React, { useState } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import styles from "./tagStyles";
import adjust from "../../../../utils/darkenColorInJS";
import { toggleTag } from "../../../../actions/workoutActions";
import { FiCheck } from "react-icons/fi";
import { styles as lStyles } from "./localutils/loaderStyles";

const TagsModalAdd = ({ tags, isLoading, toggleTag, onWorkout }) => {
  const [hover, setHover] = useState(null);
  if (isLoading) {
    return (
      <Loader
        style={lStyles}
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
      {tags.map(tag => (
        <div key={tag._id}>
          <div className="tag-add-container">
            <div
              data-testid="tag-to-add"
              onClick={() => toggleTag(tag)}
              // need to use state to manage hover due to CSS in JS
              onMouseEnter={() => setHover(tag._id)}
              onMouseLeave={() => setHover(null)}
              style={
                tag._id === hover
                  ? { background: adjust(tag.color, -40), ...styles }
                  : { background: tag.color, ...styles }
              }
            >
              {tag.content}
              {onWorkout.map(
                activeT =>
                  activeT._id === tag._id && (
                    <div
                      key={activeT._id}
                      style={{
                        color: "white",
                        fontSize: "1.75rem",
                        marginLeft: "auto"
                      }}
                    >
                      <FiCheck />
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

const mapStateToProps = state => {
  return {
    tags: state.tagsReducer.tags,
    isLoading: state.tagsReducer.isLoading,
    onWorkout: state.workoutReducer.tags
  };
};

export default connect(mapStateToProps, { toggleTag })(TagsModalAdd);
