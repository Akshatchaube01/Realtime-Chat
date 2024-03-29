// External styles
import "primereact/resources/themes/vela-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

// React and Socket.IO imports
import React, { useState } from "react";
import { io } from "socket.io-client";

// PrimeReact components
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Timeline } from "primereact/timeline";

// Socket.IO connection
const socket = io("http://localhost:3001");

// Event listener for socket connection
socket.on("connect", () => {
  console.log(socket.id);
});

// Main App component
function App() {
  // State variables
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { author: "Bot", message: "Chat with your friends" },
  ]);

  // Socket.IO event listener for incoming chat messages
  socket.on("chat", (arg) => setMessages([...messages, arg]));

  // Function to add a new message
  const addMessage = () => {
    const send = { author, message };
    setMessages([...messages, send]);
    socket.emit("chat", send);
    setMessage("");
  };

  // JSX structure
  return (
    <div>
      <div className="p-col-12 p-md-4">
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">
            <i className="pi pi-user"></i>
          </span>
          <InputText
            placeholder="Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <InputText
            placeholder="Chat"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button label="Send" onClick={() => addMessage()} />
        </div>
      </div>

      <div className="card">
        <h5>Conversation</h5>
        <Timeline
          value={messages}
          opposite={(item) => item.author}
          content={(item) => (
            <small className="p-text-secondary">{item.message}</small>
          )}
        />
      </div>
    </div>
  );
}

// Export the App component
export default App;
