import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';
import { UserContext } from "../Context/Context";

var socket;

export default function AdminChat() {

  let {URL}=useContext(UserContext);

  let navi= useNavigate();
  
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  let [userId,setuserId]=useState([]);
  let[sender,setsender]=useState([])
  let[unreadcount,setunreadcount]=useState(0);
  
  
  useEffect(() => {
    axios.get(`${URL}/chatusers`)
    .then(res => {
      setUsers(res.data);
      socket.emit("setup", "admin");
    })
    .catch(err => {
        console.error(err);
    });

  },[]);

  useEffect(() => {
    socket = io(URL);
    socket.emit("setup", "admin");
  },[])

  useEffect(()=>{
    socket.on("message received", (newMessageReceived) => {
      if (newMessageReceived.sender === "user") {
        setMessages(prev => [...prev, newMessageReceived]);

        setUsers(prevUsers => {
        const userId = newMessageReceived.userId;
        const filtered = prevUsers.filter(u => u !== userId);
        return [userId, ...filtered];
      });
      }
    });
  },[])


  const loadMessages = async (userId) => {

    setActiveUser(userId);
    const res = await axios.get(`${URL}/messages/${userId}`);
    setMessages(res.data);

    try {
      await axios.put(`${URL}/markasread/${userId}`);
      setunreadcount(0);
    } catch (err) {
      console.log("Error marking messages as read:", err);
    }
  };


  useEffect(() => {
    let res= async () => {
      if (activeUser) {
        const response = await axios.get(`${URL}/messages/${activeUser}`);
        setMessages(response.data);
      }
    }
    res();
  },[users]); 

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
  },[messages, isUserScrolling]);

  const sendMessage = async () => {
  if (!text || !activeUser) return;
  const newMsg = {
    userId: activeUser,
    sender: "admin",
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
      if (!text || !activeUser) return;
  const newMsg = {
    userId: activeUser,
    sender: "admin",
    message: text,
  };
  setMessages(prev => [...prev, newMsg]);
  setText("");
  setIsUserScrolling(false);
  socket.emit("newmessage", newMsg);
  await axios.post(`${URL}/message`, newMsg);
    }
  };

  // Get unread messages count
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await axios.get(`${URL}/unreadcount/sender`);
        setunreadcount(response.data.unreadCount);
        setuserId(response.data.userId);
        setsender(response.data.sender)
       
      } catch (error) {
        console.error("Error fetching unread count:", error);
      }
    };

    fetchUnreadCount();
  }, [messages]);
  

  return (
    <div >
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r shadow-md overflow-y-auto">

      <div className='flex text-4xl border-b justify-around items-center px-1 md:px-5'>
      <i className="fa-solid fa-arrow-left-long cursor-pointer" onClick={()=>navi(-1)}></i>
        <h2 className="text-xl font-semibold p-4 ">Chats</h2>
        {unreadcount>0 && <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">{unreadcount}</span>}
     </div>
     <div className={`flex flex-col`}>
        {users.map((user, i) => (
          <div
            key={i}
            className={`p-3 flex cursor-pointer hover:bg-gray-200 border-b border-gray-400 ${activeUser === user ? "bg-gray-300" : ""}`}
            onClick={() => {loadMessages(user)}}
          >
            <p className="font-medium">{user.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</p>
            {userId.length>0 && userId.includes(user) && sender.includes("user") &&  <span className="ml-auto bg-green-500 text-white text-xs font-normal sm:font-bold text-center px-2 py-1 rounded-full">New Messages</span>}
          </div>
        ))}
      </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        {activeUser ? (
          <>
            <div className="p-4 border-b bg-white">
              <h2 className="text-lg font-bold">Chat with {activeUser}</h2>
            </div>

              <div />
              <div />
            <div className="flex flex-col h-screen overflow-y-auto p-4 space-y-2" onScroll={handleScroll} ref={messagesEndRef}>
              {messages.length>0? messages.map((m, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg w-fit ${
                    m.sender === "admin"
                      ? "ml-auto bg-green-500 text-gray-200"
                      : "mr-auto bg-gray-200 text-gray-700"
                  }`}
                >
                  <div className="text-xl flex gap-1">{m.message} <p className="text-[10px] relative top-4">{m.time},</p> <span className="text-[10px] relative top-4">{m.date}</span></div>
                </div>
              )): <p className="text-gray-500">No messages yet.</p>}
              <div />
            </div>

            <div className="p-3 flex border-t bg-white">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 border rounded-l-lg p-2"
              />
              <button
                onClick={sendMessage}
                className="bg-green-600 text-white px-4 rounded-r-lg cursor-pointer"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
    </div>
  );
}