import React from 'react';

const Pagination = (props) =>{
    const {pageLinks} = props;

    return (
        <div className="mt-2">
            <nav aria-label="Page navigation example">
                {pageLinks?.length>1 &&  
                <ul className="pagination rounded-0 ml-2">
                    <li className="page-item rounded-0 flex-all-center mr-2" style={{fontSize:'24px'}}>
                        <a
                            onClick={() => props?.getTableData(props?.previous ? props?.previous : 1)}
                            className="page-link rounded-0 border-0 px-3 active text-black"
                            aria-label="Previous"
                        >
                            <i className="fas fa-chevron-left"></i>
                        </a>
                    </li>
                    
                    {pageLinks.map((item,key)=> (
                        <div key={key}>
                        {item[1] &&
                            <li className={item[2]? "page-item active": "page-item"} style={{fontSize:'24px'}}>
                                <a
                                    className="page-link border-0 font-size-4 font-weight-semibold text-black"
                                    onClick={() => props?.getTableData(item[1])}
                                    style={{cursor: 'pointer'}}
                                    >
                                    {item[1]}
                                </a>
                            </li>
                            }
                            {item[3] && 
                            <div className='px-2'>
                                <span style={{fontSize:'24px'}}>...</span>
                            </div>
                        }
                        </div>
                    ))}

                    <li className="page-item rounded-0 flex-all-center ml-2" style={{fontSize:'24px'}}>
                        <a
                            onClick={() => props?.getTableData(props?.next ? props?.next : 1)}
                            className="page-link rounded-0 border-0 px-3 text-black"
                            aria-label="Next"
                        >
                            <i className="fas fa-chevron-right"></i>
                        </a>
                    </li>
                </ul>
                }
            </nav>
      </div>
    );
}

export default Pagination;


