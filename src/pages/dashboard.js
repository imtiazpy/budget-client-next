import React, {useState, useEffect} from "react";

// import FooterSection from "~sections/utility/Footer";
import styled from "styled-components";
import useApiHelper from '../api';
import Pagination from "../components/extra/Pagination"
import Button from '../components/extra/button'
import Link from "../components/Core/Link";
import { Container } from 'react-bootstrap';

const StyledTable = styled.div`
  background-color: #f3f4f6;
  padding-top: 40px;
  padding-bottom: 20px;
  border-top: 1px solid #dee2e6;
`;



import DashboardWrapper from "~components/dashboard";


const Dashboard = () => {
    const [tableData, setTableData] = useState([]);
    const api = useApiHelper();

    const getTableData = (value )=> {
        let params = {
        page: value ? value : 1
        };
        api.getLinks(params).then(
        (res) =>{
            setTableData(res);
        },
        (err) => {
            //
        }
        );
    }

    useEffect(()=>{
        api.getLinks().then(
        (res) =>{
            setTableData(res);
        },
        (err) => {
            //
        }
        );
    }, []);

  


    return (
       <>
         <DashboardWrapper count={tableData?.count}>
            <StyledTable className="p-0 mt-3">
                <Container className="p-0">
                
                </Container>
            </StyledTable>

        </DashboardWrapper>

       </>
        
    )
}

export default Dashboard;








