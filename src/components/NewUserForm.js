import React from "react";
import * as yup from "yup";
import axios from "axios";

const formSchema = yup.object().shape({
  name: yup
    .string().required("Name is required")
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
    .oneOf([true], "You must accept the Terms and Conditions")

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
    tos: ""
  });
 
const validate = event => {
    let value =
      event.target.type === "checkbox" ? event.target.checked : event.target.value;
    yup
      .reach(formSchema, event.target.name)
      .validate(value)
      .then(valid => {
        setErrorState({
          ...errorState,
          [event.target.name]: ""
        });
      })
      .catch(err => {
        setErrorState({
          ...errorState,
          [event.target.name]: err.errors[0]
        });
      });
  };
 const inputHandler = event => {
    event.persist();
    
    validate(event);
    let value =
      event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setFormState({ ...formState, [event.target.name]: value });
  };

  const submitHandler = event => {
    event.preventDefault();
    console.log("form submitted!");
    axios
      .post("https://reqres.in/api/users", formState)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };
 
 
 
  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="name">
        Name
        <input
          type="text"
          name="name"
          id="name"
          value={formState.name}
          onChange={inputHandler}
        />
      </label>
      <label htmlFor="email">
        E-Mail
        <input
          type="email"
          name="email"
          id="email"
          value={formState.email}
          onChange={inputHandler}
        />
      </label>
      <label htmlFor="password">
        Enter Password
        <input
          type="password"
          name="password"
          id="password"
          value={formState.password}
          onChange={inputHandler}
        />
      </label>
      <label htmlFor="tos">
        Terms of Service
        <input
          type="checkbox"
          name="tos"
          id="tos"
          value={formState.tos}
          onChange={inputHandler}
        />
      </label>
      <input type="submit" />
    </form>
  );

};
export default NewUserForm;
