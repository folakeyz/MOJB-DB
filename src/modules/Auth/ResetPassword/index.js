import React, { useState } from "react";
import { Button, FormGroup, Input } from "mtforms";
import { useIsMutating } from "@tanstack/react-query";
// import { errorAlert, successAlert } from "../../../utils";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const isLoading = useIsMutating();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  const validationHandler = (name, error) => {
    setErrors({ ...errors, [name]: error });
  };

  // const { mutate, isSuccess, isError, error, reset } = useCreateYouth();
  // if (isError) {
  //   reset();
  //   errorAlert(error);
  // }
  // if (isSuccess) {
  //   reset();
  //   successAlert("Registration Successful");
  //   setFormData("");
  // }
  const submitHandler = () => {
    // mutate(formData);
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
          <h1>Hello There!</h1>
          <br />
          <p>Please Enter your new password</p>
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
            <Input
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

            <Button
              title="Reset Password"
              loading={isLoading === 1}
              disabled={isLoading === 1}
              size="large"
              className="btnSuccess"
            />
            <div className="formButtonContainer center">
              <span>
                Don't have an account?{" "}
                <Link to="/create-account">Create One</Link>
              </span>
            </div>
          </FormGroup>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
