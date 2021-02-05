import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../app-state';
import ChatContainer from '../chat/ChatContainer';
import { UserChatModel, UserDataModel } from './UserContainer';

interface UserComponentProps {
    getUsers: (searchValue: string) => void;
    userFromSearch: UserDataModel[];
    openChatWithUser: (contactName: {name: string, id: string}, user: UserDataModel ) => void; 
    isChatOpen: boolean; 
    getCurrentChat: (id: string) => void
}

 function UserComponent ({ getUsers, userFromSearch, openChatWithUser, isChatOpen, getCurrentChat}: UserComponentProps): JSX.Element {
    const userInfo = useSelector<AppState, UserDataModel>(({user}) => user.userInfo);
    const [search, setSearch] = React.useState<string>(''); 
    const debounceSearch = (e: ChangeEvent<HTMLInputElement>): void => { 
        setSearch(e.currentTarget.value);
        getUsers(e.currentTarget.value);
    }
    
    const userInfoForChat = {
        name: userInfo.name, 
        id: userInfo.id,
        isOnline: true, 
        avatar: "d"
    }

    const getChatName = (chat: UserChatModel) => {
        const name = chat.chatTitle.find((c) => {
            return c.userName !== userInfo.name
        })
        return {name: name?.userName, id: name?.userId}
    }

    const deleteChatHandler= () => {
        console.log("delete")
    }
    const addToContactHandler= () => {
        console.log("Add")
    }
    
    const renderUserChats = () =>  {
        return (
            userFromSearch && userFromSearch.length ? userFromSearch.map((contact) => {
                return  <li className="chat-body"  onClickCapture={() => userInfo !== undefined && openChatWithUser(contact, userInfo)}  key={contact.id}>
                            <p className="chat-name">{contact.name}</p>
                            <div className="chat-button-group">
                                <button className="chat-button-delete" onClickCapture={deleteChatHandler}>Delete</button>
                                <button className="chat-button-add" onClick={addToContactHandler}>Add Contact</button>
                            </div>
                        </li>
                }
            ) : userInfo.chats.map(user => {
                const userFromContacts = {
                    name: getChatName(user).name || "" , 
                    id: getChatName(user).id || ""
                };
                return (
                    <li key={user.chatId} onClickCapture={() => {openChatWithUser( userFromContacts, userInfo)}} className="chat-body">
                        <p>{getChatName(user).name}</p>
                        <div className="chat-button-group">
                            <button className="chat-button-delete" onClickCapture={deleteChatHandler}>Delete</button>
                        </div>
                    </li>
                )
            })
        )
    }

    return (
        <>
            <div className="userSidebar">

                {userInfo.name}

                <div className="user-search">
                    <input type="text" className="user-search-input" name="search" onChange={debounceSearch}  value={search} placeholder="if you want to find someone..."/>
                </div>
                <div className="user-chats">
                    <ul>
                        {renderUserChats()}
                    </ul>
                </div>
            </div>
            <div className="user-body">
                {isChatOpen && <ChatContainer userInfo={userInfoForChat}/>}
            </div>
        </>
    )
}

export default React.memo(UserComponent)