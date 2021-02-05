import React from 'react';    
import ChatFromComponent from './СhatForm';
import './style/chatComponent.css'
import { MessageModel } from './ChatContainer';



interface ChatPageProps {
    submitHelper : (message: string) => void;
    chat: MessageModel[];
    disconnectClient?: () => void; 
    connectClient?: () => void;
}


 function ChatPage ({submitHelper, chat}: ChatPageProps): JSX.Element {
    
    function renderChat () {
        if(chat && chat.length) {
            return chat.map((chat) => {
                return (
                    <li className="chat-message" key={Math.random() + Math.random()}>
                        <p>{chat.text}</p>
                    </li>  
                )
            })
        }
        return <h2>Нужно выбрать чат для общения ) </h2>
    }

    return (
            <div className="chat-container">
                <ul className="chat">
                    {renderChat()}
                </ul>
                <ChatFromComponent submitHelper={submitHelper}/>
            </div>
    )
}
 
export default ChatPage