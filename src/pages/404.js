import React from "react";
import { Error } from "~sections/utility";
import { PageWrapper } from "~components/Core";
import FooterOne from "~sections/marketing/FooterOne"

// const header = {
//   headerClasses: "site-header site-header--menu-start light-header",
//   containerFluid:false,
// }

export default function errorPage() {
  return (
    <PageWrapper innerPage={true}>
        <Error/>
        <FooterOne/>
    </PageWrapper>
  )
}

