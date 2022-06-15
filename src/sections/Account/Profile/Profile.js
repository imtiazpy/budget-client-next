import React, {useState,useEffect, useContext} from "react";
import { Container, Row} from "react-bootstrap";
import useApiHelper from '../../../api';
import GlobalHeaderContext from '../../../context/GlobalHeaderContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import ProfileForm from "./style";
import Input from "../../../components/extra/Input";

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

    const handleCheckbox = (e) => {
      setFormData({...formData,[e.target.name]: e.target.checked})
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
                      placeholder="First Name"
                      id="floatinginput1"
                      onChange={handleChange}
                      name="first_name"
                      defaultValue={formData?.first_name}
                    />
                    <label htmlFor="floatinginput1">First Name</label>
                  </div>
                  <div className="form-floating col-12 col-lg-6">
                    <Input
                      className="form-control"
                      type="text"
                      placeholder="Last Name"
                      id="floatinginput2"
                      onChange={handleChange}
                      name="last_name"
                      defaultValue={formData?.last_name}
                    />
                    <label htmlFor="floatinginput2">Last Name</label>
                  </div>
                </Row>
                <Row>
                  <div className="form-floating col-12 col-lg-6">
                    <Input
                      className="form-control"
                      type="text"
                      placeholder="Email"
                      id="floatinginput3"
                      onChange={handleChange}
                      name="email"
                      defaultValue={formData?.email}
                    />
                    <label htmlFor="floatinginput3">Email</label>
                  </div>
                  <div className="form-floating col-12 col-lg-6">
                    <Input
                      className="form-control"
                      type="text"
                      placeholder="Screen Name"
                      id="floatinginput5"
                      onChange={handleProfileChange}
                      name="screen_name"
                      defaultValue={formData?.profile?.screen_name}
                    />
                    <label htmlFor="floatinginput5">What does your community call you?</label>
                  </div>
                </Row>
                <Row>
                  <div className="form-floating col-12 col-lg-6">
                    <Input
                      className="form-control"
                      type="text"
                      placeholder="Facebook"
                      id="floatinginput5"
                      onChange={handleProfileChange}
                      name="facebook_profile"
                      defaultValue={formData?.profile?.facebook_profile}
                    />
                    <label htmlFor="floatinginput5">Facebook Profile</label>
                  </div>
                  <div className="form-floating col-12 col-lg-6">
                    <Input
                      className="form-control"
                      type="text"
                      placeholder="Tiktok"
                      id="floatinginput6"
                      onChange={handleProfileChange}
                      name="tiktok_profile"
                      defaultValue={formData?.profile?.tiktok_profile}
                    />
                    <label htmlFor="floatinginput6">Tiktok Profile</label>
                  </div>
                </Row>
                <Row>
                  <div className="form-floating col-12 col-lg-6">
                    <Input
                      className="form-control"
                      type="text"
                      placeholder="Instagram"
                      id="floatinginput7"
                      onChange={handleProfileChange}
                      name="instagram_profile"
                      defaultValue={formData?.profile?.instagram_profile}
                    />
                    <label htmlFor="floatinginput7">Instagram Profile</label>
                  </div>
                  <div className="form-floating col-12 col-lg-6">
                    <Input
                      className="form-control"
                      type="text"
                      placeholder="Youtube"
                      id="floatinginput8"
                      onChange={handleProfileChange}
                      name="youtube_channel"
                      defaultValue={formData?.profile?.youtube_channel}
                    />
                    <label htmlFor="floatinginput8">Youtube Channel</label>
                  </div>
                </Row>
                <Row>
                  <div className="form-floating col-12 col-lg-6">
                    <Input
                      className="form-control"
                      type="text"
                      placeholder="Linkedin"
                      id="floatinginput9"
                      onChange={handleProfileChange}
                      name="linkedin_profile"
                      defaultValue={formData?.profile?.linkedin_profile}
                    />
                    <label htmlFor="floatinginput9">Linkedin Profile</label>
                  </div>
                  <div className="form-floating col-12 col-lg-6">
                    <Input
                      className="form-control"
                      type="text"
                      placeholder="website"
                      id="floatinginput10"
                      onChange={handleProfileChange}
                      name="website"
                      defaultValue={formData?.profile?.website}
                    />
                    <label htmlFor="floatinginput10">Website</label>
                  </div>
                </Row>
                <Row>
                  <div className="form-floating col-12 col-lg-6">
                    <Input
                      className="form-control"
                      type="text"
                      placeholder="Twitter"
                      id="floatinginput11"
                      onChange={handleProfileChange}
                      name="twitter"
                      defaultValue={formData?.profile?.twitter}
                    />
                    <label htmlFor="floatinginput9">Twitter Profile</label>
                  </div>
                  <div className="form-floating col-12 col-lg-6">
                    <Input
                      className="form-control"
                      type="text"
                      placeholder="website"
                      id="floatinginput12"
                      onChange={handleProfileChange}
                      name="twitch"
                      defaultValue={formData?.profile?.twitch}
                    />
                    <label htmlFor="floatinginput10">Twitch Profile</label>
                  </div>
                </Row>
                <Row>
                  <div className="form-check col-12 col-lg-6">
                    <Input
                      className="form-check-input"
                      type="checkbox" 
                      checked={formData?.keep_sponsorships_anonymous || false}
                      id="floatinginput13"
                      onChange={handleCheckbox}
                      name="keep_sponsorships_anonymous"
                    />
                    <label htmlFor="floatinginput13" className="form-check-label">Keep sponsorships Anonymous</label>
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
