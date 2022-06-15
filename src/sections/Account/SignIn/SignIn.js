import React, {useState, useContext} from "react";
import Link from 'next/link';
import { Container, Row, Col } from "react-bootstrap";
import useApiHelper from '../../../api';
import GlobalHeaderContext from '../../../context/GlobalHeaderContext';
import { toast } from 'react-toastify';

import SignInForm from "./style";
import Input from "../../../components/extra/Input";

import SigninBgImg from "~image/million_signin.jpg";

export default function SignIn() {
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    'email': 'mamun@gmail.com',
    'password': 'mamun',
  });
  const gContext = useContext(GlobalHeaderContext);
  const api = useApiHelper();

  const togglePassword = () => {
    setShowPass(!showPass);
  };

  const onLogin = (e) => {
    e.preventDefault();
    api.login(formData).then((response)=>{
      gContext.loginSuccessCB(response);
    }).catch((err)=>{
      gContext.validationErrorCB(err);
    });
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  };

  return (
    <SignInForm backgroundColor="#f3f4f6">
      <Container className="position-static">
        <Row className="align-items-center justify-content-center position-static">
          <Col xs="12" className="col-xl-6 col-lg-5 position-static">
            <SignInForm.Image
              backgroundImage={SigninBgImg.src}
            ></SignInForm.Image>
          </Col>
          <Col
            xs="12"
            className="col-xxl-5 col-xl-6 col-lg-7 col-md-8 col-xs-10"
          >
            <SignInForm.Box>
              <SignInForm.Title as="h2">
                Sign In to your Account
              </SignInForm.Title>
              <SignInForm.Text as="p">
                Enter your account details below to log in.
              </SignInForm.Text>
              <SignInForm.FromSection>
                <form action="./">
                  <div className="form-floating">
                    <Input
                      className="form-control"
                      type="email"
                      placeholder="Leave a comment here"
                      id="floatinginput"
                      onChange={handleChange}
                      required={true}
                      name="email"
                    />
                    <label htmlFor="floatinginput">Your Email</label>
                  </div>
                  <div className="form-floating">
                    <Input
                      className="form-control mb-0"
                      type="password"
                      placeholder="Leave a comment here"
                      id="floatinginput2"
                      onChange={handleChange}
                      required={true}
                      name="password"
                    />
                    <label htmlFor="floatinginput2">Your Password</label>
                  </div>
                  {/* {gContext?.validationError?.non_field_errors &&
                    <div className="custom-alert">
                        {gContext?.validationError?.non_field_errors.map((item,key)=><><small key={key}>{item}</small><br></br></>)}
                    </div>
                  } */}
                  {gContext?.validationError &&
                    <div className="custom-alert">
                        <small>{gContext.validationError}</small>
                    </div>
                  }
                  
                  <SignInForm.FormButton className="btn-purple-heart mt-2" onClick={(e) => onLogin(e)}>
                    Sign In
                  </SignInForm.FormButton>
                  <div className="mt-6">
                    <SignInForm.FormText >
                      <Link href="/forgotten-password">
                      <a
                        className="btn-link text-electric-violet-2 ms-0"
                        
                      >
                        Forgotten password?
                      </a>
                    </Link>
                    </SignInForm.FormText>
                  </div>
                </form>
                <div className="buttons mt-1">
                  <SignInForm.FormText>
                    Don’t have an account?
                    <Link href="/sign-up">
                      <a
                        className="btn-link text-electric-violet-2 ms-2"
                      >
                        Create a free account
                      </a>
                    </Link>
                  </SignInForm.FormText>
                </div>
              </SignInForm.FromSection>
            </SignInForm.Box>
          </Col>
        </Row>
      </Container>
    </SignInForm>
  );
}
