"use client";

import React, { useState } from "react";
import { useVehicles } from "@/hooks/useVehicles";
import { IVehicle } from "@/interfaces/vehicle";

const VehiclesAdminPanel = () => {
    const { vehicles, loading, error, createVehicle, modifyVehicle, removeVehicle } = useVehicles();
    const [vehicleName, setVehicleName] = useState("");
    const [vehicleCapacity, setVehicleCapacity] = useState<number | "">("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [updatedVehicle, setUpdatedVehicle] = useState<{ vehicle_name: string; vehicle_capacity: number }>({
        vehicle_name: "",
        vehicle_capacity: 0,
    });

    // Handle Adding a Vehicle
    const handleAddVehicle = async () => {
        if (!vehicleName || vehicleCapacity === "" || Number(vehicleCapacity) <= 0) return;
    
        try {
            const newVehicle = await createVehicle({
                vehicle_name: vehicleName,
                vehicle_capacity: Number(vehicleCapacity),
            });
    
            if (newVehicle) { // ✅ Ensure newVehicle is valid
                setVehicleName("");
                setVehicleCapacity("");
            }
        } catch (error) {
            console.error("Error adding vehicle:", error);
        }
    };
    

    // Handle Editing
    const startEditing = (vehicle: IVehicle) => {
        setEditingId(vehicle.id);
        setUpdatedVehicle({ vehicle_name: vehicle.vehicle_name, vehicle_capacity: vehicle.vehicle_capacity });
    };

    const saveEdit = async (id: number) => {
        await modifyVehicle(id, updatedVehicle);
        setEditingId(null);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">Manage Vehicles</h2>

            {/* 🔹 Add Vehicle Form */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex items-center gap-4">
                <input
                    type="text"
                    placeholder="Vehicle Name"
                    value={vehicleName}
                    onChange={(e) => setVehicleName(e.target.value)}
                    className="p-2 border rounded-md flex-1"
                />
                <input
                    type="number"
                    placeholder="Capacity"
                    value={vehicleCapacity}
                    onChange={(e) => setVehicleCapacity(Number(e.target.value))}
                    className="p-2 border rounded-md w-24"
                />
                <button
                    onClick={handleAddVehicle}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                    ➕ Add Vehicle
                </button>
            </div>

            {/* 🔴 Show Error */}
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {/* 🚙 Vehicle List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                    <p className="text-center col-span-full text-gray-500">Loading vehicles...</p>
                ) : (
                    vehicles.map((vehicle) => (
                        <div key={vehicle.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                            {editingId === vehicle.id ? (
                                <>
                                    <div className="flex flex-col gap-2">
                                        <input
                                            type="text"
                                            value={updatedVehicle.vehicle_name}
                                            onChange={(e) =>
                                                setUpdatedVehicle({ ...updatedVehicle, vehicle_name: e.target.value })
                                            }
                                            className="p-2 border rounded-md"
                                        />
                                        <input
                                            type="number"
                                            value={updatedVehicle.vehicle_capacity}
                                            onChange={(e) =>
                                                setUpdatedVehicle({
                                                    ...updatedVehicle,
                                                    vehicle_capacity: Number(e.target.value),
                                                })
                                            }
                                            className="p-2 border rounded-md w-24"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => saveEdit(vehicle.id)}
                                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
                                        >
                                            ✅ Save
                                        </button>
                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md"
                                        >
                                            ❌ Cancel
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <p className="text-lg font-semibold">{vehicle.vehicle_name}</p>
                                        <p className="text-gray-500">Capacity: {vehicle.vehicle_capacity}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => startEditing(vehicle)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md"
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            onClick={() => removeVehicle(vehicle.id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default VehiclesAdminPanel;
