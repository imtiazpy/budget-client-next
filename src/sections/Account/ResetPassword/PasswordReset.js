import React, {useState, useContext} from "react";
import { Container, Row, Col } from "react-bootstrap";

import ResetForm from "./style";
import ResetBgImg from "~image/accounts/reset-pass-img.jpg";
import { Link } from "~components";
import { toast } from "react-toastify";

import GlobalContext from '../../../context/GlobalHeaderContext'
import useApiHelper from '../../../api';
import { useRouter } from "next/router";
import Input from "../../../components/extra/Input";


export default function ResetSection() {
    const [formData, setFormData] = useState({});

    const router = useRouter()
    const gContext = useContext(GlobalContext);
    const api = useApiHelper();

    const onPasswordReset = (e) => {
        e.preventDefault();
        var payload = {
            ...formData,
            uid: router.query.uid,
            token: router.query.token
        };
        api.passwordResetConfirm(payload).then((response)=> {
            toast.success("Password has been changed")
            router.push('/sign-in')
        }).catch(err =>{
            // gContext.validationErrorCB(err);
            gContext.setValidationError(err.response.data)
            toast.error("Password changing failed")
        });
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    };


  return (
    <ResetForm backgroundColor="#f3f4f6">
      <Container className="position-static">
        <Row className="align-items-center justify-content-center position-static">
          <Col xs="12" className="col-xl-6 col-lg-6 position-static">
            <ResetForm.Image backgroundImage={ResetBgImg.src}></ResetForm.Image>
            c
          </Col>
          <Col xs="12" className="col-xxl-6 col-xl-6 col-lg-6 col-md-9">
            <ResetForm.Box plXXL="60px">
              <ResetForm.Title as="h2">Reset Password</ResetForm.Title>
              <ResetForm.FromSection>
                <form onSubmit={onPasswordReset}>
                  <div className="form-floating">
                    <Input
                      className="form-control"
                      type="password"
                      placeholder="Your Email"
                      id="floatinginput2"
                      name="new_password"
                      onChange={handleChange}
                    />
                    <label htmlFor="floatinginput2">New Password</label>
                  </div>
                  <div className="form-floating">
                    <Input
                      className="form-control"
                      type="password"
                      placeholder="Your Email"
                      id="floatinginput2"
                      name="re_new_password"
                      onChange={handleChange}
                    />
                    <label htmlFor="floatinginput2">Confirm New Password</label>
                  </div>

                  <ResetForm.FormButton type="submit" className="mt-2 mb-5 btn-purple-heart">
                    Reset Password
                  </ResetForm.FormButton>
                  <ResetForm.FormText>
                    Remember the password?
                    <Link
                      className="btn-link text-electric-violet-2 mtc-2"
                      to="/sign-in"
                    >
                      Sign In now
                    </Link>
                  </ResetForm.FormText>
                </form>
              </ResetForm.FromSection>
            </ResetForm.Box>
          </Col>
        </Row>
      </Container>
    </ResetForm>
  );
}
