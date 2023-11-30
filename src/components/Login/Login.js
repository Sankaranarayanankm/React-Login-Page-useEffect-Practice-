import React, { useEffect, useReducer, useState ,useContext} from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../Context/auth-context";

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
  },[emailState.value,passwordState.value,enteredCollege]);

  const authctx=useContext(AuthContext);

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
    authctx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegeIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="college">College Name: </label>
          <input
            type="text"
            id="college"
            value={enteredCollege}
            onChange={collegeNameHandler}
            onBlur={validateCollegeNameHandler}
          />
        </div>
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
