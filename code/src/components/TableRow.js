import React from "react";
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

const TableRow = ({ isEdit, empInfo, handleRowSelect, handleEditButton, handleSaveButton, handleCrossButton, handleRowDeleteButton }) => {
    const [empObj, setEmpObj] = React.useState({});

    React.useEffect(() => {
        setEmpObj(empInfo);
    }, [empInfo]);

    const classNameSelect = (empObj.isSelected || isEdit) ? "selected-table-row" : "table-row";

    const handleChange = (event) => {
        setEmpObj({
            ...empObj,
            [event.target.name]: event.target.value
        });
    };

    if (isEdit) {
        return (
            <tr key={empObj.id} className={classNameSelect}>
                <td>
                    <div className="row-checkbox">
                        <input
                            checked={empObj.isSelected || isEdit}
                            id={empObj.id}
                            type="checkbox"
                            className="row-checkbox-input"
                            onChange={handleRowSelect}
                        />
                    </div>
                </td>
                <td className="table-row-data" >
                    <input
                        className="edit-field"
                        name="name"
                        value={empObj.name}
                        onChange={handleChange}
                    />
                </td>
                <td className="table-row-data" >
                    <input
                        className="edit-field"
                        name="email"
                        value={empObj.email}
                        onChange={handleChange}
                    />
                </td>
                <td className="table-row-data" >
                    <input
                        className="edit-field"
                        name="role"
                        value={empObj.role}
                        onChange={handleChange}
                    />
                </td>
                <td className="table-row-data-actions" >
                    <div className="save-button-div" onClick={() => handleSaveButton(empObj.id, empObj)}>
                        <FontAwesomeIcon className="save-button" icon={faSave} />
                    </div>
                    <div className="cross-button-div" onClick={handleCrossButton}>
                        <FontAwesomeIcon className="cross-button" icon={faTimes} />
                    </div>
                </td>
            </tr>
        );
    }

    return (
        <tr
            key={empObj.id}
            className={classNameSelect}
        >
            <td>
                <div className="row-checkbox">
                    <input
                        checked={empObj.isSelected}
                        id={empObj.id}
                        type="checkbox"
                        className="row-checkbox-input"
                        onChange={handleRowSelect}
                    />
                </div>
            </td>

            <td className="table-row-data" >{empObj.name}</td>

            <td className="table-row-data" >{empObj.email}</td>

            <td className="table-row-data" >{empObj.role}</td>

            <td className="table-row-data-actions" >
                <div
                    title="Edit Row"
                    className="edit-button-div"
                    onClick={() => handleEditButton(empObj.id)}
                >
                    <FontAwesomeIcon className="edit-button" icon={faEdit} />
                </div>

                <div
                    title="Delete Row"
                    className="delete-button-div"
                    onClick={() => handleRowDeleteButton(empObj.id)}
                >
                    <FontAwesomeIcon className="delete-button" icon={faTrash} />
                </div>
            </td>
        </tr>
    );
};

export default TableRow;