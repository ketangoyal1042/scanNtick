import { Modal } from 'flowbite-react'
import React from 'react'

const ScanTicket = ({ openModal, setOpenModal }) => {
    console.log(openModal);

    return (
        <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
            <Modal.Header />
            <Modal.Body>
                <div>
                    <h1>SCAN ME!!</h1>
                </div>
            </Modal.Body>
        </Modal >
    )
}

export default ScanTicket