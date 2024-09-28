import React, { useContext, useState } from "react";
import UserContext from "../Components/Usercontext";
import UserForm from "./Userform";

const UserList = () => {
  const { users, dispatch } = useContext(UserContext);
  const [isEdit, setIsEdit] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [editUserData, setEditUserData] = useState({ name: "", email: "" });

  const deleteUser = (id) => {
    dispatch({ type: "DELETE_USER", payload: id });
  };

  const handleEdit = (user) => {
    setIsEdit(true);
    setEditUserId(user.id);
    setEditUserData({ name: user.name, email: user.email });
  };

  return (
    <div>
      <h2>User List</h2>
      {users.length === 0 ? (
        <p>No users added</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <UserForm
        isEdit={isEdit}
        editUserId={editUserId}
        editUserData={editUserData}
        setIsEdit={setIsEdit}
        setEditUserId={setEditUserId}
      />
    </div>
  );
};

export default UserList;
