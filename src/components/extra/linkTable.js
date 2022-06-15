import React, {useContext} from 'react';
import DataTable from 'react-data-table-component';
import useApiHelper from '../../api';


const customStyles = {
    rows: {
        style: {
            minHeight: '72px', // override the row height
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
        },
    },
};

const LinkTable = (props)=>{

    const [selectedRows, setSelectedRows] = React.useState([]);
	const [toggleCleared, setToggleCleared] = React.useState(false);
	const [data, setData] = React.useState([]);
    // const [data, setData] = React.useState(tableDataItems);

    const api = useApiHelper();

	const handleRowSelected = React.useCallback(state => {
        // api.deleteLink()
		setSelectedRows(state.selectedRows);
	}, []);

	const contextActions = React.useMemo(() => {
		const handleDelete = (e) => {
            e.preventDefault();
			setToggleCleared(!toggleCleared);
            for (let i = 0; i < selectedRows.length; i++) {
               api.deleteLinks(selectedRows[i].id).then((response) => {
                   //
               })
            }
            window.location.reload(false);
			
		};

		return (
			<button key="delete" onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px' }}>
				Delete
			</button>
		);
	}, [data, selectedRows, toggleCleared]);


    const columns = [
        {
            name: 'Name',
            cell: row => row.name,
            sortable: true,
        },
        {
            name: 'Platform',
            cell: row => row.platform_details.name,
            sortable: true,
        },
        {
            name: 'Post Link',
            cell: row =>(
                <div>
                     <a href={row.url}  className="me-1" >{row.url}</a>
                </div>
            ),
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={props.tableData}
            customStyles={customStyles}
            highlightOnHover

            title="Recent Activities"

			selectableRows
			contextActions={contextActions}
			onSelectedRowsChange={handleRowSelected}
			clearSelectedRows={toggleCleared}
			pagination

        />
    );
}

export default LinkTable;
























