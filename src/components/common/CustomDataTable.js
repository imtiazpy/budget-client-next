import React, {useEffect, useState, useRef, useMemo, useCallback} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { BsFillPlusCircleFill, BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs'
import Button from '~components/extra/button';
import { NewRow } from '~components/Modals';

// for styling the table
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const CustomDataTable = (props) => {
  const {rowData, nameField, header, pinnedBottomRowData, handleFormSubmit, handleDelete, updateRow} = props
  const gridRef = useRef();
  const [formData, setFormData] = useState({})
  const [modalShow, setModalShow] = useState(false)
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
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    // method for adding new row and updating existing one
    e.preventDefault()
    const stored = JSON.parse(localStorage.getItem('incomeData'))
    const oldIds = []
    for (const d of stored) {
      oldIds.push(d.id)
    }

    if (oldIds.includes(formData?.id)) {
      updateRow(formData)
    } else {
      handleFormSubmit(formData)
    } 

    hideModal()
  }

  const handleUpdate = (data) => {
    setFormData(data)
    setModalShow(!modalShow)
  }

  const hideModal = () => {
    setModalShow(!modalShow)
    setFormData(null)
  }

  // const update = (data) => {
  //   // const stored = JSON.parse(localStorage.getItem('incomeData'))
  //   // const data = stored.find(d => d.id === id)
  //   setFormData(data)
  //   handleUpdate(data)
  //   setModalShow(!modalShow)
  // }

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo( ()=> {
    return {
      sortable: true,
      filter: true,
      resizable: true,
      // editable: true,
    }
  }, []);

  return (
      <>
        <div className="grid-wrapper">
          <div className="ag-theme-custom" style={{height: 400}}>
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
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
            // onHide={() => setModalShow(!modalShow)}
            onHide={() => hideModal()}
            handleChange={handleChange}
            formData={formData}
            handleSubmit={handleSubmit}
          />
        </div>
      </>
  );
};

export default CustomDataTable;