import React, {useState, useEffect} from "react";
import styled from "styled-components";
import useApiHelper from '../api';
import Table from "~components/extra/Table";
import Pagination from "~components/extra/Pagination"
import { useRouter } from "next/router";


import { Container } from 'react-bootstrap';

const StyledTable = styled.div`
  background-color: #f3f4f6;
  padding-top: 40px;
  padding-bottom: 20px;
  border-top: 1px solid #dee2e6;
`;

const Leaderboard = () => {
  const [tableData, setTableData] = useState([]);

  const api = useApiHelper();
  const router = useRouter();  

  console.log(router.asPath);

  const getTableData = (value )=> {
    let params = {
      page: value
    };
    api.leaderboard(params).then(
      (res) =>{
        setTableData(res);
      },
      (err) => {
          //
      }
    );
  }

  useEffect(()=>{
    api.leaderboard().then(
      (res) =>{
        setTableData(res);
      },
      (err) => {
          //
      }
    );
  }, []);
  
  return (        
    <StyledTable>
        <Container>
            <h1 className="text-center pb-4" id="leaderboard">1 Million Sponsorships Challenge</h1>
            {tableData &&
            <>
                <Table tableData={tableData.results} />
                <Pagination 
                pageLinks={
                    tableData?.current_displayable_pagination?.page_links
                }
                previous={tableData?.previous_number}
                next={tableData?.next_number}
                totalPage={tableData?.page_count}
                current={tableData?.current_number}
                getTableData={getTableData}
                />
            </>
            }
        </Container>
    </StyledTable>
  )
}

export default Leaderboard;