import React, { useEffect, useReducer, useState, useContext } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../Context/auth-context";
import Input from "../UI/Input/Input";

function emailReducer(state, action) {
  if (action.type == "input_email") {
    return { value: action.value, isValid: action.value.includes("@") };
  }
  if (action.type == "EMAIL_VALID") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
}
function passwordReducer(state, action) {
  if (action.type == "input_password") {
    return { value: action.value, isValid: action.value.length > 6 };
  }
  if (action.type == "valid_password") {
    return { value: state.value, isValid: state.value.length > 6 };
  }
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollege, setEnteredCollege] = useState("");
  const [collegeIsValid, setCollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  useEffect(() => {
    const timeOut = setTimeout(() => {
      console.log("timeout");
      setFormIsValid(
        emailState.value.includes("@") &&
          passwordState.value.trim().length > 6 &&
          enteredCollege.trim().length > 0
      );
    }, 500);
    return () => {
      console.log("cleanup function");
      clearTimeout(timeOut);
    };
  }, [emailState.value, passwordState.value, enteredCollege]);

  const authctx = useContext(AuthContext);

  console.log(authctx)

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: "input_email", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: "input_password", value: event.target.value });
  };
  const collegeNameHandler = (event) => {
    setEnteredCollege(event.target.value);
  };
  const validateEmailHandler = () => {
    dispatchEmail({ type: "EMAIL_VALID" });
    // setEmailIsValid(emailState.value.includes("@"));
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "valid_password" });
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };
  const validateCollegeNameHandler = () => {
    setCollegeIsValid(enteredCollege.trim().length > 0);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authctx.onLogIn(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="name"
          label="Email"
          type="email"
          value={emailState.value}
          isValid={emailState.isValid}
          onChange={emailChangeHandler}
          onValid={validateEmailHandler}
        />
       <Input
          id="password"
          label="Password"
          type="password"
          value={passwordState.value}
          isValid={passwordState.isValid}
          onChange={passwordChangeHandler}
          onValid={validatePasswordHandler}
        />
        <Input 
         id="college"
         type="text"
         label="College Name:"
         value={enteredCollege}
         onChange={collegeNameHandler}
         onValid={validateCollegeNameHandler}
        />        
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
