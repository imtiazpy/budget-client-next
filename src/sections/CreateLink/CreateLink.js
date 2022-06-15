import React, {useState, useEffect, useContext} from "react";
import { Container, Row, Col } from "react-bootstrap";
import useApiHelper from '../../api';
import GlobalHeaderContext from '../../context/GlobalHeaderContext';

import CreateLinkForm from "./style";
import Input from "../../components/extra/Input";

export default function CreateLink() {
  const api = useApiHelper();
  const [platform, setPlatform] = useState([])
  const [formData, setFormData] = useState({})

  const gContext = useContext(GlobalHeaderContext)

  useEffect(() => {
      api.getPlatform().then((response) => {
          setPlatform(response.results)
      })
  }, [])


  const onSubmit = (e) => {
      e.preventDefault()
      api.postLink(formData).then((response) => {
          window.location.replace("/dashboard");
      }, (err) => {
          gContext.validationErrorCB(err)
      })
  }

  const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value})
  }
  return (
    <CreateLinkForm backgroundColor="#f3f4f6">
      <Container className="position-static">
        <div className="text-black fs-4">
          <p>
              This is where you add your sponsored posts. 
              Name your sponsorship, preferably the name of the Sponsor or Campaign Name, 
              and add the URL directly to the post so that we can verify it.
          </p>
        </div>
        <Row className="align-items-center justify-content-center position-static">
          <Col
            xs="12"
            // className="col-md-8 col-xs-10"
          >
            <CreateLinkForm.Box>
              {/* <CreateLinkForm.Title as="h2" className="text-center"> */}
  
              {/* </CreateLinkForm.Title> */}
              <CreateLinkForm.FromSection>
                <form action="./">
                  <div className="form-floating">
                    <Input
                      className="form-control"
                      placeholder="Leave a comment here"
                      id="floatinginput"
                      onChange={handleChange}
                      required={true}
                      name="name" 
                      type="text"
                    />
                    <label htmlFor="floatinginput">Enter Sponsorship Name</label>
                  </div>
                  <div className="form-floating">
                    <Input
                      className="form-control"
                      placeholder="Leave a comment here"
                      id="floatinginput2"
                      onChange={handleChange}
                      required={true}
                      name="url" 
                      type="url"
                    />
                    <label htmlFor="floatinginput2">Enter URL (https://...)
</label>
                  </div>
                  {gContext?.validationError?.non_field_errors &&
                    <div className="custom-alert">
                        {gContext?.validationError?.non_field_errors.map((item,key)=><><small key={key}>{item}</small><br></br></>)}
                    </div>
                  }
                  <div >
                    <CreateLinkForm.FormButton className="btn-primary mt-2" onClick={(e) => onSubmit(e)}>
                      Add Sponsorship
                    </CreateLinkForm.FormButton>
                  </div>
                </form>
              </CreateLinkForm.FromSection>
            </CreateLinkForm.Box>
          </Col>
        </Row>
      </Container>
    </CreateLinkForm>
  );
}
