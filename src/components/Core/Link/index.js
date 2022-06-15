import React from "react"

import  Link  from "next/link"

const LinkComponent = ({children,to,scroll, ...rest}) => {
  return <>
    <Link 
      href={to} 
      scroll={scroll || true}
    >
        <a {...rest}>
          {children}
        </a>
    </Link>
  </>
}

export default LinkComponent
