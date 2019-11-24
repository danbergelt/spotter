import React, { useState } from "react";
import styles from "../../../../styles/variables.scss";
import adjust from "../../../../utils/darkenColorInJS";
import { FiCheck } from "react-icons/fi";

const TagsModalCreate = () => {
  const colors = [
    styles.primary,
    styles.info,
    styles.success,
    "#E84579",
    styles.warning,
    styles.info2,
    styles.success2,
    styles.warning2,
    styles.gray1,
    styles.gray2,
  ];

  const colorStyles = {
    width: "38px",
    height: "38px",
    borderRadius: "100%",
    cursor: "pointer",
    margin: "0.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };

  const [name, setName] = useState("");
  const [hover, setHover] = useState(null);
  const [color, setColor] = useState(styles.primary);

  return (
    <div className="tags-modal-create">
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Set tag name..."
        className="tags-modal-create-name"
      />
      <div className="tags-modal-colors">
        {colors.map((c, i) => (
          <div
            key={c}
            style={
              c === hover && c !== color
                ? { ...colorStyles, background: adjust(c, -40) }
                : { ...colorStyles, background: c }
            }
            onClick={() => setColor(c)}
            onMouseEnter={() => setHover(c)}
            onMouseLeave={() => setHover(null)}
          >{c === color && <div className="active-tag-color"><FiCheck /></div>}</div>
        ))}
      </div>
      <div className="tags-modal-create-submit">Create Tag</div>
    </div>
  );
};

export default TagsModalCreate;
