import React, {useContext} from "react";
import GlobalHeaderContext, { headerDefault } from "../../../context/GlobalHeaderContext";
import Link from "../Link";
import HeaderButton from "../Header/InnerPageHeader"
import Header from "../Header";
 const PageWrapper= ({ children, headerConfig = null, innerPage = false, innerPageFooter = false  })=> {
   const gContext = useContext(GlobalHeaderContext);  
    const innerPageDefault = {
        headerClasses:"light-header site-header--menu-end site-header--button-sep position-relative",
        containerFluid:false,
        darkLogo:true,
        buttonBlock:(<HeaderButton />)
    }
    const activeHeader = ( innerPage ? innerPageDefault : headerDefault );  
  const sitectx = React.useContext(GlobalHeaderContext);
  
  React.useEffect(() => {
      sitectx.changeHeader({ ...activeHeader, ...headerConfig });
  },[headerConfig]);
  return (
    <>
     {/* <Header/> */}
      {children}
    </>
  )
}

export default PageWrapper;