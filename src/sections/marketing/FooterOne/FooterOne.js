import React from 'react'
import { Container } from 'react-bootstrap'
import Footer from "./style"
export default function FooterOne(){
return(
    <Footer backgroundColor="#6a26da">
    <Container>
        <Footer.Copyright>
        <Footer.CopyrightText>© Creator Wizard 2022.</Footer.CopyrightText>
        <Footer.SocialShare>
            <Footer.SocialShareItem>
                <a target="_blank" href="https://www.facebook.com/groups/branddealintel">
                <i className="fab fa-facebook-square" />
                </a>
            </Footer.SocialShareItem>
            <Footer.SocialShareItem>
                <a target="_blank" href="https://twitter.com/justinmooretfam">
                <i className="fab fa-twitter" />
                </a>
            </Footer.SocialShareItem>
            <Footer.SocialShareItem>
                <a target="_blank" href="https://www.instagram.com/creatorwizard/">
                <i className="fab fa-instagram" />
                </a>
            </Footer.SocialShareItem>
            <Footer.SocialShareItem>
                <a target="_blank" href="https://www.youtube.com/c/creatorwizard">
                <i className="fab fa-youtube" />
                </a>
            </Footer.SocialShareItem>
        </Footer.SocialShare>
        </Footer.Copyright>
    </Container>
    </Footer>
)
}