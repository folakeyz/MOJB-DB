import React, { useState } from "react";
import { Button, FormGroup, Input, PasswordInput } from "mtforms";
import { useIsMutating } from "@tanstack/react-query";
import { errorAlert, successAlert } from "../../../utils";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { useRegister } from "./hooks";

const Register = () => {
  const isLoading = useIsMutating();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  const validationHandler = (name, error) => {
    setErrors({ ...errors, [name]: error });
  };

  const { mutate, isSuccess, isError, error, reset } = useRegister();
  if (isError) {
    reset();
    errorAlert(error);
  }
  if (isSuccess) {
    reset();
    successAlert("Registration Successful");
    setFormData("");
  }
  const submitHandler = () => {
    mutate(formData);
  };
  return (
    <div className="loginContainer">
      <ToastContainer />
      <div className="bgContainer">
        <div className="overlay">
          <h1>Learning Management System</h1>
          <p>Lotus Beta Analytics</p>
        </div>
        <div className="bgImages"></div>
      </div>
      <div className="loginFormContainer">
        <div className="formPadding">
          <h1>Hello There !</h1>
          <br />
          <p>Please Enter necessary details</p>
          <br />
        </div>

        <div>
          <FormGroup
            onSubmit={submitHandler}
            validation={formData}
            errors={errors}
            setErrors={setErrors}
          >
            <Input
              name="firstname"
              label="First Name"
              value={formData["firstname"]}
              onChange={handleChange}
              type="text"
              validationHandler={validationHandler}
              error={errors.firstname}
              required={true}
              size="large"
            />
            <Input
              name="lastname"
              label="Last Name"
              value={formData["lastname"]}
              onChange={handleChange}
              type="text"
              validationHandler={validationHandler}
              error={errors.lastname}
              required={true}
              size="large"
            />
            <Input
              name="email"
              label="Email Address"
              value={formData["email"]}
              onChange={handleChange}
              type="email"
              validationHandler={validationHandler}
              error={errors.email}
              required={true}
              size="large"
            />

            <PasswordInput
              name="password"
              label="Password"
              value={formData["password"]}
              onChange={handleChange}
              type="password"
              validationHandler={validationHandler}
              error={errors.password}
              required={true}
              size="large"
            />
            <PasswordInput
              name="confirmPassword"
              label="Confirm Password"
              value={formData["confirmPassword"]}
              onChange={handleChange}
              type="password"
              validationHandler={validationHandler}
              error={errors.confirmPassword}
              required={true}
              size="large"
            />
            <div className="formButtonContainer">
              <span>
                Have an Account? <Link to="/">Login</Link>
              </span>
            </div>

            <Button
              title="Create Account"
              loading={isLoading === 1}
              disabled={isLoading === 1}
              size="large"
              className="btnSuccess"
            />
          </FormGroup>
        </div>
      </div>
    </div>
  );
};

export default Register;
