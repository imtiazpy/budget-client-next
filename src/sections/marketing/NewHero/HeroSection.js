import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "~components";
import { Button } from "~styled";
import Hero from "./style";

export default function HeroSection() {
  return (
      <Hero className="position-relative bg-default">
        <Container>
          <Row>
            <Col
              className="col-lg-6 col-md-10 col-xs-11 order-2 order-lg-1"
              xs="12"
            >
              <Hero.Content>
                <Hero.Title>
                  Finance Budget Management.
                </Hero.Title>
                <Hero.Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </Hero.Text>
                <Row>
                  <Col xs="12" className="col-xxl-12">
                    <Hero.Newsletter>
                      <form action="/sign-up">
                        <input type={"email"} name={"email"} placeholder="Enter your email" className="form-control"/>
                        <Button className="btn-purple-heart"textTransform="capitalized">Sign Up</Button>
                      </form>
                    </Hero.Newsletter>
                  </Col>
                </Row>
              </Hero.Content>
            </Col>

            <Col xs={12} className="col-lg-6 col-md-10 order-1 order-lg-2 ">
              <Row className="embed-responsive">
                <iframe
                  src="https://www.youtube.com/embed/i_c7zNRYPuU"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="video"
                  height= '360px'
                  className="embed-responsive-item"
                />
              </Row>
            </Col>

            
          </Row>
        </Container>
      </Hero>
  )
}
