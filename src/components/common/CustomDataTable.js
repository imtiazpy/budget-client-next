import React, {useEffect, useState, useRef, useMemo, useCallback} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { BsFillPlusCircleFill, BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs'
import { toast } from "react-toastify";

import Button from '~components/extra/button';
import { ConfirmAlert, NewRow } from '~components/Modals';

import { fetchData, saveData } from 'src/utils';

// for styling the table
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const CustomDataTable = (props) => {
  const {nameField, header, pinnedBottomRowData} = props
  const gridRef = useRef();

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
      cellEditor: 'agTextCellEditor',
    },
    { headerName: 'WEEKLY', field: 'weekly', maxWidth: 180 },
    { headerName: 'BI-WEEKLY', field: 'bi_weekly', maxWidth: 180 },
    { headerName: 'MONTHLY', field: 'monthly', maxWidth: 180 },
    { headerName: 'YEARLY', field: 'yearly', maxWidth: 180 },
    { 
      headerName: 'ACTION', 
      field: 'id', 
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
            onClick={() => handleDelete(params.value)}
          >
            <BsFillTrashFill />
          </button>
        </div>
      )
    }},
  ])

  const handleChange = (e) => {
    setSingleData({...singleData, [e.target.name]: e.target.value})
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
    setTemp(!temp)
    hideModal()
  }

  const handleUpdate = (data) => {
    setSingleData(data)
    setModalShow(!modalShow)
  }

  const handleDelete = (id) => {
    setConfirmShow(!confirmShow)
    setId(id)
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

  useEffect(() => {
    const data = fetchData(nameField)
    setFormData(data)
    console.log(data)
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
              rowDragManaged={true}
              suppressMoveWhenRowDragging={false}
              pinnedBottomRowData={pinnedBottomRowData}
            />
          </div>
        </div>  
        <div className='d-flex justify-content-end mt-2'>
          <Button 
            onClick={()=>setModalShow(!modalShow)} 
            btnText={"Add Row"}
            icon={<BsFillPlusCircleFill />}
          />

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
        </div>
      </>
  );
};

export default CustomDataTable;