import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const UpdateEvent = () => {
    const auth = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        eventVenue: "",
        eventDateTime: "",
        headCapacity: "",
    });
    const [responseMessage, setResponseMessage] = useState("");
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newerr = {};
        if (!formData.title) newerr.title = "Title is required";
        // if (!formData.description) newerr.description = "Description is required";
        if (!formData.eventVenue) newerr.eventVenue = "Event venue is required";
        if (!formData.eventDateTime)
            newerr.eventDateTime = "Event date is required";
        if (!formData.headCapacity)
            newerr.headCapacity = "Head capacity is required";
        setErrors(newerr);
        return Object.keys(newerr).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            if (auth.token) {
                // Convert eventDateTime to IST
                const utcDate = new Date(formData.eventDateTime);
                const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
                const istDate = new Date(utcDate.getTime() + istOffset).toISOString();
                const updatedFormData = { ...formData, eventDateTime: istDate };
                let response = await createEvent(updatedFormData);
                if (!response.success) {
                    console.log("Error creating event", response.success);
                }
                toast(response?.message);
            }
            handleCloseModal();
        } catch (error) {
            toast("Failed to create event. Please try again.");
            console.log(error);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };
    return (
        <div className="max-w-sm mx-auto p-4 bg-white shadow-md rounded-lg">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold">Update Event</h1>
            </div>
            <form>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Event Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>
                    <div>
                        <label htmlFor="eventVenue" className="block text-sm font-medium text-gray-700">
                            Event Venue
                        </label>
                        <input
                            type="text"
                            id="eventVenue"
                            name="eventVenue"
                            value={formData.eventVenue}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        {errors.eventVenue && <p className="text-red-500 text-sm mt-1">{errors.eventVenue}</p>}
                    </div>
                    <div>
                        <label htmlFor="eventDateTime" className="block text-sm font-medium text-gray-700">
                            Event Date
                        </label>
                        <input
                            type="datetime-local"
                            id="eventDateTime"
                            name="eventDateTime"
                            value={formData.eventDateTime}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        {errors.eventDateTime && <p className="text-red-500 text-sm mt-1">{errors.eventDateTime}</p>}
                    </div>
                    <div>
                        <label htmlFor="headCapacity" className="block text-sm font-medium text-gray-700">
                            Head Capacity
                        </label>
                        <input
                            type="number"
                            id="headCapacity"
                            name="headCapacity"
                            value={formData.headCapacity}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        {errors.headCapacity && <p className="text-red-500 text-sm mt-1">{errors.headCapacity}</p>}
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            rows="4"
                            required
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                        <button
                            type="submit"
                            onClick={handleCreateEvent}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>

    )
}

export default UpdateEvent