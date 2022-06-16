import React, {useState, useEffect, useContext} from "react";
import { PageWrapper } from "~components/Core";
import FooterOne from "~sections/marketing/FooterOne"

import Link from "../components/Core/Link";
import useApiHelper from "src/api";
// import { useRouter } from "next/router";
// import GlobalHeaderContext from "src/context/GlobalHeaderContext";
import { toast } from "react-toastify";

const DashboardWrapper = ({children, count}) => {
    const [userProfile, setUserProfile] = useState({});

    const api = useApiHelper()


    // const gContext = useContext(GlobalHeaderContext);
    // const router = useRouter();  
    
    // const handleLogout = (e) => {
    //     e.preventDefault();
    //     if (gContext.isLoggedIn){
    //         gContext.onLogout();
    //         toast.success("You are logged out.")
    //     } else {
    //         router.push('/sign-in')
    //     }
    // }

    const onChangePicture = (e) => {
        if (e.target.files[0]) {
          let form_data = new FormData();
          form_data.append("avatar", e.target.files[0], e.target.files[0].name);
          api.uploadAvatar(form_data).then(
            (response) => {
                setUserProfile({ ...userProfile, avatar: response.avatar });
                toast.success("Successfully Uploaded Profile picture");
            },
            (err) => {
              //
            }
          );
        }
    };

    useEffect(() => {
      api.getUserProfile().then((response) => {
        setUserProfile(response)
      }, (err) => {
          //
      })
    }, []);

    return (
       <>
        <PageWrapper innerPage={true}>
            <hr></hr>
            <div className="container">

            {/* <i className="fa-solid fa-pen-circle"></i> */}

                {/* first-section-start */}
                <div className="row">
                    <div className="col-12 col-md-4 col-lg-3 text-center">
                    
                        <label htmlFor="fileUpload" className="my-3">
                            {userProfile?.avatar ? (
                                <div className = "profile-img">
                                    <img src={userProfile?.avatar} alt="blank" width="100" height="100" className="rounded-circle"/>
                                    <i className="fas fa-pen"></i>
                                </div>
                                
                            ) 
                            :
                                <div className = "profile-img">
                                    <img src="images/one.png" alt="blank" width="100" height="100" className="p-1 rounded-circle border border-1 border-primary"/>
                                    <i className="fas fa-pen"></i>
                                </div>
                            }
                        </label>
                        <input
                          type="file"
                          id="fileUpload"
                          className="sr-only"
                          onChange={onChangePicture}
                        />
                    
                    </div>

                    <div className="col-12 col-md-8 col-lg-9 text-center">
                        <h1>Hey {userProfile.name}</h1>
                        <h4>Welcome to Shine's Financial Management App</h4>
                    </div>
                </div>
                {/* first-section-end */}
            
                {/* second-section-start */}
                <div className="mt-3">
                    <div className="row">
                        <div className="col-12 col-md-4 col-lg-3">
                            <div className="rounded-3 p-2 my-3 bg-helios">

                                <div className="bg-helios-light w-100 rounded-3 d-flex align-items-center justify-content-start my-3 px-3">
                                    <Link className="fs-0 mt-1" to="/add-sponsorship" >
                                        <i className="fas fa-plus me-1"></i>
                                        <span>Add a Sponsorship</span>
                                    </Link>
                                </div>

                                <div className="bg-helios-light w-100 rounded-3 d-flex align-items-center justify-content-start my-3 px-3">
                                    <Link className="fs-0 mt-1" to="/dashboard" >
                                        <i className="fas fa-share me-1"></i>
                                        <span>Sponsored Posts</span>
                                    </Link>
                                </div>

                                <div className="bg-helios-light w-100 rounded-3 d-flex  align-items-center justify-content-start my-3 px-3">
                                    <Link className="fs-0 mt-1" to="/dashboard-profile">
                                        <i className="fas fa-user me-1"></i>
                                        <span>Edit Profile</span>
                                    </Link>
                                </div>

                                {/* <div className="bg-helios-light w-100 rounded-3 d-flex  align-items-center justify-content-start my-3 px-3">
                                    <Link className="fs-0 mt-1" to="/password-change">
                                        <i className="fas fa-key me-1"></i>
                                        <span>Password Change</span>
                                    </Link>
                                </div> */}
                                {/* <div className="bg-helios-light w-100 rounded-3 d-flex  align-items-center justify-content-start my-3 px-3" onClick={handleLogout}>
                                    <Link className="fs-0 mt-1" to="/">
                                        <i className="fas fa-sign-out-alt me-1"></i>
                                        <span>Logout</span>
                                    </Link>
                                </div> */}
                            </div>      
                        </div>

                        <div className="col-12 col-md-8 col-lg-9 text-white">
                            <div className="row mx-2 my-3">
                                <div className="col-12 col-lg-6 rounded-3 bg-egg-blue my-1 py-2 border-end">
                                    <div className="">
                                        <div className="text-center fs-3">
                                            <span>Budget</span>
                                            <i className="fas fa-medal ms-2 "></i>
                                        </div>
                                        <div className="text-center">
                                            <h2 className="text-white"># {userProfile?.rank? userProfile.rank: 0 }</h2>
                                            <p>+3 Since Last Week</p>
                                        </div>
                                    </div>    
                                </div>
                                <div className="col-12 col-lg-6 rounded-3 bg-victoria py-2 my-1 border-start" >
                                    <div className="">
                                        <div className="fs-3 text-center">
                                            <span>Pie Chart</span>
                                            <i className="fas fa-desktop ms-2 text-primary"></i>
                                        </div>
                                        <div className="text-center">
                                            <h2 className="text-white">{count?count:0}</h2>
                                            <p>+2 Since Last Week</p>
                                        </div>
                                    </div>
                                </div>
                            
                                {/* <div className="col-11 col-md-3 h-100 me-2 rounded-3 bg-blue">
                                    <div className="d-flex flex-md-row w-100 h-25 align-items-center justify-content-center mt-1 py-3">
                                        <div className="me-2 fs-1 text-secondary"><i className="fas fa-clipboard-check"></i></div>
                                        <div className="d-flex flex-column align-items-center">
                                            <h5 className="text-white">4</h5>
                                            <p>Total Win</p>
                                        </div>

                                    </div>
                                </div> */}
                            </div>
                            
                            <div className="mx-2">
                                {children}
                            </div>
                        </div>                                     
                    </div>
                </div>
            {/* second-section-end */}
            </div>

    
        <FooterOne/>

        </PageWrapper>
       
       
       
       </>
        
    )
}

export default DashboardWrapper;