import React, {useEffect, useState, useRef, useMemo, useCallback} from 'react';
import { AgGridReact } from 'ag-grid-react';

// for styling
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


const CustomDataTable = () => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([
    {Income: "Business", Weekly: 1000, BiWeekly: 2000, Monthly: 4000, Yearly: 48000},
    {Income: "Job", Weekly: 500, BiWeekly: 1000, Monthly: 2000, Yearly: 24000},
    {Income: "Business", Weekly: 1000, BiWeekly: 2000, Monthly: 4000, Yearly: 48000},
  ]);

  const [columnDefs, setColumnDefs] = useState([
    { field: 'Income' , rowDrag: true, editable: true, cellEditor: 'agTextCellEditor',},
    { field: 'Weekly' },
    { field: 'BiWeekly' },
    { field: 'Monthly' },
    { field: 'Yearly' },
    
  ])

  const pinnedBottomRowData = useMemo(() => {
    return [
      {Income: "Total", Weekly: 3000, BiWeekly: 6000, Monthly: 12000, Yearly: 144000},
    ]
  }, []);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo( ()=> {
    return {
      sortable: true,
      filter: true,
      resizable: true,
      // editable: true,
    }
  }, []);

  // Example of consuming Grid Event . useful to get data from the cell for the use of server side.
  const cellClickedListener = useCallback( event => {
    console.log('cellClicked', event);
  }, []);

  // Example using Grid's API
  const buttonListener = useCallback( e => {
    gridRef.current.api.deselectAll();
  }, []);

  return (
      <>
        {/* Example using Grid's API */}
        {/* <button onClick={buttonListener}>Push Me</button> */}
        <div className="grid-wrapper">
          <div className="ag-theme-alpine" style={{height: 500}}>
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              animateRows={true}
              rowSelection='multiple'
              onCellClicked={cellClickedListener}
              pagination={true}
              rowDragManaged={true}
              suppressMoveWhenRowDragging={false}
              pinnedBottomRowData={pinnedBottomRowData}
            />
          </div>
        </div>  
      </>
  );
};

export default CustomDataTable;