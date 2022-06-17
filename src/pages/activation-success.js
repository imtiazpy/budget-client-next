import React, {useEffect, useState} from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';

const ActivationSuccess = () => {
    const [seconds, setSeconds] = useState(5)

    const router = useRouter()

    useEffect(()=>{
        if (!seconds) {
            return router.push('sign-in')
        }
        const timer = setTimeout(() => {
            setSeconds(seconds - 1)
        }, 1000);
        return () => clearTimeout(timer)
    }, [seconds])

    return (
        <>
            <Container>
                <div className="text-center alert alert-secondary py-5 mt-7" role="alert">
                    Account has been activated. Redirecting to Sign In page in {seconds} seconds.
                </div>
            </Container>  
        </>
    );
};

export default ActivationSuccess;