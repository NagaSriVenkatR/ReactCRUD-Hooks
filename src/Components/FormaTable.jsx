// TablePage.js
import React, { useContext, useEffect, useState } from "react";
import FormContext from "./FormProvider";
import { useNavigate } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { TiUserDelete } from "react-icons/ti";

function FormTable() {
  const { formData } = useContext(FormContext); // Retrieve the form data
  const [data, setData] = useState([formData]); // Store data in local state for CRUD operations
  const navigate = useNavigate();
  const handleUpdate = (email) => {
    const rowData = data[email];
    navigate("/form", { state: { formData: rowData } }); 
  };
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      setData((prevData) => [...prevData, formData]);
    }
  }, [formData]);
  const handleDelete = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col mt-5">
          <h1 className="text-center">Submitted Data</h1>
          <table className="table table-hover table-striped text-center">
            <thead className="table-active">
              <tr>
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
                    <td>{index + 1}</td>
                    <td>{row.fullName}</td>
                    <td>{row.phoneNumber}</td>
                    <td>{row.email}</td>
                    <td>{row.password}</td>
                    <td>
                      <FaUserEdit
                        onClick={() => handleUpdate(data.email)}
                        style={{ color: "green", cursor: "pointer" }}
                      />
                      <TiUserDelete
                        onClick={() => handleDelete(index)}
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="">
                  {" "}
                  <td colSpan={6}>No Data Submitted Not yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FormTable;
