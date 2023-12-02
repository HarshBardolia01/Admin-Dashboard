import React from "react";
import TableRow from "./TableRow";
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons';

const Table = ({ tableData }) => {
    const [data, setData] = React.useState([]);

    const [currentTableData, setCurrentTableData] = React.useState([]);
    const [globalCheckBox, setGlobalCheckBox] = React.useState(false);
    const [editIsOn, setEditIsOn] = React.useState(-1);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [totalPages, setTotalPages] = React.useState(0);
    const [indexOfFirstRow, setIndexOfFirstRow] = React.useState(-1);
    const [indexOfLastRow, setIndexOfLastRow] = React.useState(-1);
    const [query, setQuery] = React.useState("");

    const handleGlobalSelect = (event) => {
        const newData = currentTableData.map((item) => {
            return {
                ...item,
                isSelected: event.target.checked
            };
        });

        setGlobalCheckBox(!globalCheckBox);
        setData(newData);
    };

    const handleRowSelect = (event) => {
        const newData = data.map((item) => {
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

        setData(newData);
    };

    const handleEditButton = (empId) => {
        setEditIsOn(empId);
    };

    const handleCrossButton = () => {
        setEditIsOn(-1);
    };

    const handleSaveButton = (empId, empObj) => {
        const newData = data.map((item) => {
            if (empId === item.id) {
                return empObj;
            } else {
                return item;
            }
        });

        setData(newData);
        setEditIsOn(-1);
    };

    const handleRowDeleteButton = (empId) => {
        const newData = data.filter((item) => {
            return (item.id !== empId);
        });

        setData(newData);
    };

    const handleSearchButton = () => {
        if (!query || query.length === 0) {
            setData(tableData);
        }

        const filteredData = tableData.filter((item) => {
            return (
                item.name.toLowerCase().includes(query.toLocaleLowerCase()) ||
                item.email.toLowerCase().includes(query.toLocaleLowerCase()) ||
                item.role.toLowerCase().includes(query.toLocaleLowerCase())
            );
        });

        setData(filteredData);
    };

    const handleSearchChange = (event) => {
        if (event.key === "Enter") {
            handleSearchButton();
        }
    };

    const handleDeleteSelected = () => {
        const updatedData = data.filter((item) => {
            return (!item.isSelected);
        });

        setData(updatedData);
    };

    React.useEffect(() => {
        const dataInfo = tableData.map((item) => {
            return {
                ...item,
                isSelected: false
            };
        });

        setData(dataInfo);
        setTotalPages(Math.ceil(data.length / rowsPerPage));
        setIndexOfFirstRow(currentPage * rowsPerPage);
        setIndexOfLastRow(indexOfFirstRow + rowsPerPage);
    }, [tableData]);

    React.useEffect(() => {
        setCurrentTableData(data.slice(indexOfFirstRow, indexOfLastRow));
    }, [data, indexOfFirstRow, indexOfLastRow]);

    return (
        <div className="dashboard-page">
            <div className="top-bar">
                <div className="search">
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        onKeyDown={(event) => handleSearchChange(event)}
                    />

                    <div className="search-button" onClick={handleSearchButton}>
                        <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
                    </div>

                    {
                        query.length ? (
                            <div
                                className="clear-button"
                                onClick={(event) => {
                                    setQuery("");
                                    setData(tableData);
                                }}
                            >
                                <FontAwesomeIcon className="clear-icon" icon={faTimes} />
                            </div>
                        ) : <></>
                    }
                </div>

                <div className="delete-selected" onClick={handleDeleteSelected}>
                    <FontAwesomeIcon className="delete-button-top" icon={faTrash} />
                </div>
            </div>

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
                                        isEdit={editIsOn === empInfo.id ? true : false}
                                        key={empInfo.id}
                                        empInfo={empInfo}
                                        handleRowSelect={handleRowSelect}
                                        handleEditButton={handleEditButton}
                                        handleSaveButton={handleSaveButton}
                                        handleCrossButton={handleCrossButton}
                                        handleRowDeleteButton={handleRowDeleteButton}
                                    />
                                );
                            })
                        }
                    </tbody>

                    {/* <tfoot>
                        <tr>
                            <td>TODO</td>
                        </tr>
                    </tfoot> */}
                </table>
            </div>

            <h1>Hello</h1>

        </div>
    );
};

export default Table;