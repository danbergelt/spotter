import React, { useState } from "react";
import axiosWithAuth from "../../../../utils/axiosWithAuth";
import styles from "../../../../styles/variables.scss";
import adjust from "../../../../utils/darkenColorInJS";
import { FiCheck, FiX } from "react-icons/fi";
import Loader from "react-loader-spinner";

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
    styles.gray2
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
  const [message, setMessage] = useState({});
  const [loading, setLoading] = useState(false);

  const submitTag = async () => {
    setLoading(true);
    try {
      await axiosWithAuth().post(
        `${process.env.REACT_APP_T_API}/api/auth/tags`,
        {
          color: color,
          content: name
        }
      );
      setMessage({ success: "New tag created" });
      setLoading(false);
      setName("");
    } catch (error) {
      setMessage(error.response.data);
      setLoading(false);
      setName("");
    }
  };

  return (
    <div className="tags-modal-create">
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Set tag name..."
        className="tags-modal-create-name"
      />
      <div className="tags-modal-colors">
        {colors.map(c => (
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
            data-testid={c === color && 'selected-tag'}
            aria-label="tag-colors"
          >
            {c === color && (
              <div className="active-tag-color">
                <FiCheck />
              </div>
            )}
          </div>
        ))}
      </div>
      {message.error && (
        <div className="tag-creation failure">
          {message.error}
          <div
            onClick={() => setMessage("")}
            style={{ fontSize: "1.2rem", cursor: "pointer" }}
          >
            <FiX />
          </div>
        </div>
      )}
      {message.success && (
        <div className="tag-creation success">
          {message.success}
          <div
            onClick={() => setMessage("")}
            style={{ fontSize: "1.2rem", cursor: "pointer" }}
          >
            <FiX />
          </div>
        </div>
      )}
      <div onClick={submitTag} className="tags-modal-create-submit">
        {loading ? (
          <Loader color="white" height={10} width={50} type="ThreeDots" />
        ) : (
          "Create Tag"
        )}
      </div>
    </div>
  );
};

export default TagsModalCreate;
