import React from 'react';
import './style/chatContainer.css'
import ChatPage from './ChatPage';
import io from 'socket.io-client';
import {v4 as uuidv4}  from 'uuid';
import { useDispatch } from 'react-redux';
import { deleteMessageAction } from '../../redux/chats/store/actions';
import { RequestDeleteMessageModel } from '../../model';

export const socket = io.connect('http://10.10.4.172:3001'); 

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
    chatInfo: any
}

function ChatContainer ({userInfo, chatInfo}: ChatContainerProps): JSX.Element {

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

    const dispatch = useDispatch(); 
     // socket.on('JoinedToChatroom', (response: {messages: MessageModel[], chatId: string} ): void => {
        //     console.log("server response", response);
        //     setChat([...response.messages]);
        // })

    React.useEffect(() => {
        setChat(chatInfo.messages);
        socket.emit('JoinToChatroom', chatInfo.chatId)
        socket.on("msgToClient", (response: any): void => {
            setChat([...response.messages])
        })
    }, [])

    React.useEffect(() => {
        setChat(chatInfo.messages);
        socket.emit('JoinToChatroom', chatInfo.chatId);
        socket.on("msgToClient", (response: any): void => {
            setChat([...response.messages]);
        })
         // return () => {  // это когда будет выполняться когда страница перерисовывается 
        // // socket.emit('leaveCurrentChatroom' , {chatId})
        // }
    }, [chatInfo])

    const submitHelper = (userMessage: string) => {
        let request: MessageModel = {
            ...message, 
            id: uuidv4(),
            text: userMessage,
            createdAt: new Date(Date.now())
        }
        socket.emit('msgToServer', {payload: request, chatId: chatInfo.chatId}); 
    }

    const deleteMessageHandler = React.useCallback((removingMessage: RequestDeleteMessageModel) => {
        socket.emit('RequestDeleteChatMessage', removingMessage); 
        socket.on("ResponseDeleteChatMessage", (response: any) => {
            console.log(response);
            
        })
        // dispatch(deleteMessageAction(removingMessage))
    }, [dispatch]); 



    return (
        <div className="chatContainer">
            <ChatPage submitHelper={submitHelper} currentChat={chatInfo} chat={chat} userId={userInfo.id} deleteMessageHandler={deleteMessageHandler}/>
        </div>
    )
}

export default React.memo(ChatContainer)