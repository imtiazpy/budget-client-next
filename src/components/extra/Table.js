import DataTable from 'react-data-table-component';
import thumbnail from '~image/logo/default.png';

const customStyles = {
    rows: {
        style: {
            minHeight: '80px', // override the row height
            border:'1px solid #2627292e',
            textAlign: 'center'
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            fontSize:'18px',
            justifyContent: 'center',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
            fontSize:'18px',
            justifyContent: 'center',
        },
    },
};

const Table = (props)=>{
    const columns = [
        {
            name: 'Rank',
            cell: row => <div><span className="me-3"> # {row.rank} </span>
                                <img style={{width:'60px',height:'60px', borderRadius:'50%'}} src={row.avatar?row.avatar:thumbnail.src} />
                            </div>,
        },
        // {
        //     name: '',
        //     cell: row => <div>
        //                     {/* <span>#1</span> */}
        //                     <img style={{width:'60px',height:'60px', borderRadius:'50%'}} src={row.avatar?row.avatar:thumbnail.src} />
        //                 </div>,
        // },
        {
            name: 'Name',
            cell: row => <a href={`./user/${row.id}`} className="text-black">{row.first_name + " " + row.last_name}</a>,
            sortable: true,
        },
        {
            name: 'Socials',
            cell: row =>(
                <div className="d-flex">
                    {row?.profile?.facebook_profile &&
                        <a href={row?.profile?.facebook_profile}  className="me-1 s-facebook" >
                            <i className="fab fa-facebook-f fs-4"></i>
                        </a>
                    }
                    {row?.profile?.twitter &&
                        <a href={row?.profile?.twitter}  className="me-1 s-twitter" >
                            <i className="fab fa-twitter fs-4"></i>
                        </a>
                    }
                    {row?.profile?.instagram_profile &&
                        <a href={row?.profile?.instagram_profile} className="me-1 s-instagram" >
                            <i className="fab fa-instagram fs-4"></i>
                        </a>
                    }
                    {row?.profile?.youtube_channel &&
                        <a href={row?.profile?.youtube_channel} className="me-1" >
                            <i className="fab fa-youtube fs-4"></i>
                        </a>
                    }
                    {/* {row?.profile?.linkedin_profile &&
                        <a href={row.profile.linkedin_profile} className="me-1" >
                            <i className="fab fa-linkedin fs-4" ></i>
                        </a>
                    } */}
                    {/* {row?.profile?.tiktok_profile &&
                        <a href={row.profile.tiktok_profile} className="me-1" >
                            <img style={{width:'20px',height:'20px', borderRadius:'5px'}} className="fa-tiktok-l" src={tiktokIcon.src} />
                        </a>
                    } */}
                    {row?.profile?.twitch &&
                        <a href={row?.profile?.twitch} className="s-twitch">
                            <i className="fab fa-twitch fs-4"></i>
                        </a>
                    }
                </div>
            ),
        },
        // {
        //     name: 'First Name',
        //     selector: row => row.first_name,
        //     sortable: true,
        // },
        {
            name: 'Latest Sponsorship',
            // selector: row => row.last_sponsor_post.name,
            cell: row => <a href={row.last_sponsor_post.link} style={{color:'blue'}} target="_blank">
                            {row.last_sponsor_post?.name}
                        </a>,
        },
        {
            name: '# of Sponsored Posts',
            selector: row => row.total_ads_post,
            sortable: true,
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={props.tableData}
            customStyles={customStyles}
            highlightOnHover
        />
    );
}

export default Table;