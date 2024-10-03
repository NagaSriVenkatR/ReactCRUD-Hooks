import React, { useContext, useEffect, useState } from "react";
import FormContext from "./FormProvider";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

function FormTable() {
  const { formData,dispatch } = useContext(FormContext); // Retrieve the form data
  const [data, setData] = useState([]); // Store data in local state for CRUD operations
  const navigate = useNavigate();
  const isFormDataValid = (data) => {
    return (
      data && data.fullName && data.phoneNumber && data.email && data.password
    );
  };
  const [duplicateError, setDuplicateError] = useState("");
  const emailExists = (email) => data.some((item) => item.email === email);
  const handleFormSubmit = () => {
     if (isFormDataValid(formData)) {
      console.log(formData);
       if (!emailExists(formData.email)) {
         setData((prevData) => [...prevData, formData]);
         dispatch({ type: "RESET" });
         setDuplicateError("");
       } 
     }
  }
  const debouncedAddFormData = debounce(handleFormSubmit, 300);
    useEffect(() => {
      if(formData.email){
        debouncedAddFormData();
      }else{
        setDuplicateError("Email already exists")
      }
    }, [formData,debouncedAddFormData]);
  const handleUpdate = (email) => {
    const rowData = data.find((item) => item.email === email);
    navigate("/form", { state: { formData: rowData } });
  };
  const handleDelete = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col mt-5">
          <div className="d-flex justify-content-between header px-3 py-2">
            <h1 className="text-center text-white">Manage Employees </h1>
            <div className="pt-1">
              <button className="btn btn-danger me-2">
                <CiCircleMinus /> Delete
              </button>
              <button className="btn btn-success">
                <CiCirclePlus /> Add Employee
              </button>
            </div>
          </div>
          <table className="table table-hover table-responsive text-center">
            <thead className="">
              <tr>
                <th><input type="checkbox" name="" id="" /></th>
                <th>S.NO</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-striped table-active">
              {data.length > 0 ? (
                data.map((row, index) => (
                  <tr key={index}>
                    <td><input type="checkbox" name="" id="" /></td>
                    <td>{index + 1}</td>
                    <td>{row.fullName}</td>
                    <td>{row.phoneNumber}</td>
                    <td>{row.email}</td>
                    <td>{row.password}</td>
                    <td>
                      <MdModeEdit
                        className="me-2"
                        onClick={() => handleUpdate(row.email)}
                        style={{ color: "yellow", cursor: "pointer" }}
                      />
                      <MdDelete
                        onClick={() => handleDelete(index)}
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="">
                  <td colSpan={6}>No Data Submitted Not yet</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="d-flex justify-content-between px-3">
            <div>
              <p className="fs-5">Showing 5 out of 25 entries</p>
            </div>
            <div className="d-flex">
              <p className="btn">Previous</p>
              <p className="btn">1</p>
              <p className="btn">2</p>
              <p className="btn bg-primary">3</p>
              <p className="btn">4</p>
              <p className="btn">5</p>
              <p className="btn">Next</p>
            </div>
          </div>
          {duplicateError && <div className="error">{duplicateError}</div>}
        </div>
      </div>
    </div>
  );
}

export default FormTable;
