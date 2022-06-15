import React from "react"
import { PageWrapper } from "~components/Core"
import FooterOne from "~sections/marketing/FooterOne"
import HeaderButton from "~sections/marketing/Header"
import NewHero from '~sections/marketing/NewHero'
import Leaderboard from '~components/leaderboard';
import TryBudget from "~components/TryBudget"

const header = {
  headerClasses: "site-header site-header--menu-start light-header site-header--sticky",
  containerFluid:true,
  // customLogo: Images.HeaderLogo,
  buttonBlock: (
    <HeaderButton
      className="ms-auto d-none d-xs-inline-flex"
      btnTwoText="Get started"
      mr="15px"
      mrLG="0"
    />
  ),
}

export default function Marketing() {

  return (
      <PageWrapper headerConfig={header}>
        <NewHero />
        <TryBudget />
        {/* <Leaderboard /> */}
        {/* <HeroSection/> */}
        {/* <ServiceSection/> */}
        {/* <FeatureSection/> */}
        {/* <ContentSectionOne/> */}
        {/* <ContentSectionTwo/> */}
        {/* <TestimonialSection/> */}
        {/* <CounterSection/> */}
        {/* <CtaSection/> */}
        <FooterOne/>
      </PageWrapper>
  )
}
