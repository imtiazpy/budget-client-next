import React, {useEffect, useState} from "react";
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';

import useApiHelper from '../../api';
import { PageWrapper } from "~components/Core";


const Verify = () => {
    const router = useRouter()
    const { token } = router.query
    const [status, setStatus] = useState();

    const api = useApiHelper();

    useEffect(() => {
        var payload = {
            'key': token,
        };
      
        api.confirmEmail(payload).then((response) => {
            setStatus({type: 'success'})
            toast.success("Your email successfully verified, Now you can Sign In");
            router.push('/sign-in')
        }, (err) => {
            setStatus({type: 'error'})
        })
        
    }, [token])

  return (
    <PageWrapper innerPage={true}>
        <div className="my-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="">
                        <div
                            className="text-center"
                            data-aos="zoom-in"
                            data-aos-duration="1000"
                        >
                            {status?.type === 'error' &&
                                // <p className="alert alert-success">Your email successfully verified</p>
                                
                                <p className="alert alert-danger">We couldn't verify your request</p>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </PageWrapper>
  );
};
export default Verify;
