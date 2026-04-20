import { useState } from 'react';
import { useSocket } from './useSocket';

export default function Chat() {
  const { messages, sendMessage } = useSocket();
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input, 'Yash');
    setInput('');
  };

  return (
    <div>
      <h2>💬 Chat App</h2>

      {/* Messages */}
      <div style={{ height:'400px', overflowY:'scroll', border:'1px solid #ccc', padding:'10px' }}>
        {messages.map((msg) => (
          <div key={msg.id}>
            <b>{msg.user}:</b> {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}