import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { toast } from 'react-toastify';
import { scanQr } from '../../../api/ticket';

const ScanTicket = ({ openModal, setOpenModal }) => {
    const [scanResult, setScanResult] = useState(null);
    const [error, setError] = useState(null);
    const html5QrCode = useRef(null);

    // Function to handle the QR scanning and API call
    const handleQrScan = async (decodedText) => {
        try {
            setScanResult(decodedText);
            const url = new URL(decodedText);
            const params = new URLSearchParams(url.search);

            const codeId = params.get("codeId");
            const eventId = params.get("eventId");

            // if (!codeId || !eventId) {
            //     toast.error("Invalid QR.");
            //     return; // Exit early if QR code is invalid
            // }

            const response = await scanQr({ code_id: codeId, event_id: eventId });
            console.log("response: " + response);

            if (!response.success) {
                console.error("Error scan:", response.success);
                toast.error(response?.message);
                return;
            }

            toast.success(response?.message);
        } catch (error) {
            console.error("Error processing QR scan:", error);
            toast.error("Something went wrong while processing the QR.");
        }
    };

    const initializeScanner = async () => {
        if (!openModal) return;

        try {
            // Clear any existing instance
            if (html5QrCode.current) {
                await html5QrCode.current.clear();
                html5QrCode.current = null;
            }

            html5QrCode.current = new Html5Qrcode("reader");
            const devices = await Html5Qrcode.getCameras();

            if (devices && devices.length > 0) {
                const config = {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                };

                await html5QrCode.current.start(
                    { facingMode: "environment" },
                    config,
                    (decodedText) => {
                        setScanResult(decodedText);
                        handleQrScan(decodedText); // Handle the scan result
                        if (html5QrCode.current?.isScanning) {
                            html5QrCode.current.stop()
                            // .then(() => {
                            //     toast.success("QR Code scanned successfully!");
                            // })
                            // .catch(console.error);
                        }
                    },
                    (errorMessage) => {
                        setError("Scanning...");
                    }
                );
            } else {
                setError("No cameras found!");
            }
        } catch (err) {
            console.error("Error initializing scanner:", err);
            setError("Failed to start scanner. Please make sure camera permissions are granted.");
        }
    };

    const cleanup = async () => {
        if (html5QrCode.current) {
            try {
                if (html5QrCode.current.isScanning) {
                    await html5QrCode.current.stop();
                }
                await html5QrCode.current.clear();
                html5QrCode.current = null;
            } catch (err) {
                console.error("Error during cleanup:", err);
            }
        }
    };

    useEffect(() => {
        initializeScanner();
        return () => {
            cleanup();
        };
    }, [openModal]);

    const resetScanner = async () => {
        setScanResult(null);
        setError(null);
        await cleanup();
        await initializeScanner();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">QR Code Scanner</h1>

                <div
                    id="reader"
                    className="w-full h-64 mb-4 overflow-hidden rounded-lg"
                ></div>

                {scanResult && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg">
                        <button
                            onClick={resetScanner}
                            className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Scan Another Code
                        </button>
                    </div>
                )}
                {error && (
                    <p className="text-center text-gray-600 mt-2">
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ScanTicket;