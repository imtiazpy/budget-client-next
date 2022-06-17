import React from "react"
import Image from "next/image"
import { Navbar } from "react-bootstrap"
import Link from "../Link";
import Menu from "./Menu"
const SiteNavbar = ({buttonBlock,darkLogo,customLogo,defaultLogo}) => {

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="site-navbar"
      >
        <Navbar.Brand>
          <Link
            to="/"
            role="button"
          >
            {defaultLogo ? (<img src={defaultLogo} alt="site-brand" style= {{'width':'100px'}}/>) : customLogo ? (
            <img src={customLogo} alt="site-brand" style= {{'width':'100px'}}/>
            ) : (
            <img src={darkLogo? "./image/logo/logo-black.png" : "/image/logo/logo-white.png"} alt="site-brand" style= {{'width':'100px'}}/>
            )}
          </Link>

          
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="hamburgur"
        />
        <Menu/>
        {buttonBlock}
      </Navbar>
    </>
  )
}

export default SiteNavbar
