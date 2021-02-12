import React from 'react';    
import ChatFromComponent from './СhatForm';
import './style/chatComponent.css'
import { MessageModel } from './ChatContainer';
import { Menu, Dropdown } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { UserChatModel } from '../user/UserContainer';
import { RequestDeleteMessageModel } from '../../model';


interface ChatPageProps {
    submitHelper : (message: string) => void;
    chat: MessageModel[];
    deleteMessageHandler: (removingMessage: RequestDeleteMessageModel) => void; 
    editMessageHandler?: () => void;
    userId: string;
    currentChat: UserChatModel
}


 function ChatPage ({submitHelper, chat, userId, deleteMessageHandler, editMessageHandler, currentChat}: ChatPageProps): JSX.Element {
    console.log(chat);
    

    function renderChat () {
        if(chat && chat.length) {
            return chat.map((chat) => {
                if(chat.user.id !== userId){
                   return (
                    <li className="chat-message contact-message" key={chat.id}>
                        <p>
                            <span>{chat.text}</span>
                            <span>{chat.createdAt}</span>
                            <span>{chat.user.name}</span>
                        </p>
                    </li>
                   )
                    
                }
                return (
                    <li className="chat-message user-message" key={chat.id}>
                        <p>
                            <span>{chat.text}</span>
                            <span>{chat.createdAt}</span>
                            <span>{chat.user.name}</span>
                        </p>
                        <div className="dropdown">
                            <div className="dropdown-icon">
                                <DownOutlined className="iconDown"/>
                            </div>
                            <ul className="dropdown-group">
                                <li className="dropdown-item delete" onClick={() => deleteMessageHandler({chatId: currentChat.chatId, messageId: chat.id})}> <span>Delete</span> </li>
                               
                                <li className="dropdown-item edit" onClick={() => console.log('hello ')
                                }><span>Edit</span></li>
                            </ul>
                        </div>
                    </li>  
                )
            })
        }
        return <h2>Напишите привет</h2>
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