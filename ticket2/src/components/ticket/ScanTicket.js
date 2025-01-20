import { Modal } from 'flowbite-react'
import React, { useState } from 'react'
import BarcodeScannerComponent from "react-qr-barcode-scanner";
// import { scanQr } from '../../../api/ticket.js';

const ScanTicket = ({ openModal, setOpenModal }) => {
    const [scanResult, setScanResult] = useState(null);
    const [error, setError] = useState(null);


    const handleScan = async (result) => {
        if (result) {
            setScanResult(result.text);
            console.log("Scan result", result.text);

            // const response = await scanQr(result.text);
            if (response.success) {
                toast("QR Scanned Successfully");
            }
        }
    };

    const handleError = (err) => {
        console.error(err);
        setError("Error scanning the QR code. Please try again.");
    };

    return (
        <div className="scanner-container">
            <h1>QR Code Scanner</h1>
            <div style={{ width: "300px", height: "300px" }}>
                <BarcodeScannerComponent
                    onUpdate={(err, result) => {
                        if (result) handleScan(result);
                        else if (err) handleError(err);
                    }}
                    constraints={{ facingMode: "environment" }}
                    style={{ width: "100%" }}
                />
            </div>
            {scanResult && (
                <div>
                    <h3>QR Scanned, Please Wait..</h3>
                </div>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )
}

export default ScanTicket