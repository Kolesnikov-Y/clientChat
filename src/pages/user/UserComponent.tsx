import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../app-state';
import ChatContainer from '../ChatContainer';
import { UserDataModel } from './UserContainer';

interface UserComponentProps {
    getUsers: (searchValue: string) => void;
    userFromSearch: UserDataModel[];
    openChatWithUser: (contactName: {name: string, id: string}, user: UserDataModel ) => void; 
    isChatOpen: boolean
}

 function UserComponent ({ getUsers, userFromSearch, openChatWithUser, isChatOpen}: UserComponentProps): JSX.Element {
    const userInfo = useSelector<AppState, UserDataModel | undefined>(({user}) => user.userInfo);
    const [search, setSearch] = React.useState<string>(''); 

    const debounceSearch = (e: ChangeEvent<HTMLInputElement>): void => {
        setSearch(e.currentTarget.value);
        getUsers(e.currentTarget.value);
    }
   
    const renderUserContacts = () =>  {
        return (
            userFromSearch && userFromSearch.length ? userFromSearch.map((contact) => {
                return  <li className="chat-body"  onClick={() => userInfo !== undefined && openChatWithUser(contact, userInfo)}  key={contact.id}>
                        <div className="chat-name">{contact.name}</div>
                    </li>
            }) : <h2>контактов пока нет !</h2>
        )
    }


    return (
        <>
        {/* <div className="helloUser">
            hello, {userInfo?.name}
        </div> */}
            <div className="userSidebar">
                <div className="user-search">
                    <input type="text" className="user-search-input" name="search" onChange={debounceSearch}  value={search} placeholder="if you want to find someone..."/>
                </div>
                <div className="user-chats">
                    <ul>
                        {renderUserContacts()}
                    </ul>
                </div>
            </div>
            <div className="user-body">
                {isChatOpen && <ChatContainer/>}
            </div>
        </>
    )
}

export default React.memo(UserComponent)