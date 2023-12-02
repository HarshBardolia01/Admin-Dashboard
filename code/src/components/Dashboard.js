import React from "react";
import axios from "axios";
import Table from "./Table";

const apiUrl = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const Dashboard = () => {
    const [tableData, setTableData] = React.useState([]);

    React.useEffect(() => {
        async function fetchData() {
            const response = await axios.get(apiUrl);
            setTableData(response.data);
        };

        fetchData();
    }, []);

    return (
        <Table tableData={tableData} />
    );
};

export default Dashboard;