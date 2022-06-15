import React, {useContext}  from 'react';
import GlobalHeaderContext from "../../../../context/GlobalHeaderContext";
import { useRouter } from 'next/router';
// import { Link } from '~components'
import styled from 'styled-components';
import { Box } from '~styled';

const HeaderButtonWrapper = styled(Box).attrs({className:"header-btn-block"})`
    .btn{
        min-width:125px;
        height: 42px;
        border-radius: 3px;
        color: var(--bs-white);
        font-size: 13px;
        font-weight: 500;
        line-height: 1.2;
        display:flex;
        align-items:center;
        justify-content:center;
        padding-left:15px;
        padding-right:15px;
        letter-spacing: -0.4px;
        color:#fff;
        margin-left:10px;
        background-color: #2A0A5E;;
        border-color: #2A0A5E;;
        box-shadow:-12px 20px 50px rgb(80 52 252 / 30%);
        border-radius:500px;
        &:hover{
            box-shadow:-12px 20px 50px rgb(80 52 252 / 0%);
            /* box-shadow: 0 0px 0px rgba(241, 139, 98, 0.3); */
        }
    }
`
const HeaderButton = ({btnText,as,...rest})=>{
    const gContext = useContext(GlobalHeaderContext);
    const router = useRouter();  
    
    const handleClick = (e) => {
        e.preventDefault();
        if (gContext.isLoggedIn){
            gContext.onLogout();
        } else {
            router.push('/sign-in')
        }

    }
    return(
        <HeaderButtonWrapper {...rest}>
            <Box className="btn" onClick={handleClick}>
                {gContext.isLoggedIn?"Logout":"Login"}
            </Box>
        </HeaderButtonWrapper>
    )
}

export default HeaderButton;