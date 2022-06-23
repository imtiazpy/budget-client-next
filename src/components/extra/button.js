import React from 'react'
// import { Link } from '~components'
import styled from 'styled-components'
import { Box } from '~styled'

const ButtonWrapper = styled(Box)`
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
        background-color: #2A0A5E;;
        border-color: #2A0A5E;;
        border-radius:500px;
        &:hover{
            box-shadow:-12px 20px 50px rgb(80 52 252 / 0%);
            /* box-shadow: 0 0px 0px rgba(241, 139, 98, 0.3); */
        }
    }
`
const Button = ({btnLink,btnText,icon,type,as,...rest})=>{
    return(
        <ButtonWrapper {...rest}>
            <Box type={type} as={as} className="btn" to={btnLink ? btnLink : "/"}>
                {btnText}&nbsp;&nbsp;{icon}
            </Box>
        </ButtonWrapper>
    )
}

export default Button;