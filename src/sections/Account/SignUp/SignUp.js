import React, {useState, useContext} from "react";
import { Container, Row, Col } from "react-bootstrap";
import useApiHelper from '../../../api';
import GlobalHeaderContext from '../../../context/GlobalHeaderContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'

import SignUpForm from "./style";
import SignupBgImg from "~image/million_signup.jpg";
import { Link } from "~components";
import Input from "../../../components/extra/Input";


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorData, setErrorData] = useState(null);

  const api = useApiHelper();
  const gContext = useContext(GlobalHeaderContext);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }


  const onSignupClick = (e) => {
    e.preventDefault();

    if(formData.password===formData.re_password){
      api.signUp({...formData}).then((response)=>{
        gContext.handleSignUpSuccess(response);
      }).catch((err)=>{
        gContext.validationErrorCB(err);
      });
    } else {
      setErrorData("Password didn't match")
    }

  };

  return (
    <SignUpForm backgroundColor="#f3f4f6">
      <Container className="position-static">
        <Row className="align-items-center justify-content-center position-static">
          <Col xs="12" className="col-xl-6 col-lg-5 position-static">
            <SignUpForm.Image
              backgroundImage={SignupBgImg.src}
            ></SignUpForm.Image>
          </Col>
          <Col xs="12" className="col-xxl-6 col-xl-6 col-lg-7 col-md-9">
            <SignUpForm.Box plXXL="60px">
              <SignUpForm.Title as="h2">Create Your Account</SignUpForm.Title>
              <SignUpForm.Text as="p">
              </SignUpForm.Text>
              <SignUpForm.FromSection>
                <form action="./" onSubmit={(e) => onSignupClick(e)} autoComplete="on">
                  <div className="form-floating">
                    <Input
                      className="form-control"
                      type="text"
                      placeholder="Your Name"
                      id="floatinginput1"
                      onChange={handleChange}
                      required={true}
                      name="name"
                    />
                    <label htmlFor="floatinginput1">Your Name</label>
                  </div>
                  
                  <div className="form-floating">
                    <Input
                      className="form-control"
                      type="email"
                      placeholder="Your Email"
                      id="floatinginput2"
                      onChange={handleChange}
                      required={true}
                      name="email"
                      defaultValue={router?.query?.email}
                    />
                    <label htmlFor="floatinginput2">Your Email</label>
                  </div>
                  
                  <div className="form-floating">
                    <Input
                      className="form-control"
                      type="password"
                      placeholder="Your Password"
                      id="floatinginput3"
                      onChange={handleChange}
                      required={true}
                      name="password"
                    />
                    <label htmlFor="floatinginput3">Your Password</label>
                  </div>
                  
                  {gContext?.validationError?.password &&
                    <div className="custom-alert" role="alert">
                        {gContext?.validationError?.password.map((item,key)=><><small key={key}>{item}</small><br></br></>)}
                    </div>
                  }
                  <div className="form-floating">
                    <Input
                      className="form-control mb-0"
                      type="password"
                      placeholder="Confirm Your Password"
                      id="floatinginput4"
                      onChange={handleChange}
                      required={true}
                      name="re_password"
                    />
                    <label htmlFor="floatinginput4">
                      Confirm Your Password
                    </label>
                  </div>
                  {errorData && 
                    <div className="custom-alert" role="alert">
                      <small>{errorData}</small>
                    </div>
                  }
                  {gContext?.validationError?.non_field_errors &&
                    <div className="custom-alert">
                        {gContext?.validationError?.non_field_errors.map((item,key)=><><small key={key}>{item}</small><br></br></>)}
                    </div>
                  }
                  <div className="form-check d-flex align-items-center mt-6 mb-3">
                    <input
                      className="form-check-input bg-white float-none mt-0 mb-0 me-3"
                      type="checkbox"
                      defaultValue
                      id="flexCheckDefault"
                      required
                    />
                    <SignUpForm.FormText>
                      I respect your privacy. Unsubscribe at any time.
                    </SignUpForm.FormText>
                  </div>
                  <SignUpForm.FormButton className="btn-purple-heart mt-2">
                    Sign Up
                  </SignUpForm.FormButton>                
                </form>
                <div className="buttons mt-4">
                    <SignUpForm.FormText>
                      Already Have an Account?
                      <Link 
                          className="btn-link text-electric-violet-2 ms-2"
                          to="/sign-in"
                        >
                        Sign In
                      </Link>
                    </SignUpForm.FormText>
                  </div>
              </SignUpForm.FromSection>
            </SignUpForm.Box>
          </Col>
        </Row>
      </Container>
    </SignUpForm>
  );
}
