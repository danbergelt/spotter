import React, { useState } from "react";
import { colors } from "../localutils/createTagStyles";
import Loader from "react-loader-spinner";
import Message from "./Message";
import { saveTagAction } from "../../../../../../../../actions/tagsActions";
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
  const [message, setMessage] = useState<{ success?: string; error?: string }>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(false);

  const t: string | null = useSelector(fetchToken);

  const paramsHelper = {
    setLoading,
    t,
    color,
    history,
    setMessage,
    setName,
    name
  };

  const submitTag: () => Promise<void> = async () => {
    await dispatch(saveTagAction(paramsHelper));
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
