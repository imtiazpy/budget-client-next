import React, {useState,useEffect, useContext} from "react";
import { Container, Row} from "react-bootstrap";
import useApiHelper from '../../../api';
import GlobalHeaderContext from '../../../context/GlobalHeaderContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import enumHelper, { getEnumLabel, getEnumItem } from "src/enum";

import ProfileForm from "./style";
import Input from "../../../components/extra/Input";
import { Select } from "../../../components/Core";

export default function Profile() {
    const [formData, setFormData] = useState({});

    const gContext = useContext(GlobalHeaderContext);
    const api = useApiHelper();
    const router = useRouter();

    useEffect(() => {
      api.getUserProfile().then((response) => {
        setFormData(response);
      }).catch((error) => {
        //
      })
    },[]);
  
    const updateProfile = (e) => {
      e.preventDefault();
      api.updateUserProfile(formData).then((response)=>{
          toast.success("Profile Update Successful");
          gContext.setValidationError(null);
          router.replace(router.asPath);
      }).catch((err)=>{
          gContext.setValidationError(err.response.data.profile)
          toast.error("Profile Update Failed");
        });
    };

    const handleChange = e => {
      setFormData({...formData, [e.target.name]: e.target.value});
    };
  
    const handleProfileChange = (e) => {
      setFormData({ ...formData, profile: {...formData?.profile, [e.target.name]: e.target.value }});
    };

  return (
    <ProfileForm backgroundColor="#f3f4f6">
      <Container className="position-static">
        <Row className="align-items-center justify-content-center position-static">
          <ProfileForm.Box>
            <ProfileForm.Title as="h2" className="text-center">
              Profile
            </ProfileForm.Title>
            <ProfileForm.FromSection>
              <form>
                <Row>
                  <div className="form-floating col-12 col-lg-6">
                    <Input
                      className="form-control"
                      type="text"
                      placeholder="Name"
                      id="floatinginput1"
                      onChange={handleChange}
                      name="name"
                      defaultValue={formData?.name}
                    />
                    <label htmlFor="floatinginput1">Name</label>
                  </div>
                  <div className="form-floating col-12 col-lg-6">
                    <Select
                      options={enumHelper.gender}
                      value={getEnumItem(enumHelper.gender, formData?.profile?.gender)}
                      onChange={(e) => {
                        setFormData({...formData, profile: {...formData.profile, 'gender': e.value}})
                      }}
                    />
                  </div>
                </Row>
                <Row>
                  <div className="form-floating col-12 col-lg-6">
                    <Input
                      className="form-control"
                      // type="text"
                      placeholder="City"
                      id="floatinginput5"
                      onChange={handleProfileChange}
                      name="city"
                      defaultValue={formData?.profile?.city}
                    />
                    <label htmlFor="floatinginput5">Your City</label>
                  </div>
                  <div className="form-floating col-12 col-lg-6">
                    <Input
                      className="form-control"
                      type="text"
                      placeholder="Country"
                      id="floatinginput5"
                      onChange={handleProfileChange}
                      name="country"
                      defaultValue={formData?.profile?.country}
                    />
                    <label htmlFor="floatinginput5">Your Country</label>
                  </div>
                </Row>
                {gContext?.validationError?.non_field_errors &&
                  <div className="custom-alert">
                      {gContext?.validationError?.non_field_errors.map((item,key)=><><small key={key}>{item}</small><br></br></>)}
                  </div>
                }
                <div className="text-center">
                  <ProfileForm.FormButton className="btn-primary mt-2" onClick={(e) => updateProfile(e)}>
                    Update Profile
                  </ProfileForm.FormButton>
                </div>
              </form>
            </ProfileForm.FromSection>
          </ProfileForm.Box>
        </Row>
      </Container>
    </ProfileForm>
  );
}
