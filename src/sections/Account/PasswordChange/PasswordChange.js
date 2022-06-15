import React, {useState, useContext} from "react";
import { Container, Row, Col } from "react-bootstrap";
import useApiHelper from '../../../api';
import GlobalHeaderContext from '../../../context/GlobalHeaderContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import PasswordChangeForm from "./style";
import Input from "../../../components/extra/Input";

export default function passwordChange() {
    const [password, setPassword] = useState({});

    const gContext = useContext(GlobalHeaderContext);
    const api = useApiHelper();
    const router = useRouter();
  
    const passwordChange = (e) => {
      e.preventDefault();
      api.passwordChange(password).then((response)=>{
          toast.success("Password Change Successful");
          gContext.setValidationError(null);
          router.push('/dashboard');
      }).catch((err)=>{
          gContext.validationErrorCB(err);
          toast.error("your Password Change Failed");
        });
    };
  
    const handleChange = (e) => {
      setPassword({ ...password, [e.target.name]: e.target.value });
    };
  return (
    <PasswordChangeForm backgroundColor="#f3f4f6">
      <Container className="position-static">
        <Row className="align-items-center justify-content-center position-static">
          <Col
            xs="12"
            className="col-md-8 col-xs-10"
          >
            <PasswordChangeForm.Box>
              <PasswordChangeForm.Title as="h2" className="text-center">
                Password Change
              </PasswordChangeForm.Title>
              <PasswordChangeForm.FromSection>
                <form action="./">
                  <div className="form-floating">
                    <Input
                      className="form-control"
                      type="password"
                      placeholder="Leave a comment here"
                      id="floatinginput"
                      onChange={handleChange}
                      required={true}
                      name="new_password1"
                    />
                    <label htmlFor="floatinginput">New Password</label>
                  </div>
                  <div className="form-floating">
                    <Input
                      className="form-control"
                      type="password"
                      placeholder="Leave a comment here"
                      id="floatinginput2"
                      onChange={handleChange}
                      required={true}
                      name="new_password2"
                    />
                    <label htmlFor="floatinginput2">Confirm New Password</label>
                  </div>
                  {gContext?.validationError?.non_field_errors &&
                    <div className="custom-alert">
                        {gContext?.validationError?.non_field_errors.map((item,key)=><><small key={key}>{item}</small><br></br></>)}
                    </div>
                  }
                  <div className="text-center">
                    <PasswordChangeForm.FormButton className="btn-primary mt-2" onClick={(e) => passwordChange(e)}>
                      Change Password
                    </PasswordChangeForm.FormButton>
                  </div>
                </form>
              </PasswordChangeForm.FromSection>
            </PasswordChangeForm.Box>
          </Col>
        </Row>
      </Container>
    </PasswordChangeForm>
  );
}
