import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');

    const newRoom = (e) => {
        e.preventDefault();
        const id = uuidv4();
        setRoomId(id);
    };

    const joinRoom = () => {
        if (!roomId || !userName) {
            window.alert('ROOM ID or Username Missing');
            return;
        }

        navigate(`/editor/${roomId}`, {
            state: { userName },
        });
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Navbar */}
            <nav className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg">
                <div className="container mx-auto px-4 py-3 flex justify-center items-center">
                    <h1 className="text-white text-2xl font-bold">
                        Code Collaboration App
                    </h1>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-lg mx-auto p-8 bg-white shadow-lg border rounded-lg">
                    <div className="flex justify-center mb-4">
                        <img
                            src="https://cdn.iconscout.com/icon/premium/png-256-thumb/code-editor-4887853-4072389.png"
                            alt="Code Editor Icon"
                            width={50}
                        />
                    </div>
                    <h1 className="text-2xl font-semibold text-center mb-6">Join a Room</h1>
                    <input
                        placeholder="ROOM ID"
                        className="block w-full bg-gray-200 p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                    />
                    <input
                        placeholder="Username"
                        className="block w-full bg-gray-200 p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <button
                        onClick={joinRoom}
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Join Room
                    </button>
                    <div className="mt-6 text-center">
                        <a
                            onClick={newRoom}
                            className="text-blue-500 hover:underline cursor-pointer"
                        >
                            Create a New Room
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-4">
                <div className="container mx-auto text-center">
                    <p className="text-sm">&copy; 2025 Code Collaboration App. All rights reserved.</p>
                    <p className="text-xs">
                        Built with ❤️ by <span className="font-semibold">Your Team</span>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
