import React from "react";
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSave, faTimes, faFastForward, faFastBackward, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const TableRow = ({ empInfo, handleRowSelect }) => {
    const classNameSelect = empInfo.isSelected ? "selected-table-row" : "table-row";

    return (
        <tr key={empInfo.id} className={classNameSelect}>
            <td>
                <div className="row-checkbox">
                    <input
                        checked={empInfo.isSelected}
                        id={empInfo.id}
                        type="checkbox"
                        className="row-checkbox-input"
                        onChange={handleRowSelect}
                    />
                </div>
            </td>
            <td id={empInfo.id} className="table-row-data" >{empInfo.name}</td>
            <td id={empInfo.id} className="table-row-data" >{empInfo.email}</td>
            <td id={empInfo.id} className="table-row-data" >{empInfo.role}</td>
            <td id={empInfo.id} className="table-row-data-actions" >
                <div className="edit-button-div">
                    <FontAwesomeIcon className="edit-button" icon={faEdit} />
                </div>
                <div className="delete-button-div">
                    <FontAwesomeIcon className="delete-button" icon={faTrash} />
                </div>
            </td>
        </tr>
    );
};

export default TableRow;