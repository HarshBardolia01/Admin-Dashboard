import React from "react";
import axios from "axios";

const apiUrl = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const Dashboard = () => {
    const [tableData, setTableData] = React.useState([]);

    React.useEffect(() => {
        async function fetchData() {
            const response = await axios.get(apiUrl);
            console.log(response.data);
            setTableData(response.data);
        };

        fetchData();
    }, []);

    console.log(tableData);

    return (
        <h1>Working here</h1>
    );
};

export default Dashboard;