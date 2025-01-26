import { useRouter } from 'next/router';
import React from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

const RemoveCollaborator = ({ setOpenModal, user, eventId, handleRemoveCollab }) => {
    const handleRemove = async () => {
        handleRemoveCollab(eventId,user._id);
    }
    return (
        <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to Remove {user?.name} from Collaboration
            </h3>
            <div className="flex justify-center gap-4">
                <button color="red" onClick={handleRemove}>
                    {"Yes, I'm sure"}
                </button>
                <button color="gray" onClick={() => setOpenModal(false)}>
                    No, Cancel
                </button>
            </div>
        </div>
    )
}

export default RemoveCollaborator