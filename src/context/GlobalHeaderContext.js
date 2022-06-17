import React, {useState, useEffect} from "react";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import {deleteAllCookies} from "../interceptor";
import useApiHelper from "../api";

import headerDefaultConfig from "~data/headerDefaultConfig";

export const headerDefault = headerDefaultConfig;
const GlobalHeaderContext = React.createContext();

const GlobalHeaderProvider = ({children}) =>{
  const [header , setHeader] = useState(headerDefault);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [validationError, setValidationError] = useState(null);

  const router = useRouter();
  const api = useApiHelper();

  useEffect(()=>{
    // decide if logged in or not
    if (Cookies.get('accessToken')) {
      return setIsLoggedIn(true);
    } else {
      return setIsLoggedIn(false);
    }
  })

  // Error Callback Functions
  const validationErrorCB = (error) => {
    setValidationError(error?.response?.data?.detail);
  }

  const loginSuccessCB = (response) => {
    if (response?.access) {
      Cookies.set('accessToken', response.access);
      
      toast.success("you are logged in");
      setValidationError(null);
      router.push('/dashboard');
    }
  }

  const handleSignUpSuccess = (response) => {
    toast.success("your registration Done");
    setValidationError(null);
    router.push('/activation');
    // if (response?.token) {
    //   Cookies.set('accessToken', response.token);
    //   toast.success("your registration Done");
    //   setValidationError(null);
    //   router.push('/dashboard');
    // }
  }

  const onLogout = () => {
    localStorage.clear();
    deleteAllCookies();
    setIsLoggedIn(false);
    router.push('/')
    toast.success("You're logged out")
    // api.logout().then((response) => {
    //   router.push('/')
    // }, (err) => {
    //     deleteAllCookies()
    // })
  }

  const changeHeader = (headerConfig = headerDefault) => {
    setHeader({
      ...header,
      ...headerConfig,
    });
  };

  return (
    <GlobalHeaderContext.Provider 
      value={{
        header,
        changeHeader,
        isLoggedIn,
        setIsLoggedIn,
        loginSuccessCB,
        handleSignUpSuccess,
        validationError,
        setValidationError,
        validationErrorCB,
        onLogout
      }}
    >
      {children}
    </GlobalHeaderContext.Provider>
  )
}

export default GlobalHeaderContext;
export { GlobalHeaderProvider };