import React, { useContext, useState } from "react";
import { HostelContext } from "../context/HostelContext";
import { Building, Users, PlusCircle, AlertCircle } from "lucide-react";

const CreateHostel = () => {
    const { createHostel } = useContext(HostelContext);
    const [name, setName] = useState("");
    const [type, setType] = useState("boys");
    const [totalRooms, setTotalRooms] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!name || !totalRooms) {
            setError("Please fill all fields");
            return;
        }

        createHostel({ name, type, totalRooms: parseInt(totalRooms) });
        setName("");
        setTotalRooms("");
    };

    return (
        <div className="max-w-2xl mt-20 mx-auto px-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Building className="w-6 h-6 text-blue-500" />
                    Add Hostel
                </h1>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <Building className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Hostel Name"
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <Users className="w-5 h-5 text-gray-400" />
                        </div>
                        <select 
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            value={type} 
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="boys">Boys</option>
                            <option value="girls">Girls</option>
                            <option value="phd">PhD</option>
                        </select>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <PlusCircle className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            type="number"
                            placeholder="Total Rooms"
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            value={totalRooms}
                            onChange={(e) => setTotalRooms(e.target.value)}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2 font-medium"
                    >
                        <PlusCircle className="w-5 h-5" />
                        Create Hostel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateHostel;