import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { UserContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';

var socket;

export default function UserChat() {

  const { username, URL } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const userId = username;
  const messagesEndRef = useRef(null); 
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  let navi= useNavigate();

  useEffect(() => {
    axios.get(`${URL}/messages/${userId}`).then(res => {
      setMessages(res.data);
      socket.emit("setup", userId);
    });
  }, []);

  useEffect(() => {
    socket = io(URL);
    socket.emit("setup", userId);
    socket.on("connected", () => {
    });
  },[])


 const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = messagesEndRef.current;
    const nearBottom = scrollHeight - scrollTop - clientHeight < 1;
    setIsUserScrolling(!nearBottom);
  };

  useEffect(() => {
    if (!isUserScrolling) {
      const chatContainer = messagesEndRef.current;
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
    // selectedChatCompare = messages;
  },[messages, isUserScrolling]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (newMessageReceived.userId === userId) {
        setMessages(prev => [...prev, newMessageReceived]);
      }
    });
  },[]);

  const sendMessage = async () => {
  if (!text) return;
  const newMsg = {
    userId,
    sender: "user",
    message: text,
  };
  setMessages(prev => [...prev, newMsg]);
  setText("");
  setIsUserScrolling(false);
  socket.emit("newmessage", newMsg);
  await axios.post(`${URL}/message`, newMsg);
};

const handleKeyPress =async (e) => {
    if (e.key === 'Enter') {
      if (!text) return;
    const newMsg = {
      userId,
      sender: "user",
      message: text,
    };
    setMessages(prev => [...prev, newMsg]);
    setText("");
    setIsUserScrolling(false);
    socket.emit("newmessage", newMsg);
    await axios.post(`${URL}/message`, newMsg);
    }
  };


    if (!userId) {
    return (
      <div>
        <div className='px-4 md:px-16 py-5 absolute text-3xl md:text-5xl text-white'>
      <i className="fa-solid fa-arrow-left-long cursor-pointer" onClick={()=>navi(-1)}></i>
    </div>
      <div className="grid min-h-screen place-items-center bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
  <div className="text-center">
    <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-6xl">Please Login To Use Chat</h1>
    <div className="mt-10 flex items-center justify-center gap-x-6">
      <button className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-lg font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer" onClick={()=>{navi("/login")}}>Login</button>
    </div>
  </div>
</div>
</div>
    );
  }


  return (
    <div >
      <div className='px-4 md:px-16 py-4 absolute text-3xl md:text-5xl'>
      <i className="fa-solid fa-arrow-left-long cursor-pointer" onClick={()=>navi(-1)}></i>
    </div>
    <div className="flex flex-col h-screen bg-gray-100 p-5">
      <h1 className="text-xl font-bold mb-3 text-center">Chat Box</h1>
      <div className="flex flex-col h-screen overflow-y-auto bg-white rounded-lg shadow p-4 space-y-2" onScroll={handleScroll} 
      ref={messagesEndRef}>
        {messages.length > 0 ? 
          messages.map((m, i) => (
            <div
              key={i}
              className={`w-fit p-2 rounded-lg ${
                m.sender === "user"
                  ? "bg-blue-500 text-gray-200 self-end"
                  : "bg-gray-200 text-gray-700 self-start"
              }`}
            >
              <div className="text-xl flex gap-1">{m.message} <p className="text-[10px] relative top-4">{m.time},</p> <span className="text-[10px] relative top-4">{m.date}</span></div>
            </div>
          ))
         :
          <p className="text-center text-gray-500 mt-5">Start the conversation!</p>
        }
        <div ref={messagesEndRef} />
      </div>
      
      <div className="mt-3 flex">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 border rounded-l-lg p-2"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded-r-lg cursor-pointer"
        >
          Send
        </button>
      </div>
    </div>
    </div>
  );
}