import React, {useEffect, useState, useRef, useMemo, useCallback} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { BsFillPlusCircleFill, BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs'
import { toast } from "react-toastify";

import Button from '~components/extra/button';
import { ConfirmAlert, NewRow, CsvContent } from '~components/Modals';

import { calculateTotal, fetchData, saveData } from 'src/utils';

// for styling the table
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const CustomDataTable = (props) => {
  const {nameField, header, refresh, setRefresh} = props
  const gridRef = useRef();
  const [csv, setCsv] = useState("")
  const [showCsv, setShowCsv] = useState(false)

  const [formData, setFormData] = useState([])
  const [singleData, setSingleData] = useState({})
  const [temp, setTemp] = useState(false)
  const [id, setId] = useState(null)

  const [modalShow, setModalShow] = useState(false)
  const [confirmShow, setConfirmShow] = useState(false)

  const [columnDefs, setColumnDefs] = useState([
    { 
      headerName: `${header}`, 
      field: `${nameField}`, 
    },
    { headerName: 'WEEKLY', field: 'weekly', maxWidth: 180 },
    { headerName: 'BI-WEEKLY', field: 'bi_weekly', maxWidth: 180 },
    { headerName: 'MONTHLY', field: 'monthly', maxWidth: 180 },
    { headerName: 'YEARLY', field: 'yearly', maxWidth: 180 },
    { 
      headerName: 'ACTION', 
      field: 'btn', 
      cellRenderer: (params) => {
      return (
        <div>
          <button 
            className='btn btn-secondary' 
            onClick={()=> handleUpdate(params.data)}
          >
            <BsFillPencilFill />
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => handleDelete(params.data.id)}
          >
            <BsFillTrashFill />
          </button>
        </div>
      )
    }},
  ])

  const handleChange = (e) => {
    setSingleData({...singleData, [e.target.name]: e.target.name === 'monthly' ? e.target.valueAsNumber : e.target.value})
  }

  const fillUpFields = (data, id) => {
    const newData = {
      ...data,
      id: id,
      weekly: data.monthly / 4,
      bi_weekly: data.monthly / 2,
      yearly: data.monthly * 12
    }
    return newData
  }

  const addNewData = (data, oldIds) => {
    let newId = Math.floor(Math.random()* 5) + 1;
    while (oldIds.has(newId)) {
      newId = Math.floor(Math.random()* 5) + 1;
    }  
    const newSingleData = fillUpFields({...singleData}, newId)
    data.push(newSingleData)
    saveData(data, nameField)
  }

  const updateData = (newData) => {
    for (const data of newData) {
      if (data.id === singleData.id) {
        data[nameField] = singleData[nameField]
        data.monthly = singleData.monthly
        data.weekly = data.monthly / 4
        data.bi_weekly = data.monthly / 2
        data.yearly = data.monthly * 12
      }
    }
    saveData(newData, nameField)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const stored = fetchData(nameField)
    const oldIds = new Set()

    for (const d of stored) {
      oldIds.add(d.id)
    }

    if (oldIds.has(singleData?.id)) {
      updateData(stored) 
    } else {
      if (stored.length === 5) {
        toast.error("You can't add more than 5 rows in trial table!", {theme: "colored"})
      } else {   
        addNewData(stored, oldIds)
      }
    }
    setRefresh(!refresh)
    setTemp(!temp)
    hideModal()
  }

  const handleUpdate = (data) => {
    if (data[nameField] !== 'Total') {
      setSingleData(data)
      setModalShow(!modalShow)
    }
  }

  const handleDelete = (id) => {
    if (id) {
      setConfirmShow(!confirmShow)
      setId(id)
      setRefresh(!refresh)
    }
  }

  const hideModal = () => {
    setModalShow(!modalShow)
    setSingleData(null)
  }

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo( ()=> {
    return {
      sortable: true,
      filter: true,
      resizable: true,
    }
  }, []);

  const pinnedBottomRowData = useMemo(() => {

    let weekly_total = 0;
    let bi_weekly_total = 0;
    let monthly_total = 0;
    let yearly_total = 0;

    for (const item of formData) {
        weekly_total += item.weekly
        bi_weekly_total += item.bi_weekly
        monthly_total += item.monthly
        yearly_total += item.yearly
    }
    
    return [
      {
        [nameField]: "Total", 
        weekly: weekly_total, 
        bi_weekly: bi_weekly_total, 
        monthly: monthly_total, 
        yearly: yearly_total,
      },
    ]
  }, [formData]);

  const onExportClick = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, [])

  const onShowCsv = () => {
    const value = gridRef.current.api.getDataAsCsv();
    setCsv(value)
    setShowCsv(!showCsv)
  }

  useEffect(() => {
    const data = fetchData(nameField)
    setFormData(data)
  }, [temp])

  return (
      <>
        <div className="grid-wrapper">
          <div className="ag-theme-custom" style={{height: 400}}>
            <AgGridReact
              ref={gridRef}
              rowData={formData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              headerHeight= {70}
              animateRows={true}
              rowSelection='multiple'
              pagination={true}
              // paginationPageSize={4}
              paginationAutoPageSize={true}
              pinnedBottomRowData={pinnedBottomRowData}
            />
          </div>
        </div>  
        <div className='d-flex justify-content-end mt-2'>
          <div className='row gx-2'>
            <div className='col'>
            <Button 
              onClick={()=>setModalShow(!modalShow)} 
              btnText={"Add Row"}
              icon={<BsFillPlusCircleFill />}
            />
            </div>
          
            <div className="col">
            <Button 
              onClick={()=>onExportClick()} 
              btnText={"Export"}
              icon={<BsFillPlusCircleFill />}
            />
            </div>
         
            <div className="col">
            <Button 
              onClick={()=>onShowCsv()} 
              btnText={"Show CSV Content"}
              icon={<BsFillPlusCircleFill />}
            />
            </div>
          </div>

          <div id="modals">
            <NewRow 
              // This is a modal for adding new row to the table
              show={modalShow}
              onHide={() => hideModal()}
              handleChange={handleChange}
              singleData={singleData}
              nameField={nameField}
              handleSubmit={handleSubmit}
            />

            <ConfirmAlert 
              // This is a modal for confirmation of deleting rows
              show={confirmShow}
              onHide={setConfirmShow}
              nameField={nameField}
              id={id}
              setFormData={setFormData}
            />

            <CsvContent 
              show={showCsv}
              onHide={() => setShowCsv(!showCsv)}
              csv={csv}
            />

          </div>
        </div>
      </>
  );
};

export default CustomDataTable;