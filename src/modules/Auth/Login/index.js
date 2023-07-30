import React, { useState } from "react";
import { Button, FormGroup, Input } from "mtforms";
import { useIsMutating } from "@tanstack/react-query";
import { useLogin } from "./hooks";
import { errorAlert, successAlert } from "../../../utils";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { PrivatePaths } from "../../../routes/path";

const Login = () => {
  const isLoading = useIsMutating();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  const validationHandler = (name, error) => {
    setErrors({ ...errors, [name]: error });
  };

  const { mutate, isSuccess, isError, error, reset } = useLogin();
  if (isError) {
    reset();
    errorAlert(error);
  }
  if (isSuccess) {
    reset();
    successAlert("Login Successful");
    setFormData("");
    navigate(PrivatePaths.DASHBOARD);
  }
  const submitHandler = () => {
    mutate(formData);
  };
  return (
    <div className="loginContainer">
      <ToastContainer />
      <div className="bgContainer">
        <div className="overlay">
          <h1>Church Database</h1>
          <p>CAC Oke-Ibukun Jesu</p>
        </div>
        <div className="bgImages"></div>
      </div>
      <div className="loginFormContainer">
        <div className="formPadding">
          <h1>Hello There!</h1>
          <br />
          <p>Please Enter your Email and Password</p>
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
            <div className="formButtonContainer">
              <span>
                Forgot Password? <Link to="/forgot-password">Reset Now</Link>
              </span>
            </div>

            <Button
              title="Login"
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

export default Login;
