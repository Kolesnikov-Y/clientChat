import { AppState } from '../app-state';
import React from 'react'
import ChatPage from './ChatPage'
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

const socket = io.connect('http://10.10.4.172:3001'); 

export  interface MessageModel {
    message: {
        id: number; 
        text: string; 
        createdAt: Date;
        user: {
            id: string;
            name: string; 
            avatar: string; 
            isOnline: boolean
        }
    }; 
} 


function ChatContainer () {
    // const [message, setMessage] = React.useState<MessageInterface>({ message: '', date: new Date(), userId: '9a2b0d5e-4888-47d3-836a-b82df580614b', userName: "John"}); 
    const [chat, setChat] = React.useState<string[]>([]); 

    const currentChat = useSelector<AppState, string | undefined >(({chats}) => chats.chatId)
    console.log(currentChat);
    

      socket.emit('connection', { chatroomName: currentChat });
      socket.on("connection", (response: any): void => {
        setChat(response)
      });

    React.useEffect(() => {
        socket.on("msgToClient", (chatMessage: {payload: string}): void => {
            setChat([...chat, chatMessage.payload])
        })
    });

    const submitHelper = (message: string) => {
        socket.emit('msgToServer', {payload: message})
    }

    return (
        <ChatPage submitHelper={submitHelper} chat={chat}/>
    )
}

export default React.memo(ChatContainer)