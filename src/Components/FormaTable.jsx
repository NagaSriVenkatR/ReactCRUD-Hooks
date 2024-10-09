import React, { useContext, useEffect, useState } from "react";
import FormContext from "./FormProvider";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
function FormTable() {
  const { formData,dispatch,employees = [] } = useContext(FormContext); // Retrieve the form data
  const [data, setData] = useState(employees); // Store data in local state for CRUD operations
  const navigate = useNavigate();
    useEffect(() => {
     setData(employees); 
     console.log("Employees:", employees);
   }, [employees]);
  const isFormDataValid = (data) => {
    return (
      data && data.fullName && data.phoneNumber && data.email && data.password
    );
  };
  const [duplicateError, setDuplicateError] = useState("");
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (isFormDataValid(formData)) {
      console.log(formData);
         if (formData.id) {
           // If the employee exists, update their information
           dispatch({ type: "UPDATE_EMPLOYEE", payload: formData });
           console.log("Update Employee",formData)
         } else {
           // If it's a new employee, add the ID and add them to the list
           const newEmployee = { ...formData, id: uuidv4() };
           dispatch({ type: "ADD_EMPLOYEE", payload: newEmployee });
           console.log("New Employee",newEmployee);
         }
    dispatch({ type: "RESET" });
    setDuplicateError("");
    }
  };
  useEffect(() => {
    if (formData.email && isFormDataValid(formData)) {
      handleFormSubmit({ preventDefault: () => {} }); // Mocking preventDefault
    }
  }, [formData]);
  const handleUpdate = (id) => {
    const rowData = data.find((item) => item.id === id);
    dispatch({ type: "SET_FORM_DATA", payload: rowData });
    navigate("/form", { state: { formData: rowData } });
  };
  const handleDelete = (id) => {
    dispatch({type:"DELETE_EMPLOYEE",id})
  }
  const handleAdd = (e) => {
    e.preventDefault();
    dispatch({type:"RESET"});
    navigate("/form");
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col mt-5 table-responsive">
          <table className="table table-hover text-center">
            <thead className="">
              <tr className="header">
                <th className="" colSpan={4}>
                  <div className="d-flex">
                    <h2 className="text-white ps-5">Manage</h2>
                    <h2 className="text-white ps-1">
                      <b>Employees</b>
                    </h2>
                  </div>
                </th>
                <th ></th>
                <th className="" colSpan={2}>
                  <div className="pt-1 d-flex">
                    <button className="btn btn-danger me-2">
                      <FaMinusCircle /> Delete
                    </button>
                    <button className="btn btn-success" onClick={handleAdd}>
                      <FaPlusCircle /> Add Employee
                    </button>
                  </div>
                </th>
              </tr>
              <tr>
                <th>
                  <input type="checkbox" name="" id="" />
                </th>
                <th>S.NO</th>
                <th>Name</th>
                <th>PhoneNumber</th>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {data.length > 0 ? (
                data.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <input type="checkbox" name="" id="" />
                    </td>
                    <td>{index + 1 || ""}</td>
                    <td>{row.fullName || " "}</td>
                    <td>{row.phoneNumber || " "}</td>
                    <td>{row.email || " "}</td>
                    <td>{row.password || " "}</td>
                    <td>
                      <MdModeEdit
                        className="me-2"
                        onClick={() => handleUpdate(row.id)}
                        style={{ color: "yellow", cursor: "pointer" }}
                      />
                      <MdDelete
                        onClick={() => handleDelete(row.id)}
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="">
                  <td colSpan={7}>{duplicateError}No Data Submitted Not yet</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td className="text-start" colSpan={5}>
                  Showing {data.length} out of{" "}
                  { employees ? employees.length : 0} entries
                </td>
                <td colSpan={4}>
                  <div className="d-flex ">
                    <p className="btn">Previous</p>
                    <p className="btn">1</p>
                    <p className="btn">2</p>
                    <p className="btn bg-primary">3</p>
                    <p className="btn">4</p>
                    <p className="btn">5</p>
                    <p className="btn">Next</p>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FormTable;
