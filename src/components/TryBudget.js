import React, {useState, useEffect, useMemo} from "react";
import styled from "styled-components";
import useApiHelper from '../api';
import { useRouter } from "next/router";
import { toast } from "react-toastify";

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

  const [formData, setFormData] = useState([]);
  const [temp, setTemp] = useState([])

  // const pinnedBottomRowData = useMemo(() => {
  //   // TODO: Need to work on this method later to show total of rows
  //   return [
  //     {income: "Total", weekly: 3000, bi_weekly: 6000, monthly: 12000, yearly: 144000},
  //   ]
  // }, []);

  const fetchData = () => {
    const data = JSON.parse(localStorage.getItem('incomeData'))
    return data ? data : []
  }
  
  const handleFormSubmit = (data) => {
    // TODO: Fix duplicate id issue and beautify the method
    const stored = fetchData()
    const oldIds = []
    for (const d of stored) {
      oldIds.push(d.id)
    }

    let newId = Math.floor(Math.random()* 5) + 1;

    if (oldIds.length !== 5 && oldIds.includes(newId)) {
      newId = Math.floor(Math.random()* 5) + 1;
      data['id'] = newId
      stored.push(data)
      localStorage.setItem('incomeData', JSON.stringify(stored))
      setTemp([...temp, {data}])
    } else if (oldIds.length === 5) {
      toast.error("You can't add more than 5 rows in trial!", {theme: "colored"})
    } else if (oldIds.includes(newId)) {
      newId = Math.floor(Math.random()* 5) + 1;
      data['id'] = newId
      stored.push(data)
      localStorage.setItem('incomeData', JSON.stringify(stored))
      setTemp([...temp, {data}])
    } else {
      data['id'] = newId
      stored.push(data)
      localStorage.setItem('incomeData', JSON.stringify(stored))
      setTemp([...temp, {data}])
    }    
  }

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure, You want to delete the row?")
    if (confirm) {
      const stored = fetchData()
      const newData = stored.filter((row) => row.id !== id)
      localStorage.setItem('incomeData', JSON.stringify(newData))
      setFormData(newData)
    } 
  }

  const updateRow = (data) => {
    const stored = fetchData();
    for (const singleData of stored) {
      if (singleData.id === data.id) {
        singleData.income = data.income
        singleData.monthly = data.monthly
      }
    }

    localStorage.setItem('incomeData', JSON.stringify(stored))

    setTemp([data])
  }

  useEffect(() => {
    const data = fetchData()
    setFormData(data)

  }, [temp])

  return (        
    <StyledTable>
        <Container>
            <h1 className="text-center pb-4" id="budget">Try this free playground</h1>
            <Row className="gy-5">
                <Col md="12">
                  <CustomDataTable 
                    rowData={formData} 
                    handleFormSubmit={handleFormSubmit}
                    handleDelete={handleDelete}
                    updateRow={updateRow}
                    nameField="income" 
                    header="INCOME" 
                  />
                </Col>
                {/* <Col md="12">
                  <CustomDataTable 
                    rowData={expenseData} 
                    nameField="expense" 
                    header="EXPENSE"
                  />
                </Col> */}
            </Row>            
        </Container>
    </StyledTable>
  )
}

export default TryBudget;