import React, {useState, useContext} from "react";
import { Container, Row, Col } from "react-bootstrap";

import ResetForm from "./style";
import ResetBgImg from "~image/accounts/reset-pass-img.jpg";
import { Link } from "~components";
import Input from "../../../components/extra/Input"
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import GlobalContext from '../../../context/GlobalHeaderContext'
import useApiHelper from '../../../api';


export default function ResetSection() {
  const [formData, setFormData] = useState({});
  const [successText, setSuccessText] = useState("")

  const gContext = useContext(GlobalContext);
  const api = useApiHelper();
  const router = useRouter()

  const handleClose = () => {
    gContext.togglePasswordModal();
  };


  const onPasswordResetRequest = (e) => {
    e.preventDefault();
    api.passwordResetRequest(formData).then((response)=> {
      toast.success("Mail sent")
      gContext.setValidationError(null)
      router.push('/')
    }).catch((error) => {
      gContext.setValidationError(error.response.data)
    });
  }

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
              <ResetForm.Text as="p">
                Enter your email to get reset link.
              </ResetForm.Text>
              <ResetForm.FromSection>
                <form onSubmit={onPasswordResetRequest}>
                  <div className="form-floating">
                    <Input
                      className="form-control"
                      type="email"
                      placeholder="Your Email"
                      id="floatinginput2"
                      name="email"
                      onChange={handleChange}
                    />
                    <label htmlFor="floatinginput2">Your Email</label>
                  </div>
                  <ResetForm.FormButton type="submit" className="mt-2 mb-5 btn-purple-heart">
                    Send Reset Link
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
