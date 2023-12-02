import React from "react";
import TableRow from "./TableRow";
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrash,
    faMagnifyingGlass,
    faTimes,
    faAnglesLeft,
    faAngleLeft,
    faAnglesRight,
    faAngleRight
} from '@fortawesome/free-solid-svg-icons';

const Table = ({ tableData }) => {
    const [data, setData] = React.useState([]);
    const [currentTableData, setCurrentTableData] = React.useState([]);
    const [globalCheckBox, setGlobalCheckBox] = React.useState(false);
    const [editIsOn, setEditIsOn] = React.useState(-1);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState(0);
    const [query, setQuery] = React.useState("");
    const [selectedCount, setSelectedCount] = React.useState(0);
    const rowsPerPage = 10;

    const handleGlobalSelect = (event) => {
        const newData = data.map((item, index) => {
            if (currentPage * rowsPerPage <= index && index < (currentPage + 1) * rowsPerPage) {
                return {
                    ...item,
                    isSelected: event.target.checked
                };
            }

            return {
                ...item
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
                return item;
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
        if (!query || query.length === 0) return;

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
        setGlobalCheckBox(false);
    };

    React.useEffect(() => {
        const dataInfo = tableData.map((item) => {
            return {
                ...item,
                isSelected: false
            };
        });

        setData(dataInfo);
        setTotalPages(Math.ceil(tableData.length / rowsPerPage));
    }, [tableData]);

    React.useEffect(() => {
        const startingIndex = currentPage * rowsPerPage;
        const endingIndex = startingIndex + rowsPerPage;
        const dataToShow = data.slice(startingIndex, endingIndex);
        let count = 0;

        dataToShow.map((item) => {
            if (item.isSelected) {
                count++;
            }
            return item;
        });

        setTotalPages(Math.ceil(data.length / rowsPerPage));
        setSelectedCount(count);
        setCurrentTableData(dataToShow);
    }, [data, currentPage]);

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

                    <div
                        title="Search Query"
                        className="search-button"
                        onClick={handleSearchButton}
                    >
                        <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
                    </div>

                    {
                        query.length ? (
                            <div
                                title="Clear Search Query"
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

                <div
                    title="Deleted selected rows"
                    className="delete-selected"
                    onClick={handleDeleteSelected}
                >
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
                </table>
            </div>

            <div className="table-footer">
                <div className="selected-text">
                    {selectedCount} out of {data.length} selected
                </div>

                <div className="pagination">

                    <p style={{ "marginRight": "0.75rem" }}>
                        Page {currentPage + 1} of {totalPages}
                    </p>

                    <button
                        title="First Page"
                        disabled={currentPage === 0}
                        className="pagination-buttons"
                        onClick={(event) => setCurrentPage(0)}
                    >
                        <FontAwesomeIcon className="pagination-icon" icon={faAnglesLeft} />
                    </button>

                    <button
                        title="Previous Page"
                        disabled={currentPage === 0}
                        className="pagination-buttons"
                        onClick={(event) => setCurrentPage(Math.max(currentPage - 1, 0))}
                    >
                        <FontAwesomeIcon className="pagination-icon" icon={faAngleLeft} />
                    </button>

                    <div className="pagination-page-buttons">

                        {
                            Array.from({ length: totalPages }).map((element, index) => {
                                let highlight = {};
                                if (index === currentPage) {
                                    highlight = {
                                        "backgroundColor": "rgb(51, 51, 230)",
                                        "color": "white"
                                    }
                                };

                                return (
                                    <button
                                        title={`Page number ${index + 1}`}
                                        key={index}
                                        style={highlight}
                                        className="pagination-icon"
                                        onClick={(event) => setCurrentPage(index)}
                                    >
                                        {index + 1}
                                    </button>
                                );
                            })
                        }

                    </div>

                    <button
                        title="Next Page"
                        disabled={currentPage === totalPages - 1}
                        className="pagination-buttons"
                        onClick={(event) => setCurrentPage(Math.min(currentPage + 1, totalPages - 1))}
                    >
                        <FontAwesomeIcon className="pagination-icon" icon={faAngleRight} />
                    </button>

                    <button
                        title="Last Page"
                        disabled={currentPage === totalPages - 1}
                        className="pagination-buttons"
                        onClick={(event) => setCurrentPage(totalPages - 1)}
                    >
                        <FontAwesomeIcon className="pagination-icon" icon={faAnglesRight} />
                    </button>
                </div>

            </div>
        </div >
    );
};

export default Table;