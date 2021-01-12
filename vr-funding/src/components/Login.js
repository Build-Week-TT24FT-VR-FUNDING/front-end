import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

import { connect } from "react-redux";
import { setId, setRole } from "../actions/index";

import { Button } from "antd";

const schema = yup.object().shape({
  email: yup.string().required("Email field is required."),
  password: yup
    .string()
    .required("Password field is required.")
    .min(8, "Password must be at least 8 characters."),
});

const initialLoginValues = { email: "", password: "" };
const initialLoginErrors = {
  username: "",
  password: "",
};

const initialDisabled = true;

const Login = (props) => {
  const { push } = useHistory();

  const [loginValues, setLoginValues] = useState(initialLoginValues);
  const [loginErrors, setLoginErrors] = useState(initialLoginErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  useEffect(() => {
    schema.isValid(loginValues).then((valid) => setDisabled(!valid));
  }, [loginValues]);

  const handleChange = (e) => {
    setLoginValues({
      ...loginValues,
      [e.target.name]: e.target.value,
    });
  };

  const loginSubmit = (evt) => {
    evt.preventDefault();
    const userCard = {
      email: loginValues.email,
      password: loginValues.password,
    };

    axios
      .post("https://vr-fund.herokuapp.com/account/login", userCard)
      .then((res) => {
        window.localStorage.setItem("token", res.data.token);
        window.localStorage.setItem("role", res.data.role);
        window.localStorage.setItem("id", res.data.id);
        props.setRole(res.data.role);
        props.setId(res.data.id);
        setLoginValues(initialLoginValues);
        push("/");
      })
      .catch((err) => {
        setLoginValues(initialLoginValues);
      });
  };
  return (
    <div>
      <form onSubmit={loginSubmit}>
        <h2>Sign In</h2>

        <label
          style={{
            fontSize: "1.8rem",
          }}
          htmlFor="password"
        >
          Email
        </label>
        <input
          style={{
            height: "30px",
            width: "79%",
          }}
          name="email"
          id="email"
          type="email"
          value={loginValues.email}
          onChange={handleChange}
        ></input>
        <label
          style={{
            fontSize: "1.8rem",
          }}
          htmlFor="email"
        >
          Password
        </label>
        <input
          style={{
            height: "30px",
            width: "79%",
          }}
          name="password"
          id="password"
          type="password"
          value={loginValues.password}
          onChange={handleChange}
        ></input>

        <br></br>
        <Button
          // disabled={disabled}
          style={{
            fontSize: "2.4rem",
            color: "#46e38f",
            backgroundColor: "#615e5e",
          }}
        >
          Sign in to SIXR
        </Button>
        <br></br>
        <br></br>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    role: state.role,
    id: state.id,
  };
};

export default connect(mapStateToProps, { setId, setRole })(Login);
