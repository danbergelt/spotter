import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loader-spinner";
import { TOGGLE_TAG } from "../../../../../../../../actions/workoutActions";
import { styles as lStyles } from "../localutils/loaderStyles";
import Tag from "./Tag";

// tab - add tag to current workout
const TagsModalAdd = () => {
  const tags = useSelector(state => state.tagsReducer.tags);
  const isLoading = useSelector(state => state.tagsReducer.isLoading);
  const onWorkout = useSelector(state => state.workoutReducer.tags);
  const dispatch = useDispatch();

  const [hover, setHover] = useState(null);

  const toggleTag = useCallback(
    tag => {
      dispatch({ type: TOGGLE_TAG, payload: tag });
    },
    [dispatch]
  );

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
      {/* map list of created tags */}
      {tags.map(tag => (
        <Tag
          key={tag._id}
          toggleTag={toggleTag}
          onWorkout={onWorkout}
          tag={tag}
          hover={hover}
          setHover={setHover}
        />
      ))}
    </>
  );
};

export default TagsModalAdd;
