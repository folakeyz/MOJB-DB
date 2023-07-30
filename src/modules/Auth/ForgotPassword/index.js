import React, { useState } from "react";
import { Button, FormGroup, Input } from "mtforms";
import { useIsMutating } from "@tanstack/react-query";
import { errorAlert, successAlert } from "../../../utils";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { useForgotPassword } from "./hooks";

const ForgotPassword = () => {
  const isLoading = useIsMutating();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  const validationHandler = (name, error) => {
    setErrors({ ...errors, [name]: error });
  };

  const { mutate, isSuccess, isError, error, reset } = useForgotPassword();
  if (isError) {
    reset();
    errorAlert(error);
  }
  if (isSuccess) {
    reset();
    successAlert(
      "Password Reset Successful, Please check your email for more information"
    );
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
          <h1>Forgot Password</h1>
          <br />
          <p>Please Enter your email to reset your password</p>
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
              name="email"
              label="Email"
              value={formData["email"]}
              onChange={handleChange}
              type="email"
              validationHandler={validationHandler}
              error={errors.email}
              required={true}
              size="large"
            />

            <div className="formButtonContainer">
              <span>
                Have an Account? <Link to="/">Login</Link>
              </span>
            </div>

            <Button
              title="Forgot Password"
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

export default ForgotPassword;
