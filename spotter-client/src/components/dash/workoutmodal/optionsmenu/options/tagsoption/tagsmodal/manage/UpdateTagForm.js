import React from "react";

const UpdateTagForm = React.memo(({ handleSubmit, updateInput, setUpdateInput }) => {
  return (
    <form onSubmit={e => handleSubmit(e)}>
      <input
        autoFocus
        className="tag-manage-update-input"
        placeholder="Update tag name..."
        value={updateInput}
        onChange={e => setUpdateInput(e.target.value)}
      />
      <button
        data-testid="save-tag"
        className="tag-manage-update-submit"
        type="submit"
      >
        Save
      </button>
    </form>
  );
});

export default UpdateTagForm;
