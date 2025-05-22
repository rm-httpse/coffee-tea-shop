"use client";

import { BsFillChatHeartFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";

const ChatBot = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById("footer");
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;
        setIsVisible(footerTop > viewportHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to handle sending messages
  const sendMessage = () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput(""); // Clear input field

    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: botResponse }]);
    }, 1000); // Simulate bot response delay
  };

  // Basic chatbot responses
  const getBotResponse = (userText) => {
    const lowerText = userText.toLowerCase();
    if (lowerText.includes("hello") || lowerText.includes("hi")) return "Hi there! How can I help you?";
    if (lowerText.includes("help")) return "Sure! What do you need help with?";
    if (lowerText.includes("thank")) return "You're welcome!";
    return "I'm not sure how to respond to that, but I'm here to help!";
  };

  return (
    <>
      {/* Chatbot Button - Toggles Open/Close */}
      {isVisible && (
        <div
          className="fixed bottom-5 right-5 bg-[#333333] px-3 py-1.5 rounded-full flex items-center shadow-lg z-50 hover:scale-125 cursor-pointer transition-all"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsOpen(!isOpen)} // Toggle Chat Window
        >
          {isOpen ? (
            <IoMdClose className="w-7 h-7 text-white" /> // Close Icon
          ) : isHovered ? (
            <span className="text-white text-sm">What can I help you?</span>
          ) : (
            <BsFillChatHeartFill className="w-7 h-7 text-white" /> // Chat Icon
          )}
        </div>
      )}

      {/* Chatbot Popup */}
      {isOpen && (
        <div className="fixed bottom-16 right-5 w-80 bg-white opacity-90 shadow-lg rounded-lg p-4 z-50">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-semibold">Chatbot</h2>
          </div>

          {/* Chat Content */}
          <div className="h-110 overflow-y-auto p-2 flex flex-col space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-center ${msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                {msg.sender === "bot" && <img src="/images/chatbot.svg" className="w-8 h-8 mr-2" />}
                <p
                  className={`px-3 py-2 rounded-lg ${msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                    }`}
                >
                  {msg.text}
                </p>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="border-t pt-2 flex items-center gap-2">
            <input
              type="text"
              className="flex-1 p-2 border rounded"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="bg-[#333333] text-white px-3 py-2 rounded" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
