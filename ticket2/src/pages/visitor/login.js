'use client';

import { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import api from '../../../axiosConfig';
import { toast } from 'react-toastify';
import { sendOpt, verifyOtp } from '../../../api/auth';
import { setVisitor } from '@/store/slices/visitorSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

export default function Login() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        let interval;
        if (isOtpSent && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        setCanResend(true);
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isOtpSent, timer]);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        // Add your OTP sending logic here
        const response = await sendOpt({ "email": email });
        setMessage(response?.message);
        setIsOtpSent(true);
        toast.success(response?.message);
        setTimer(60);
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        console.log('Verifying OTP:', otp.join(''));
        const response = await verifyOtp({ "email": email, "otp": otp.join('') });
        const { user, token, message } = response;
        dispatch(setVisitor({ user, token }));
        if (response.success) {
            toast.success(message);
            router.push("/");
        }
        else {
            toast.error(response?.message);
        }
        setMessage(response?.message);
    };

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return; // Only allow single digit
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value !== '' && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="w-full max-w-md">
                <div className="bg-white px-8 py-10 rounded-2xl shadow-lg">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                        <p className="text-gray-600">Sign in to continue</p>
                    </div>

                    <form onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 bg-white"
                                    placeholder="Enter your email"
                                    required
                                    disabled={isOtpSent && !canResend}
                                />
                            </div>
                        </div>

                        {isOtpSent && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Enter OTP
                                    </label>
                                    <div className="flex justify-center gap-2">
                                        {otp.map((digit, index) => (
                                            <input
                                                key={index}
                                                id={`otp-${index}`}
                                                type="text"
                                                inputMode="numeric"
                                                pattern="[0-9]"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        ))}
                                    </div>
                                    <p className="text-center text-sm text-gray-600 mt-2">
                                        {timer > 0 ? (
                                            `Resend OTP in ${timer}s`
                                        ) : (
                                            <>
                                                You can now resend OTP{' '}
                                                <span onClick={handleSendOtp} className="text-blue-600 cursor-pointer underline">
                                                    Resend
                                                </span>
                                            </>
                                        )}
                                    </p>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isOtpSent && otp.join('').length !== 6}
                        >
                            {isOtpSent ? (otp.join('').length === 6 ? 'Verify OTP' : 'Resend OTP') : 'Send OTP'}
                        </button>
                    </form>

                    {isOtpSent && (
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                {message}
                            </p>
                        </div>
                    )}
                </div>
            </div >
        </div >
    );
}