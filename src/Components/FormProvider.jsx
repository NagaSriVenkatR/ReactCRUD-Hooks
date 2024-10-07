// FormProvider.js
import React, { createContext, useReducer } from "react";

// Create a context for form data
const FormContext = createContext();
const initialState = {
  formData: {
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  employees: []
};

// Reducer function to handle form state
const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
      };
    case "RESET":
      return initialState.formData;
    case "ADD_EMPLOYEE":
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };
    default:
      return state;
  }
};

// Initial state for the form


// FormProvider component
export function FormProvider({ children }) {
  const [state,dispatch] = useReducer(formReducer, initialState);

  return (
    <FormContext.Provider
      value={{ formData: state.formData, dispatch, employees: state.employees }}
    >
      {children}
    </FormContext.Provider>
  );
}

export default FormContext;
