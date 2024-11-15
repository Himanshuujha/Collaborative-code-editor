import React, { useEffect, useRef, useState } from "react";
import Editor from "../comps/Editor";
import { initSocket } from "../socket";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ACTIONS from "../Actions";

const EditorPage = () => {
  const location = useLocation();
  const socketRef = useRef(null);
  const navigate = useNavigate();
  const { roomId } = useParams();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();

      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      const handleErrors = (err) => {
        window.alert("Connection error");
        navigate("/");
      };

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        userName: location.state?.userName,
      });

      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, userName, socketId }) => {
          if (userName !== location.state?.userName) {
            window.alert(`${userName} joined!!`);
          }
          setUsers(clients);
        }
      );

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, userName }) => {
        window.alert(`${userName} left!!`);
        setUsers((prev) =>
          prev.filter((client) => client.socketId !== socketId)
        );
      });
    };

    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
      }
    };
  }, [roomId, location.state?.userName, navigate]);

  if (!location.state) {
    return <Navigate to="/" />;
  }

  const leaveRoom = () => {
    navigate("/");
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    window.alert("Room ID copied to clipboard");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-900 text-white shadow-lg">
        <div className="p-4 border-b flex justify-center">
          <img
            src="https://cdn.iconscout.com/icon/premium/png-256-thumb/code-editor-4887853-4072389.png"
            alt="Logo"
            width={70}
          />
        </div>
        {/* Room ID display */}
        <div className="p-4 border-b text-center">
          <h2 className="text-lg font-semibold">Room ID</h2>
          <p className="text-blue-400 font-mono mt-2">{roomId}</p>
          <button
            onClick={copyRoomId}
            className="mt-2 text-sm bg-blue-500 hover:bg-blue-600 p-2 rounded"
          >
            Copy Room ID
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <h2 className="text-lg font-semibold">Connected Users</h2>
          <div className="flex flex-col gap-2 mt-4">
            {users.map((user, i) => (
              <div
                key={i}
                className="p-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
              >
                {user.userName}
              </div>
            ))}
          </div>
        </div>
        <div className="p-4">
          <button
            onClick={leaveRoom}
            className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Leave Room
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="w-3/4">
        <Editor socketRef={socketRef} roomId={roomId} />
      </div>
    </div>
  );
};

export default EditorPage;
