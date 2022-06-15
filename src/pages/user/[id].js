import React, {useState, useEffect} from "react";
import { Col,Container, Row } from "react-bootstrap";
import { PageWrapper } from "~components/Core";
import useApiHelper from '../../api';

import LinkTable from "../../components/extra/linkTable";

import tiktokIcon from '~image/brand-logo/tiktok-brands.png';


const UserProfile = (props) => {
    const [userProfile, setUserProfile] = useState({});

    const api = useApiHelper();

    useEffect(() => {
        api.getUserProfileDetails(props?.id).then((response) => {
          setUserProfile(response);
        }).catch((error) => {
          //
        })
      },[]);

    return (
        <PageWrapper innerPage={true}>
            <Container>
                <Row>
                    <div className="mt-5">
                        {userProfile?.avatar ? (
                            <div className = "profile-img text-center">
                                <img src={userProfile?.avatar} alt="blank" width="120" height="120" className="rounded-circle"/>
                            </div>
                            
                        ) 
                        :
                            <div className = "profile-img text-center">
                                <img src="../images/one.png" alt="blank" width="120" height="120" className="rounded-circle border border-1 border-primary"/>
                            </div>
                        }
                        <div className="text-center mt-3"> 
                            {userProfile.first_name && 
                                <h2 >{userProfile.first_name + " " + userProfile.last_name}</h2>
                            }

                            {userProfile?.profile?.screen_name &&
                                <>
                                    <h5>{"Screen Name : " + userProfile?.profile?.screen_name}</h5>
                                    <a href={`mailto:${userProfile.email}`} className="fs-3">Send Email</a>
                                </>
                            }
                            <br /> 
                            <div className ="my-3"> 
                                {userProfile?.profile?.facebook_profile &&
                                    <a href={userProfile.profile.facebook_profile}  className="me-2 s-facebook" >
                                        <i className="fab fa-facebook-f fs-2"></i>
                                    </a>
                                }
                                {userProfile?.profile?.twitter &&
                                    <a href={userProfile?.profile?.twitter_profile}  className="me-2 s-twitter" >
                                        <i className="fab fa-twitter fs-2"></i>
                                    </a>
                                }
                                {userProfile?.profile?.instagram_profile &&
                                    <a href={userProfile.profile.instagram_profile} className="me-2 s-instagram" >
                                        <i className="fab fa-instagram fs-2"></i>
                                    </a>
                                }
                                {userProfile?.profile?.youtube_channel &&
                                    <a href={userProfile.profile.youtube_channel} className="me-2" >
                                        <i className="fab fa-youtube fs-2"></i>
                                    </a>
                                }
                                {/* {userProfile?.profile?.linkedin_profile &&
                                    <a href={userProfile.profile.linkedin_profile} className="me-2" >
                                        <i className="fab fa-linkedin fs-2" ></i>
                                    </a>
                                } */}
                                {/* {userProfile?.profile?.tiktok_profile &&
                                    <a href={userProfile.profile.tiktok_profile} className="me-2" >
                                        <img style={{width:'30px',height:'30px', borderRadius:'5px'}} className="fa-tiktok " src={tiktokIcon.src} />
                                    </a>
                                } */}
                                {userProfile?.profile?.twitch &&
                                    <a href={userProfile?.profile?.twitch} className="s-twitch">
                                        {/* <i className="fas fa-globe fs-2"></i> */}
                                        <i className="fab fa-twitch fs-2"></i>
                                    </a>
                                }

                            </div>
                        </div>
                     </div>
                </Row>
                <Row>
                    {userProfile?.social_link_posts &&
                        <LinkTable tableData={userProfile?.social_link_posts} />
                    }
                </Row>
            </Container>
        </PageWrapper>
    );
}

export default UserProfile;

export async function getServerSideProps(context) {

    return {
      props: { id: context.params.id }
    }
  }