import React, { useContext, useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Form.css';
import Tech from './image.png';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook} from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import FormContext from './FormProvider';
import { useLocation, useNavigate } from 'react-router-dom';
function Form() {
  const { formData, dispatch } = useContext(FormContext);
  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleBlur = (event) => {
    const { name, value } = event.target;
    let validateErrors = { ...errors };
    if (!value) {
      validateErrors[name] = `${
        name.charAt(0).toUpperCase() + name.slice(1)
      } is required `;
    } else {
      validateErrors[name] = "";
    }
    setErrors(validateErrors);
  };
   const fullNameRef = useRef(null);
   const phoneNumberRef = useRef(null);
   const emailRef = useRef(null);
   const passwordRef = useRef(null);
   const confirmPasswordRef = useRef(null);
  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value });
  };
  let phoneNumberPattern = /^([0-9]{10})$/
  let emailPattern =
    /^([a-zA-Z0-9]+)@([a-zA-Z0-9-]+).([a-zA-Z]+).([a-zA-Z]{2,20})$/;
  let upperCasePattern = /[A-Z]/;
  let lowerCasePattern = /[a-z]/;
  let numberPattern = /[0-9]/;
  let specialCharacterPattern = /[~!@#%&()$^_?]/;
  let minlengthCharacterPattern = /^.{8,16}$/;
  const validateForm = () => {
    let valid = true;
    let newErrors = [];
    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required";
      valid = false;
    } else {
      newErrors.fullName = " ";
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
      valid=false;
    }else{
      if(!phoneNumberPattern.test(formData.phoneNumber)){
        newErrors.phoneNumber = "Enter valid mobile number";
        valid=false;
      }else{
        newErrors.phoneNumber = "";
      }
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else {
      if (!emailPattern.test(formData.email)) {
        newErrors.email = "Enter valid email";
        valid = false;
      } else {
        newErrors.email = " ";
      }
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else {
      if (!minlengthCharacterPattern.test(formData.password)) {
        newErrors.password = "password must be between 8 to 16 characters";
        valid = false;
      } else if (!lowerCasePattern.test(formData.password)) {
        newErrors.password = "At least 1 lowercase character";
        valid = false;
      } else if (!numberPattern.test(formData.password)) {
        newErrors.password = "At least 1 number";
        valid = false;
      } else if (!specialCharacterPattern.test(formData.password)) {
        newErrors.password = "At least 1 special character";
        valid = false;
      } else if (!upperCasePattern.test(formData.password)) {
        newErrors.password = "At least 1 uppercase character";
        valid = false;
      } else {
        newErrors.password = " ";
      }
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword =
        "Check your confirm password and password should be same";
      valid = false;
    } else {
      newErrors.confirmPassword = "";
    }
    setErrors(newErrors);
    return valid;
  };
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully", formData);
      navigate("/table");
     
    } else {
      console.log("Duplicate entry detected for email:", formData.email);
    }
  }
   const location = useLocation();
   const initialFormData = location.state?.formData;

   useEffect(() => {
     // If initialFormData is present, populate the form with it
     if (initialFormData) {
       dispatch({
         type: "UPDATE_FIELD",
         field: "fullName",
         value: initialFormData.fullName,
       });
       dispatch({
         type: "UPDATE_FIELD",
         field: "phoneNumber",
         value: initialFormData.phoneNumber,
       });
       dispatch({
         type: "UPDATE_FIELD",
         field: "email",
         value: initialFormData.email,
       });
       dispatch({
         type: "UPDATE_FIELD",
         field: "password",
         value: initialFormData.password,
       });
       dispatch({
         type: "UPDATE_FIELD",
         field: "confirmPassword",
         value: initialFormData.confirmPassword,
       });
     }
   }, [initialFormData, dispatch]);
    const handleReset = () => {
      dispatch({ type: "RESET" });
      setErrors({
        fullName: "",
        phoneNumber: "",
        email: "",
        userName: "",
        password: "",
        confirmPassword: "",
      });
    };
  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-10 col-lg-10 col-md d-md-flex parent">
            <div className="col-md-8 text-center d-md-block d-none">
              <div className="text-white tech">
                <img className="text-center" src={Tech} alt="" />
                <p className="text-center">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Doloremque maiores <br />
                  reprehenderit tempore eos molestias, cupiditate eius nobis
                  voluptatem <br />
                  veniam nesciunt expedita, deleniti blanditiis excepturi
                  voluptas <br /> corrupti! Qui squam, sequi! Dolorum, maiores.
                </p>
                <div className="justify-content-between">
                  <button className="btn btn-primary me-5">Sign In</button>
                  <button className="btn btn-primary">Sign Up</button>
                </div>
                <div className="mt-4">
                  <p>Or Sign Up With</p>
                  <div>
                    <button className="btn me-2">
                      <FcGoogle className="fs-2" />
                    </button>
                    <button className="btn me-2">
                      <FaFacebook className="text-primary fs-2" />
                    </button>
                    <button className="btn">
                      <FaSquareXTwitter className="text-black fs-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 form p-4 my-md-4 mx-auto me-md-5 text-white">
              <div className="">
                <h3>Sign Up</h3>
                <p className="para">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Deserunt velit itaque in .
                </p>
              </div>
              <form action="" onSubmit={handleSubmit}>
                <div className="">
                  <label className="" htmlFor="">
                    Name
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="fullName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={formData?.fullName || ""}
                    ref={fullNameRef}
                  />
                  <span className="mb-2">{errors.fullName}</span>
                </div>
                <div className="">
                  <label className="mt-3" htmlFor="">
                    Phone Number
                  </label>
                  <input
                    className="form-control"
                    type="tel"
                    name="phoneNumber"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={formData?.phoneNumber || ""}
                    ref={phoneNumberRef}
                  />
                  <span>{errors.phoneNumber}</span>
                </div>
                <div className="">
                  <label className="mt-3" htmlFor="">
                    Email
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={formData?.email || ""}
                    ref={emailRef}
                  />
                  <span>{errors.email}</span>
                </div>
                <div className="">
                  <label className="form-label mt-3" htmlFor="">
                    Password
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={formData?.password || ""}
                    ref={passwordRef}
                  />
                  <span>{errors.password}</span>
                </div>
                <div className="">
                  <label className="form-label mt-3" htmlFor="">
                    Confirm Password
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    name="confirmPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={formData?.confirmPassword || ""}
                    ref={confirmPasswordRef}
                  />
                  <span>{errors.confirmPassword}</span>
                </div>
                <div className="d-flex mt-3">
                  <input className="form-check mt-1" type="checkbox" />
                  <p className='mt-3 agree'> I agree terms of Service and Privacy Policy</p>
                </div>
                <div className="mt-1 text-center d-flex justify-content-evenly">
                  <button
                    className="btn btn-primary register px-4 py-2"
                    type="submit"
                  >
                    Register
                  </button>
                  <button
                    className="btn btn-primary register px-4 py-2"
                    type="reset"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form
