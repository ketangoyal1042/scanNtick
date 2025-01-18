import { useRouter } from 'next/router';
import React from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { deleteEvent } from '../../../api/event';
import { toast } from 'react-toastify';

const DeleteEvent = ({ setOpenModal, eventId }) => {
    const router = useRouter();
    const handleDelete = async () => {
        let response = await deleteEvent(eventId);
        if (!response.success) {
            console.log("Error deletion event", response.success);
        }
        toast(response?.message);
        setOpenModal(false);
        router.push('/dashboard');
    }
    return (
        <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
                <button color="red" onClick={handleDelete}>
                    {"Yes, I'm sure"}
                </button>
                <button color="gray" onClick={() => setOpenModal(false)}>
                    No, cancel
                </button>
            </div>
        </div>
    )
}

export default DeleteEvent