import React, { memo } from "react";
import styles from "../tagStyles";
import adjust from "../../../../../../../../utils/darkenColorInJS";
import { FiCheck } from "react-icons/fi";
import { TagOnWorkout as T } from "src/types/TagOnWorkout";

interface Props {
  toggleTag: (tag: T) => void;
  onWorkout: Array<T>;
  tag: T;
  hover: string | null;
  setHover: React.Dispatch<React.SetStateAction<string | null>>;
}

const Tag: React.FC<Props> = ({
  toggleTag,
  onWorkout,
  tag,
  hover,
  setHover
}) => {
  return (
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
        {/* if the tag is on a workout, insert a check so the user is notified in-modal*/}
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
  );
};

export default memo(Tag);