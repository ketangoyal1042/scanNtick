import { Button, Label, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { addEventCollaborator, generateTicket } from '../../../api/event';

const AddCollaboratorForm = ({ setOpenModal, eventId }) => {
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        eventId: eventId,
        email: "",
    });
    const [checkValidation, setCheckValidation] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async () => {
        setCheckValidation(true);
        if (!validateForm()) return;
        try {
            const response = await addEventCollaborator(formData);
            if(response.success){
                toast.success(response?.message);
                onCloseModal();
            } else {
                toast.error(response?.message);
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong. Please try again.");
        }
    };
    function onCloseModal() {
        setFormData({ eventId: "", email: "" });
        setOpenModal(false);
    }
    const validateForm = () => {
        const errors = {};
        if (!formData.email) {
            errors.email = "Email is required.";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            errors.email = "Invalid email format.";
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
                Add Collaborator/Subadmin
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
                    placeholder="subAdmin@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    helperText={errors?.email && <>{errors?.email}</>}
                />
            </div>

            <div className="w-full mt-10">
                <Button onClick={handleSubmit} className="bg-purple-600">
                    Add Now!
                </Button>
            </div>
        </>
    )
}

export default AddCollaboratorForm