import React, {useState, useContext} from "react";
import { useRouter } from 'next/router'

import GlobalContext from "../context/GlobalHeaderContext";
import api from '../api';
import ResetPassword from "~sections/Account/ResetPassword";


const PasswordReset = () => {
    const router = useRouter()
    const [showPass, setShowPass] = useState(true);

    const gContext = useContext(GlobalContext);

    const [formData, setFormData] = useState({
        'new_password1': '',
        'new_password2': '',
      });


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
      };

    const onPasswordRest = (e) => {
        e.preventDefault();
        var payload = {
            ...formData,
            uid: router.query.uid,
            token: router.query.token
        };
        api.passwordResetConfirm(payload).then(gContext.handleSuccess, gContext.handleFailure);
    };

    const togglePassword = () => {
        setShowPass(!showPass);
      };


  return (
    <ResetPassword/>
  );
};
export default PasswordReset;
