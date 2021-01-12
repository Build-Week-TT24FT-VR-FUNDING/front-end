import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

const schema = yup.object().shape({
  first_name: yup
    .string()
    .required("First name field is required.")
    .min(2, "Name must be at least two characters."),
  last_name: yup
    .string()
    .required("Last name field is required.")
    .min(2, "Name must be at least two characters."),
  email: yup.string().required("Email field is required."),
  password: yup
    .string()
    .required("Password field is required.")
    .min(8, "Password must be at least 8 characters."),
  role: yup.number().oneOf([1, 2], "Please select a role."),
});

// setting initial form values that will change dynamically every time the user changes the inputs
const initialFormValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  role: "",
};

// organizing data set to be POSTED to API - dynamic values will be added here once form is submitted
const initialUsers = {
  users: [
    {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      role: "",
      id: Math.round(Math.random() * 1000),
    },
  ],
};

const Signup = () => {
  const { push } = useHistory();

  const [userList, setUserList] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [disabled, setDisabled] = useState(true); //state that controls whether button is disabled
  const [errors, setErrors] = useState({
    //state that holds form verification error messages
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "",
  });
  /*Disabling button unless form is validated */
  useEffect(() => {
    schema.isValid(formValues).then((valid) => setDisabled(!valid));
  }, [formValues]);

  const setFormErrors = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: "" }))
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
  };
  const roleChange = (e) => {
    var a = parseInt(e.target.value);
    setFormValues({
      ...formValues,
      role: a,
    });
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    e.stopPropagation();

    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });

    setFormErrors(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      role: formValues.role,
      id: Math.floor(Math.random() * 100),
    };

    setUserList({
      ...userList,
      users: [...userList.users, newUser],
    });
    setFormValues(initialFormValues);
    axios
      .post("https://vr-fund.herokuapp.com/account/signup", newUser)
      .then((res) => {
        setFormValues(initialFormValues);
        push("/Login");
      })
      .catch((err) => {
        setFormValues(initialFormValues);
      });
  };

  return (
    <div>
      {/* Note: I will be using inline CSS temporarily to avoid merge conflicts until we can combine it on one stylesheet */}

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '5px 10px #363131',
          margin: '2%',
        }}
      >
        <h1
          style={{
            color: '#ebeae4',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            width: '50%',
            margin: '2% auto',
            textAlign: 'center',
          }}
        >
          Create a SIXR Account
        </h1>
        <div style={{ color: "red" }} className="error-message">
          <div>{errors.first_name}</div>
          <div>{errors.last_name}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
          <div>{errors.role}</div>
        </div>
        <section
          style={{
            color: '#ebeae4',
            width: '50%',
            margin: 'auto',
            textAlign: 'center',
            fontSize: '1.8rem',
          }}
        >
          <p
            style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
            }}
          >
            Select your role:
          </p>

          {/*Radio Button 1: Fundraiser*/}
          <input
            onChange={roleChange}
            className="role"
            type="radio"
            id="fundraiser"
            name="role"
            value="1"
          />
          <label htmlFor="fundraiser">Fundraiser</label>

          {/*Radio Button 2: Funder*/}
          <input
            onChange={roleChange}
            className="role"
            type="radio"
            id="funder"
            name="role"
            value="2"
          />
          <label htmlFor="funder">Funder</label>
        </section>

        {/*Text Input Forms Based on API EndPoints: First Name, Last Name, Email, Password*/}

        {/*Container for Name Label & First and Last Name Fields*/}
        <div
          style={{
            display: 'flex',
            width: '70%',
            margin: '2% auto',
            justifyContent: 'space-between',
            color: '#ebeae4',
            fontSize: '1.8rem',
            fontWeight: 'bold',
          }}
        >
          <label>Name</label>

          {/*Container for First and Last Name Fields*/}
          <div
            style={{
              display: "flex",
              width: "80%",
              justifyContent: "space-between",
            }}
          >
            {/*First Name Field*/}
            <input
              style={{
                height: "30px",
                width: "45%",
                fontSize: "1rem",
              }}
              id="first_name"
              name="first_name"
              type="text"
              placeholder="First Name"
              value={formValues.first_name}
              onChange={handleChange}
            ></input>

            {/*Last Name Field*/}
            <input
              style={{
                height: "30px",
                width: "45%",
                fontSize: "1rem",
              }}
              name="last_name"
              id="last_name"
              type="text"
              placeholder="Last Name"
              value={formValues.last_name}
              onChange={handleChange}
            ></input>
          </div>
        </div>

        {/*Container for Email Address Label & Field*/}
        <div
          style={{
            height: "25px",
            display: "flex",
            width: "70%",
            margin: "2% auto",
            justifyContent: "space-between",
          }}
        >
          {/*Email Address Label & Field*/}
          <label
            style={{
              color: '#ebeae4',
              fontSize: '1.8rem',
              fontWeight: 'bold',
            }}
            htmlFor="email"
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
            value={formValues.email}
            onChange={handleChange}
          ></input>
        </div>

        {/*Container for Password Label & Field*/}
        <div
          style={{
            height: "25px",
            display: "flex",
            width: "70%",
            margin: " 2% auto",
            justifyContent: "space-between",
          }}
        >
          {/*Password Label & Field*/}
          <label
            style={{
              color: '#ebeae4',
              fontWeight: 'bold',
              fontSize: '1.8rem',
            }}
            htmlFor="password"
          >
            Password*
          </label>
          <input
            style={{
              height: "30px",
              width: "79%",
            }}
            name="password"
            id="password"
            type="password"
            value={formValues.password}
            onChange={handleChange}
          ></input>
        </div>
        <p style={{ color: '#ebeae4', textAlign: 'center' }}>
          *Password must be at least 8 characters
        </p>
        {/*Create Account Button - On submit will send user data to API*/}
        <button disabled={disabled}  style={{width: "20%",margin: "2% auto", 
                fontSize: "1rem",
                color: "#46e38f",
                backgroundColor: "#615e5e",
              }}>
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;
