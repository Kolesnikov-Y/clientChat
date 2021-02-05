import React from 'react';
import { AppState } from '../../app-state';
import './style/chatContainer.css'
import ChatPage from './ChatPage';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import {v4 as uuidv4}  from 'uuid';

const socket = io.connect('http://10.10.4.172:3001'); 

interface UserMessageModel {
    id: string;
    name: string; 
    avatar: string; 
    isOnline: boolean
}

export  interface MessageModel {
        id: string; 
        text: string; 
        createdAt: Date;
        user: UserMessageModel
    }; 

interface ChatContainerProps {
    userInfo : UserMessageModel, 
}

function ChatContainer ({userInfo}: ChatContainerProps): JSX.Element {
const [message, setMessage] = React.useState<MessageModel>({
        id: "", 
        text: '', 
        createdAt: new Date(), 
        user: {
            id: userInfo.id, 
            name: userInfo.name,
            avatar: userInfo.avatar, 
            isOnline: userInfo.isOnline,
        },
    });
    const [chat, setChat] = React.useState<MessageModel[]>([]); 

    const currentChatId = useSelector<AppState, string | undefined >(({chats}) => chats.chatId);

    React.useEffect(() => {
        socket.on("msgToClient", (response: any): void => {
            console.log(response);
            setChat([...response.messages])
        })
      }, [])

      React.useEffect(() => {
        socket.emit('setChatToServer', currentChatId); 
        socket.on('setChatToClient', (response: MessageModel[]): void => {
            console.log("server response", response);
            setChat(response)
        })
      }, [currentChatId])

    const submitHelper = (userMessage: string) => {
        let request: MessageModel = {
            ...message, 
            id: uuidv4(),
            text: userMessage,
            createdAt: new Date(Date.now())
        }
        socket.emit('msgToServer', {payload: request}); 
        socket.on("msgToClient", (response: any): void => {
            console.log(response);
            setChat([...response.messages])
        })
    }


    return (
        <div className="chatContainer">
            <ChatPage submitHelper={submitHelper} chat={chat} />
        </div>
    )
}

export default React.memo(ChatContainer)