import { useState, useEffect } from "react";
import './User.scss';

export default function User({ name: initialName }) {
  const [name, setName] = useState(() => {
    return localStorage.getItem('name') ?? initialName;
  });
  const [isEditing, setIsEditing] = useState(false);
  
  function changeNameClick() {
    setIsEditing((isEditing) => !isEditing);
  }
  
  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name])
  
  let playerName = name;
  let btnCaption = "Edit";
  if (isEditing) {
    playerName = <input type="text" onChange={e => setName(e.target.value)} value={name} required />;
    btnCaption = "Save";
  }

  return (
    <div className="user">
      <span><i>User: </i>{playerName}</span>
      <button className="inline" onClick={changeNameClick}>{btnCaption}</button>
    </div>
  )
}