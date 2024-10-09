// FormProvider.js
import React, { createContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
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
        formData: {...new FormState().formData},
      };
    case "ADD_EMPLOYEE":
      if (state.employees.some((emp) => emp.email === action.payload.email)) {
        return state; // Don't add if email already exists
      }
      const newEmployee = { ...action.payload, id: uuidv4() }; 
      return {
        ...state,
        employees: [...state.employees,newEmployee], // Add the new employee
        formData: new FormState().formData, // Reset form data after adding
      };
    case "SET_FORM_DATA":
      return {
        ...state,
        formData: action.payload, // Update form data with the selected row data
      };
    case "UPDATE_EMPLOYEE":
      const updatedEmployees = state.employees.map((employee) =>
        employee.id === action.payload.id ? action.payload : employee
      );
      return {
        ...state,
        employees: updatedEmployees,
      };
    case "DELETE_EMPLOYEE":
      const filteredEmployees = state.employees.filter(
        (employee) => employee.id !== action.id
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
