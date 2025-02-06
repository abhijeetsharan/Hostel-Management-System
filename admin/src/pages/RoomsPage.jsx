import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Building2, Users, DoorClosed, ChevronLeft, ChevronRight, User } from "lucide-react";

const RoomsPage = () => {
    const { backendURL } = useContext(AppContext);
    const { hostelId } = useParams();

    const [rooms, setRooms] = useState([]);
    const [hostelName, setHostelName] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 20;

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const { data } = await axios.get(
                    `${backendURL}/api/hostel/${hostelId}?page=${page}&limit=${limit}`
                );
                setRooms(data.rooms);
                setHostelName(data.hostelName);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };
        fetchRooms();
    }, [hostelId, page, backendURL]);

    return (
        <div className="max-w-6xl mx-auto mt-20 mb-10 px-4">
            <div className="flex items-center gap-2 mb-6">
                <Building2 className="w-7 h-7 text-blue-500" />
                <h1 className="text-2xl font-bold text-gray-800">{hostelName} - Rooms</h1>
            </div>
            
            {rooms.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <DoorClosed className="mx-auto w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-gray-600">No rooms available</p>
                </div>
            ) : (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {rooms.map((room) => (
                            <div 
                                key={room._id} 
                                className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <DoorClosed className="w-5 h-5 text-blue-500" />
                                    <h2 className="text-lg font-bold text-gray-800">Room {room.roomNumber}</h2>
                                </div>

                                <div className="space-y-2 mb-4 text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4" />
                                        <p>Capacity: {room.capacity}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        <p>Allocated: {room.allocatedStudents.length}/{room.capacity}</p>
                                    </div>
                                </div>

                                {room.allocatedStudents.length > 0 ? (
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <p className="text-sm font-medium text-gray-700 mb-2">Allocated Students:</p>
                                        <ul className="space-y-2">
                                            {room.allocatedStudents.map((student) => (
                                                <li 
                                                    key={student._id}
                                                    className="flex items-center gap-2 text-sm text-gray-600"
                                                >
                                                    <User className="w-4 h-4" />
                                                    {student.name} ({student.rollNumber})
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
                                        No students allocated.
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center items-center gap-2 mt-8">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className="flex items-center gap-1 px-4 py-2 bg-white border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Previous
                        </button>
                        <span className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}
                            className="flex items-center gap-1 px-4 py-2 bg-white border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                        >
                            Next
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomsPage;