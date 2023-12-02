import React from "react";

const TableRow = ({ empInfo, handleRowSelect }) => {

    return (
        <tr key={empInfo.id}>
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
            <td id={empInfo.id} >{empInfo.name}</td>
            <td id={empInfo.id} >{empInfo.email}</td>
            <td id={empInfo.id} >{empInfo.role}</td>
            <td id={empInfo.id} > {empInfo.isSelected ? "True" : "False"} </td>
        </tr>
    );
};

export default TableRow;