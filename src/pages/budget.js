import React, {useState, } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';

import { PageWrapper } from '~components/Core';
import HeaderButton from '~sections/marketing/Header/HeaderButton';

import { DoughnutChart, CustomDataTable } from '~components/common';

const StyledTable = styled.div`
  background-color: #f3f4f6;
  padding-top: 40px;
  padding-bottom: 20px;
  border-top: 5px solid #dee2e6;
`;


const budget = () => {

    const [budget, setBudget] = useState([])
    const [refresh, setRefresh] = useState(false)

    return (
        <PageWrapper innerPage={true}>
            <StyledTable>
            <Container>
                <h1 className="text-center pb-4" id="budget">Budget-2022</h1>
                <Row className="gy-5">
                    <Col md="12">
                    <DoughnutChart 
                        nameField={"expense"}
                        refresh={refresh}
                    />
                    </Col>
                    <Col md="12">
                    <CustomDataTable 
                        nameField="income" 
                        header="INCOME" 
                        refresh={refresh}
                        setRefresh={setRefresh}
                    />
                    </Col>
                    <Col md="12">
                    <CustomDataTable 
                        nameField="expense" 
                        header="EXPENSE"
                        refresh={refresh}
                        setRefresh={setRefresh}
                    />
                    </Col>
                </Row>            
            </Container>
            </StyledTable>
        </PageWrapper>
    );
};

export default budget;