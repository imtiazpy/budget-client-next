import React, {useContext} from 'react';
import GlobalHeaderContext from '../../context/GlobalHeaderContext';

const Input = ({ name, ...rest}) => {
    const gContext = useContext(GlobalHeaderContext);

    return (
        <>
            <input 
                name={name}
                {...rest}
            />
            {gContext?.validationError?.[name] &&
                <div className="custom-alert">
                    {gContext?.validationError?.[name].map((item,key)=><><small key={key}>{item}</small><br></br></>)}
                </div>
            }
        </>
    );
}

export default Input;