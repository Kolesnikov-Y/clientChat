import React from 'react'
import ChatPage from './ChatPage'
import io from 'socket.io-client';

const socket = io.connect('http://10.10.4.172:3001'); 

export  interface MessageInterface {
    message: string; 
    date: Date; 
    userId: string;
    userName: string; 
} 

function ChatContainer () {
    const [message, setMessage] = React.useState<MessageInterface>({ message: '', date: new Date(), userId: '9a2b0d5e-4888-47d3-836a-b82df580614b', userName: "John"}); 
    const [chat, setChat] = React.useState<string[]>([])

   React.useEffect(()=> {
       socket.on("msgToClient", (chatMessage: {payload: string}): void => {
        setChat([...chat, chatMessage.payload])
    })
   }, [])

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