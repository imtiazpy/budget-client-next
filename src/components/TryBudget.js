import React, {useState, useEffect, useMemo} from "react";
import styled from "styled-components";
import useApiHelper from '../api';
import { useRouter } from "next/router";

import { Container, Row, Col } from 'react-bootstrap';
import { CustomDataTable } from "./common";

const StyledTable = styled.div`
  background-color: #f3f4f6;
  padding-top: 40px;
  padding-bottom: 20px;
  border-top: 5px solid #dee2e6;
`;

const TryBudget = () => {
  const api = useApiHelper();
  const router = useRouter();
 
  return (        
    <StyledTable>
        <Container>
            <h1 className="text-center pb-4" id="budget">Try this free playground</h1>
            <Row className="gy-5">
                <Col md="12">
                  <CustomDataTable 
                    nameField="income" 
                    header="INCOME" 
                  />
                </Col>
                <Col md="12">
                  <CustomDataTable 
                    nameField="expense" 
                    header="EXPENSE"
                  />
                </Col>
            </Row>            
        </Container>
    </StyledTable>
  )
}

export default TryBudget;