import React, { useContext, useEffect, useState } from "react";
import FormContext from "./FormProvider";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

function FormTable() {
  const { formData,dispatch } = useContext(FormContext); // Retrieve the form data
  const [data, setData] = useState([]); // Store data in local state for CRUD operations
  const navigate = useNavigate();
  const isFormDataValid = (data) => {
    return (
      data && data.fullName && data.phoneNumber && data.email && data.password
    );
  };
  const emailExists = (email) => data.some((item) => item.email === email);
  const handleFormSubmit = () => {
     if (isFormDataValid(formData)) {
      console.log(formData);
       if (!emailExists(formData.email)) {
         setData((prevData) => [...prevData, formData]);
         dispatch({ type: "RESET" });
       } 
     }
  }
  const debouncedAddFormData = debounce(handleFormSubmit, 300);
    useEffect(() => {
      if(formData.email){
        debouncedAddFormData();
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
                <th></th>
                <th></th>
                <th className="">
                  <div className="pt-1 d-flex">
                    <button className="btn btn-danger me-2">
                      <FaMinusCircle /> Delete
                    </button>
                    <button className="btn btn-success">
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
                <th>Phone Number</th>
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
                  <td colSpan={7}>No Data Submitted Not yet</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td className="text-start" colSpan={4}>
                  Showing 5 out of 25 entries
                </td>
                <td></td>
                <td></td>
                <td className="">
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
