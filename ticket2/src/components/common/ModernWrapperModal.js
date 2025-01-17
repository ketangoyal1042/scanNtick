import { Modal } from 'flowbite-react'
import React from 'react'

const ModernWrapperModal = ({ children, openModal, setOpenModal }) => {
    return (
        <div>
            <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} >
                <Modal.Header />
                <Modal.Body>
                    {children}
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ModernWrapperModal