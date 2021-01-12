import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { connect } from "react-redux";
import { setId, setRole } from "../actions/index";

const TitleStyled = styled.div`
  color: ${(pr) => pr.theme.secondaryColor};
  font-size: 2.5rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
`;

const LableAStyled = styled.div`
  padding: 10px;
  color: ${(pr) => pr.theme.secondaryColor};
  display: flex;
  flex-direction: row;
  height: "25px";
  width: "70%";
  margin: " 2% auto";
  justify-content: space-between;
  align-content: space-between;
`;

const BtnsStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: space-between;
  padding-bottom: 15px;
`;

const BtnSpacerStyled = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between;
  align-content: space-between; */
`;

const schema = yup.object().shape({
  mail: yup.string().required("Email field is required."),
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

  const loginSubmit = (evt) => {
    evt.preventDefault();
    const userCard = {
      email: loginValues.username,
      password: loginValues.password,
    };

    const testUser = {
      email: "email@gmail.com",
      password: "12345678",
    };
    axios
      .post("https://vr-fund.herokuapp.com/account/login", testUser)
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
      <TitleStyled>
        <p>Sign In</p>
      </TitleStyled>

      <LableAStyled>
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
        ></input>
      </LableAStyled>

      <LableAStyled>
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
        ></input>
      </LableAStyled>

      <BtnsStyled>
        <form onSubmit={loginSubmit}>
          <a href=" ">Forgot your password?</a>
          <br></br>
          <button
            // disabled={disabled}
            style={{
              fontSize: "2.4rem",
              color: "#46e38f",
              backgroundColor: "#615e5e",
            }}
          >
            Sign in to SIXR
          </button>
          <br></br>
          <br></br>
          <BtnSpacerStyled>
            <button
              style={{
                fontSize: "1rem",
                color: "#46e38f",
                backgroundColor: "#615e5e",
              }}
            >
              Create Project
            </button>
            <div style={{ width: "7%" }}></div>
            <button
              style={{
                fontSize: "1rem",
                color: "#46e38f",
                backgroundColor: "#615e5e",
              }}
            >
              Fundable Projects
            </button>
          </BtnSpacerStyled>
        </form>
      </BtnsStyled>
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
