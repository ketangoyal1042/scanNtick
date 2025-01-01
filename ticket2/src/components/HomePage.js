import React from 'react'
import { QrCode, Calendar, Users, Shield, Globe, BarChart } from 'lucide-react';
const HomePage = () => {
    const features = [
        {
            icon: <QrCode className="w-8 h-8 text-purple-600" />,
            title: 'Dynamic QR Codes',
            description: 'Generate unique QR codes for each event that update in real-time'
        },
        {
            icon: <Calendar className="w-8 h-8 text-purple-600" />,
            title: 'Event Management',
            description: 'Easily create and manage multiple events from one dashboard'
        },
        {
            icon: <Users className="w-8 h-8 text-purple-600" />,
            title: 'Attendee Tracking',
            description: 'Monitor attendance and engage with your participants'
        },
        {
            icon: <Shield className="w-8 h-8 text-purple-600" />,
            title: 'Secure Check-in',
            description: 'Encrypted QR codes ensure secure and reliable check-ins'
        },
        {
            icon: <Globe className="w-8 h-8 text-purple-600" />,
            title: 'Virtual Events',
            description: 'Support for both in-person and virtual event management'
        },
        {
            icon: <BarChart className="w-8 h-8 text-purple-600" />,
            title: 'Analytics',
            description: 'Comprehensive insights and attendance analytics'
        }
    ];
    return (
        <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500 opacity-10"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
                        Host Events with <span className="text-purple-600">QR Magic</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                        Create, manage, and track your events effortlessly with our QR-based event management platform.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                            Create Event
                        </button>
                        <button className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Everything You Need for Successful Events
                        </h2>
                        <p className="text-xl text-gray-600">
                            Powerful features to make your event management seamless
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage