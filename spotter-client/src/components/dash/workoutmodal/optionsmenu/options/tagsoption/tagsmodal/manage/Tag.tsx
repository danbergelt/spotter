import React, { memo } from "react";
import adjust from "../../../../../../../../utils/darkenColorInJS";
import styles from "../tagStyles";
import UpdateTagForm from "./UpdateTagForm";
import { TagOnWorkout as T } from "../../../../../../../../types/TagOnWorkout";

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleDelete: (tag: T) => void;
  hover: string | null;
  setHover: React.Dispatch<React.SetStateAction<string | null>>;
  tag: T;
  update: Partial<T>;
  setUpdate: React.Dispatch<React.SetStateAction<Partial<T>>>;
  updateInput: string;
  setUpdateInput: React.Dispatch<React.SetStateAction<string>>;
}

const Tag: React.FC<Props> = ({
  handleSubmit,
  handleDelete,
  hover,
  setHover,
  tag,
  update,
  setUpdate,
  updateInput,
  setUpdateInput
}) => {
  return (
    <div key={tag._id}>
      <div className="tag-manage-container">
        <div
          onClick={() => setUpdate(tag)}
          onMouseEnter={() => setHover(tag._id)}
          onMouseLeave={() => setHover(null)}
          style={
            tag._id === hover
              ? { background: adjust(tag.color, -40), ...styles }
              : { background: tag.color, ...styles }
          }
          aria-label="tags-manage"
        >
          {tag.content}
        </div>
        <div
          onClick={() => handleDelete(tag)}
          className="tag-manage-delete"
          data-testid="trash-tag"
        >
          Delete
        </div>
      </div>
      <div>
        {update && update._id === tag._id && (
          <UpdateTagForm
            handleSubmit={handleSubmit}
            updateInput={updateInput}
            setUpdateInput={setUpdateInput}
          />
        )}
      </div>
    </div>
  );
};

export default memo(Tag);