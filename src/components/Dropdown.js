import React, { useState } from 'react';

function Dropdown({ title, items = [] }) {
    const [open, setOpen] = useState(false);
    const [selection, setSelection] = useState([]);
    const toggle = () => setOpen(!open);
    var fuente;
    function handleOnClick(item) {
        if (!selection.some(current => current.id === item.id)) {
           
            fuente ="http://127.0.0.1:8000/ambientes/"+item.id;
            setSelection([fuente]);
            console.log(selection);
        }
        else{
            
        }

    }

    return (
        <div className="dd-wrapper">
            <div
                tabIndex={0}
                className="dd-header"
                role="button"
                onKeyPress={() => toggle(!open)}
                onClick={() => toggle(!open)}>
                <div className="dd-header_title">
                    <p className="dd-header_title--bold">{title}</p>
                </div>
                <div className="dd-header_action">
                    <p>{open ? 'Close' : 'Open'}</p>

                </div>


            </div>
            {open && (
                <ul className="dd-list">
                    {items.map(item => (
                        <li className="dd-list-item"
                            key={item.id}>
                            <button type="button" onClick={() => handleOnClick(item)}>
                                <span>{item.value}</span>
                                <span>Selected..</span>
                            </button>
                        </li>
                    ))}

                </ul>
            )}
        </div>
    );
}
export default Dropdown;