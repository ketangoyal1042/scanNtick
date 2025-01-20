import { Button, Label, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { generateTicket } from '../../../api/event';

const TicketGenerateFromEvent = ({ setOpenModal, eventId }) => {
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        mobileNumber: "",
        quantity: "",
        eventId: eventId,
        email: "",
    });
    const [checkValidation, setCheckValidation] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "quantity" ? Number(value) : value,
        }));
    };
    const handleSubmit = async () => {
        setCheckValidation(true);
        if (!validateForm()) return;
        try {
            const response = await generateTicket(formData);
            toast.success(response?.message);
            onCloseModal();
        } catch (error) {
            toast.error(error.message || "Something went wrong. Please try again.");
        }
    };
    function onCloseModal() {
        setFormData({ mobileNumber: "", quantity: "", eventId: "", email: "" });
        setOpenModal(false);
    }
    const validateForm = () => {
        const errors = {};
        if (!formData.email) {
            errors.email = "Email is required.";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            errors.email = "Invalid email format.";
        }

        if (!formData.mobileNumber) {
            errors.mobileNumber = "Mobile number is required.";
        } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
            errors.mobileNumber = "Invalid mobile number. Must be 10 digits.";
        }

        if (!formData.quantity) {
            errors.quantity = "Quantity is required.";
        } else if (formData.quantity <= 0) {
            errors.quantity = "Quantity must be a positive number.";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    useEffect(() => {
        if (checkValidation) {
            validateForm();
        }
    }, [formData, checkValidation]);
    return (
        <>
            <h3 className=" mb-6 mt-4 text-xl font-medium text-gray-900 dark:text-white">
                Generate New Ticket
            </h3>
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="email"
                        value="Your Email"
                        color={errors?.email ? "failure" : "gray"}
                    />
                </div>
                <TextInput
                    color={errors?.email ? "failure" : "gray"}
                    id="email"
                    name="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    helperText={errors?.email && <>{errors?.email}</>}
                />
            </div>

            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="mobileNumber"
                        value="Mobile Number"
                        color={errors?.mobileNumber ? "failure" : "gray"}
                    />
                </div>
                <TextInput
                    color={errors?.mobileNumber ? "failure" : "gray"}
                    id="mobileNumber"
                    name="mobileNumber"
                    placeholder="8884332601"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                    helperText={
                        errors?.mobileNumber && <>{errors?.mobileNumber}</>
                    }
                />
            </div>

            <div>
                <div className="mb-2 block">
                    <Label htmlFor="quantity" value="Quantity" color={errors?.quantity ? "failure" : "gray"} />
                </div>
                <TextInput
                    color={errors?.quantity ? "failure" : "gray"}
                    id="quantity"
                    name="quantity"
                    type="number"
                    placeholder="Enter ticket quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    helperText={
                        errors?.quantity && <>{errors?.quantity}</>
                    }
                />
            </div>

            <div className="w-full mt-10">
                <Button onClick={handleSubmit} className="bg-purple-600">
                    Generate Ticket
                </Button>
            </div>
        </>
    )
}

export default TicketGenerateFromEvent