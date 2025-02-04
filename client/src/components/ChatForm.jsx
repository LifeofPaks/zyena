import React, { useRef, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

const ChatForm = ({ chatHistory, setChatHistory, generateBotReply }) => {
  const inputRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);
    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "" },
      ]);

      generateBotReply([...chatHistory, { role: "user", text: `Using the details provided above, please address this query: ${userMessage}` }]);
    }, 600);
  };
  return (
    <form action="#" className="chat-form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        className="message-input"
        required
      />
      <button>
        <IoIosArrowUp />
      </button>
    </form>
  );
};

export default ChatForm;
