import React from "react";
import CreateHostel from "../components/CreateHostel";
import HostelList from "../components/HostelList";

const ManageHostels = () => {
    return (
        <div className="container mx-auto mt-10">
            <CreateHostel />
            <HostelList />
        </div>
    );
};

export default ManageHostels;
