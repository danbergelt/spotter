import React from "react";
import adjust from "../../../../../../../../utils/darkenColorInJS";
import styles from "../tagStyles";
import UpdateTagForm from "./UpdateTagForm";

const Tag = React.memo(
  ({
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
  }
);

export default Tag;
