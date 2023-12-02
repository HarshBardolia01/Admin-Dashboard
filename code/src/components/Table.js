import React from "react";
import TableRow from "./TableRow";

const Table = ({ tableData }) => {
    const [data, setData] = React.useState([]);

    const [currentTableData, setCurrentTableData] = React.useState([]);
    const [globalCheckBox, setGlobalCheckBox] = React.useState(false);

    const [currentPage, setCurrentPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [totalPages, setTotalPages] = React.useState(0);
    const [indexOfFirstRow, setIndexOfFirstRow] = React.useState(-1);
    const [indexOfLastRow, setIndexOfLastRow] = React.useState(-1);

    React.useEffect(() => {
        const dataInfo = tableData.map((item) => {
            return {
                ...item,
                isSelected: false
            };
        });

        setData(dataInfo);
        setTotalPages(Math.ceil(data.length / rowsPerPage));
        setIndexOfFirstRow((currentPage - 1) * rowsPerPage);
        setIndexOfLastRow(indexOfFirstRow + rowsPerPage);
    }, [tableData]);

    React.useEffect(() => {
        setCurrentTableData(data.slice(indexOfFirstRow, indexOfLastRow));
    }, [indexOfFirstRow, indexOfLastRow]);

    const handleGlobalSelect = (event) => {
        const newData = currentTableData.map((item) => {
            return {
                ...item,
                isSelected: event.target.checked
            };
        });

        setGlobalCheckBox(!globalCheckBox);
        setCurrentTableData(newData);
    };

    const handleRowSelect = (event) => {
        const newData = currentTableData.map((item) => {
            return {
                ...item,
                isSelected: (event.target.id === item.id ? event.target.checked : item.isSelected)
            };
        });

        if (event.target.checked) {
            let count = 0;
            newData.map((item) => {
                if (item.isSelected) {
                    count++;
                }
            });

            if (count === rowsPerPage) {
                setGlobalCheckBox(true);
            }
        } else {
            setGlobalCheckBox(false);
        }

        setCurrentTableData(newData);
    };

    return (
        <div className="dashboard-page">
            <h1>Working Here in Table</h1>

            <div className="dashboard-table">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">
                                <div className="global-checkbox">
                                    <input
                                        checked={globalCheckBox}
                                        type="checkbox"
                                        className="global-checkbox-input"
                                        onChange={handleGlobalSelect}
                                    />
                                </div>
                            </th>

                            <th scope="col" className="table-header-name">Name</th>
                            <th scope="col" className="table-header-email">Email</th>
                            <th scope="col" className="table-header-role">Role</th>
                            <th scope="col" className="table-header-actions">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            currentTableData.map((empInfo,) => {
                                return (
                                    <TableRow
                                        key={empInfo.id}
                                        empInfo={empInfo}
                                        handleRowSelect={handleRowSelect}
                                    />
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Table;