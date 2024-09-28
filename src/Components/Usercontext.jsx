import React, { createContext, useReducer } from "react";
const UserContext = createContext();
const userReducer = (state,action) => {
  switch (action.type) {
    case "ADD_USER":
      return [...state,action.payload];
    case "DELETE_USER":
      return state.filter((user) => user.id !== action.payload);
    case "UPDATE_USER":
      return state.map((user) => user.id === action.payload.id ? action.payload : user);
  
    default:
      throw new Error(`Unknown type ${action.type}`);
      
  }
};
export const UserProvider = ({children}) => {
  const [users,dispatch] = useReducer(userReducer , []);
  return(
    <UserContext.Provider value={{users,dispatch}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;