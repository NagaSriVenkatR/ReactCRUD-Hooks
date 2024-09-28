import React, { useRef, useContext, useState } from "react";
import UserContext from "../Components/Usercontext";

const UserForm = () => {
  const { dispatch } = useContext(UserContext);
  const [isEdit, setIsEdit] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  

  // Refs for input fields
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  // Handler to add or update user
  const handleSubmit = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;

    if (!name || !email) return;

    if (isEdit) {
      // Update user
      dispatch({
        type: "UPDATE_USER",
        payload: { id: editUserId, name, email },
      });
      setIsEdit(false);
      setEditUserId(null);
    } else {
      // Add user
      dispatch({
        type: "ADD_USER",
        payload: { id: Date.now(), name, email },
      });
    }

    // Clear input fields
    nameRef.current.value = "";
    emailRef.current.value = "";
  };

  return (
    <div>
      <input type="text" placeholder="Name" ref={nameRef} />
      <input type="email" placeholder="Email" ref={emailRef} />
      <button onClick={handleSubmit}>
        {isEdit ? "Update User" : "Add User"}
      </button>
    </div>
  );
};

export default UserForm;
