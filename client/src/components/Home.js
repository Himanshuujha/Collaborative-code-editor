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
            window.alert('ROOMID or Username Missing');
            return;
        }

        navigate(`/editor/${roomId}`, {
            state: { userName },
        });
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg border rounded-lg">
            <div className="flex justify-center mb-4">
                <img
                    src="https://cdn.iconscout.com/icon/premium/png-256-thumb/code-editor-4887853-4072389.png"
                    alt="Code Editor Icon"
                    width={50}
                />
            </div>
            <h1 className="text-2xl font-semibold text-center mb-4">Join a Room</h1>
            <input
                placeholder="ROOM ID"
                className="block w-full bg-gray-200 p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
            />
            <input
                placeholder="Username"
                className="block w-full bg-gray-200 p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <button
                onClick={joinRoom}
                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
                Join Room
            </button>
            <div className="mt-4 text-center">
                <a
                    onClick={newRoom}
                    className="text-blue-500 hover:underline cursor-pointer"
                >
                    Create a New Room
                </a>
            </div>
        </div>
    );
};

export default Home;
