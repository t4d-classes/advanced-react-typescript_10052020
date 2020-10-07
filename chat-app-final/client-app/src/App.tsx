import React from "react";

import { useChatsStore } from "./useChatsStore";

import "./App.css";

export function App() {
  const { messages, message, messageChange, sendMessage } = useChatsStore();

  return (
    <>
      <ul>
        {messages.map((m) => (
          <li key={m.id}>{m.message}</li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input value={message} onChange={messageChange} />
        <button>Send</button>
      </form>
    </>
  );
}
