import React,{useState,useEffect} from "react";


const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogOut:()=>{},
  onLogIn:(email,password)=>{}
});

export const AuthContextProvider =(props)=>{
  const [isLoggedIn,setIsLoggedIn]=useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem("isLoggedIn");
    if (storedValue == "1") setIsLoggedIn(true);
  }, []);


  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{isLoggedIn:isLoggedIn,onLogOut:logoutHandler,onLogIn:loginHandler}} >{props.children}</AuthContext.Provider>
  )
}

export default AuthContext;