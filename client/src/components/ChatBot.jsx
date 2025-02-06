import React, { useEffect, useRef, useState } from "react";
import ChatIcon from "./ChatIcon";
import { IoIosArrowDown } from "react-icons/io";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import { BsFillChatRightFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { businessInfo } from "../config/businessInfo";

const ChatBot = () => {
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat:true,
      role: "model",
      text: businessInfo
    }
  ]);
  const [showChatBot, setShowChatBot] = useState(false);

  const chatBodyRef = useRef();

  const generateBotReply = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== ""),
        { role: "model", text, isError },
      ]);
    };

    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contents: history }),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        requestOptions
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message || "Something went wrong!");
      }
      const apiRespnseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      updateHistory(apiRespnseText);
    } catch (error) {
      updateHistory(error.message, true);
    }
  };

  useEffect(() => {
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

  return (
    <div className={`container ${showChatBot ? "show-chatbot": ""}`}>
      <button id="chatbot-toggler" onClick={() => setShowChatBot(prev => !prev)}>
        <span>
          <BsFillChatRightFill />
        </span>
        <span>
          <IoClose />
        </span>
      </button>
      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <ChatIcon />
            <h1 className="logo-text">Zyena</h1>
          </div>
          <button onClick={() => setShowChatBot(prev => !prev)}>
            <IoIosArrowDown />
          </button>
        </div>
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatIcon />
            <p className="message-text">
              Hey there 👋 <br /> How can i help you today?
            </p>
          </div>
          {chatHistory.map((chat, index) => (
            <ChatMessage chat={chat} key={index} />
          ))}
        </div>
        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotReply={generateBotReply}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
