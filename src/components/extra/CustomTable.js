import { Container, Row, Col } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

// import { Box } from "~styled";

const Table = ()=>{
    const Table = styled.div`
        background-color: #f3f4f6;
        padding-top: 40px;
        padding-bottom: 20px;
        border-top: 1px solid #dee2e6;

        .item{
            background-color:white;
        }
        .item:hover{
            background-color:#FFFFF7;
        }
    `;

    return (
        <Table>
                <Container>
                    <h1 className="">Leaderboard</h1>
                    <Row className="py-2">
                        <Col className="fw-bold ">User Name</Col>
                        <Col className="fw-bold ">First Name</Col>
                        <Col className="fw-bold ">Last Name</Col>
                        <Col className="fw-bold ">Total Ads Post</Col>
                        {/* <Col className="fw-bold ">Days Active</Col>
                        <Col className="fw-bold ">Success Rate</Col>
                        <Col className="fw-bold ">Growth %</Col>
                        <Col className="fw-bold ">Target End Date</Col> */}
                    </Row>
                    {tableData && tableData.map((item)=>
                    <Row key = {item.id} className="py-2 mb-3 item">
                        <Col className="">{item?.username}</Col>
                        <Col className="">{item?.first_name}</Col>
                        <Col className="">{item?.last_name}</Col>
                        <Col className="">{item?.total_ads_post}</Col>
                        {/* <Col className="">Days Active</Col>
                        <Col className="">Success Rate</Col>
                        <Col className="">Growth %</Col>
                        <Col className="">Target End Date</Col> */}
                    </Row>
                    )}
                </Container>
            </Table>
    );
}
export default Table