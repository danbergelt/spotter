import React from "react";
import { tagStyles } from "./tagstyles";

const Tag = ({ tag }) => {
  return (
    <div data-testid="mapped-tag" style={tagStyles(tag.color)} >
      {tag.content.toUpperCase()}
    </div>
  );
};

export default Tag;
