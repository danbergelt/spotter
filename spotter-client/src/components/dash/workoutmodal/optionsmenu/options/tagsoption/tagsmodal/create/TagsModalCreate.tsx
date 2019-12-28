import React, { useState } from "react";
import axiosWithAuth from "../../../../../../../../utils/axiosWithAuth";
import { colors } from "../localutils/createTagStyles";
import Loader from "react-loader-spinner";
import Message from "./Message";
import { fetchTags } from "../../../../../../../../actions/tagsActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Color from "./Color";
import { fetchToken } from "src/types/State";

// tab - create tag
const TagsModalCreate = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [name, setName] = useState<string>("");
  const [hover, setHover] = useState<null | string>(null);
  const [color, setColor] = useState<string>(colors[0]);
  const [message, setMessage] = useState<{ success?: string; error?: string }>({});
  const [loading, setLoading] = useState<boolean>(false);

  const t: string | null = useSelector(fetchToken);

  const submitTag: () => Promise<void> = async () => {
    setLoading(true);
    try {
      await axiosWithAuth(t).post(
        `${process.env.REACT_APP_T_API}/api/auth/tags`,
        {
          color: color,
          content: name
        }
      );
      setMessage({ success: "New tag created" });
      setLoading(false);
      setName("");
      dispatch(fetchTags(history, t));
    } catch (error) {
      setMessage(error.response.data);
      setLoading(false);
      setName("");
    }
  };

  return (
    <div className="tags-modal-create">
      <input
        autoFocus
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Set tag name..."
        className="tags-modal-create-name"
      />
      <div className="tags-modal-colors">
        {colors.map(c => (
          <Color
            key={c}
            color={color}
            c={c}
            hover={hover}
            setHover={setHover}
            setColor={setColor}
          />
        ))}
      </div>
      {message.error && (
        <Message message={message.error} setMessage={setMessage} />
      )}
      {message.success && (
        <Message message={message.success} setMessage={setMessage} />
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
