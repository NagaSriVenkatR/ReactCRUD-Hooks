// FormProvider.js
import React, { createContext, useReducer } from "react";

// Create a context for form data
const FormContext = createContext();

// Reducer function to handle form state
const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "RESET":
      return { ...state, formData : initialState.formData };
    case "SUBMIT":
      // Handling form submission here, if needed
      return { ...state };
    default:
      return state;
  }
};

// Initial state for the form
const initialState = {
  fullName: "",
  phoneNumber: "",
  email: "",
  password: "",
  confirmPassword: "",
};

// FormProvider component
export function FormProvider({ children }) {
  const [formData, dispatch] = useReducer(formReducer, initialState);

  return (
    <FormContext.Provider value={{ formData , dispatch }}>
      {children}
    </FormContext.Provider>
  );
}

export default FormContext;
