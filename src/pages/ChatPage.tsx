import React, { ChangeEvent } from 'react';    
import ChatFromComponent from './chat/chatFrom';
import { MessageModel } from './ChatContainer';
import { UserChatModel } from './user/UserContainer';


interface ChatPageProps {
    submitHelper : (message: string) => void;
    chat: MessageModel[];
    disconnectClient?: () => void; 
    connectClient?: () => void;
}


 function ChatPage ({submitHelper, chat}: ChatPageProps): JSX.Element {
    // ==============================
    
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
        return null
    }

    return (
            <div className="chat-container">
                <ChatFromComponent submitHelper={submitHelper}/>
                <ul className="chat">
                    {renderChat()}
                </ul>
            </div>
    )
}
 
export default ChatPage