import React, {useContext } from "react";
import AuthContext from "./components/Context/auth-context";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  const cxt = useContext(AuthContext);
  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!cxt.isLoggedIn && <Login />}
        {cxt.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
