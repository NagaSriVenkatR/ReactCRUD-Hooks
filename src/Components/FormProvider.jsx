// FormProvider.js
import React, { createContext, useReducer } from "react";

// Create a context for form data
const FormContext = createContext();
class FormState {
  constructor() {
    this.employees = []; // Always an empty array initially
    this.formData = {
      fullName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  // Method to reset the form data
  resetFormData() {
    this.formData = {
      fullName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  // Method to add an employee to the list
  addEmployee(employeeData) {
    this.employees.push(employeeData);
  }
}

// Initial state object using the FormState class
const initialState = new FormState();
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
      // Keep the employees intact
      return {
        ...state,
        FormData: new FormState().formData,
      };
    case "ADD_EMPLOYEE":
      return {
        ...state,
        employees: [...state.employees, action.payload], // Add the new employee
        formData: new FormState().formData, // Reset form data after adding
      };
    case "SET_FORM_DATA":
      return {
        ...state,
        formData: action.payload, // Update form data with the selected row data
      };
    case "UPDATE_EMPLOYEE":
      const updatedEmployees = state.employees.map((employee, index) =>
        index === action.index ? action.payload : employee
      );
      return {
        ...state,
        employees: updatedEmployees,
      };
    case "DELETE_EMPLOYEE":
      const filteredEmployees = state.employees.filter(
        (_, index) => index !== action.index
      );
      return {
        ...state,
        employees: filteredEmployees,
      };
    default:
      return state;
  }
};

// Initial state for the form


// FormProvider component
export function FormProvider({ children }) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <FormContext.Provider
      value={{ formData: state.formData, dispatch, employees: state.employees }}
    >
      {children}
    </FormContext.Provider>
  );
}

export default FormContext;
