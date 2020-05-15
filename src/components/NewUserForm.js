import React, { useState } from "react";
import * as yup from "yup";
import axios from "axios";
import UserData from "./UserData";

const formSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters long"),
  email: yup
    .string()
    .email("Must be a valid email address")
    .required("Must include email address"),
  password: yup
    .string()
    .min(8, "Passwords must be at least 8 characters long")
    .required("Password is required"),
  tos: yup
    .boolean()
    .oneOf([true], "You must accept the Terms and Conditions"),
});

const NewUserForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    tos: false,
  });

  const [errorState, setErrorState] = useState({
    name: "",
    email: "",
    password: "",
    tos: "",
  });
  const [users, setUsers] = useState([]);

  const validate = (event) => {
    let value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    yup
      .reach(formSchema, event.target.name)
      .validate(value)
      .then((valid) => {
        setErrorState({
          ...errorState,
          [event.target.name]: "",
        });
      })
      .catch((err) => {
        setErrorState({
          ...errorState,
          [event.target.name]: err.errors[0],
        });
      });
  };
  const inputHandler = (event) => {
    event.persist();

    validate(event);
    let value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormState({ ...formState, [event.target.name]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("Form Submitted");
    axios
      .post("https://reqres.in/api/users", formState)
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="formContainer">
      <form onSubmit={submitHandler}>
        <label htmlFor="name">
          Name<br></br>
          {errorState.name.length > 0 ? (
            <p className="error">{errorState.name}</p>
          ) : null}
          <input
            type="text"
            name="name"
            id="name"
            value={formState.name}
            onChange={inputHandler}
          />
        </label>
        <br></br>
        <label htmlFor="email">
          E-Mail<br></br>
          {errorState.email.length > 0 ? (
            <p className="error">{errorState.email}</p>
          ) : null}
          <input
            type="email"
            name="email"
            id="email"
            value={formState.email}
            onChange={inputHandler}
          />
        </label>
        <br></br>
        <label htmlFor="password">
          Enter Password<br></br>
          {errorState.password.length > 0 ? (
            <p className="error">{errorState.password}</p>
          ) : null}
          <input
            type="password"
            name="password"
            id="password"
            value={formState.password}
            onChange={inputHandler}
          />
        </label>
        <br></br>
        <label htmlFor="tos">
          Terms of Service<br></br>
          {errorState.tos.length > 0 ? (
            <p className="error">{errorState.tos}</p>
          ) : null}
          <input
            type="checkbox"
            name="tos"
            id="tos"
            value={formState.tos}
            onChange={inputHandler}
          />
        </label>
        <br></br>
        <input className="submit" type="submit" />
      </form>

      <UserData user={users} />
    </div>
  );
};
export default NewUserForm;
