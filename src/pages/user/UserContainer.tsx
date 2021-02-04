import { AppState } from '../../app-state';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chatroomConnectedAction, chatroomDisconnectedAction, createNewChatAction, debounceUserSearchAction, setChatroomAction } from '../../redux/chats/store/actions';
import UserComponent from './UserComponent';
import './style/userStyle.css'
import ChatContainer, { MessageModel } from '../ChatContainer';
import { changeUserDataAction, getUserInfoAction } from '../../redux/users/store/actions';

export  interface UserDataModel {
    name: string; 
    email: string; 
    gender: string; 
    id: string; 
    phone: string; 
    chats: UserChatModel[]; 
    contacts: UserContactsModel[];
    age: number;
} 

export interface UserChatModel {
    chatId: string; 
    chatTitle : {
        userName: string; 
        userId: string;
    }[]; 
    messages: MessageModel[]
}

export interface UserContactsModel {
    name: string; 
    phone: string; 
    id: string; 
    gender: string; 
    age: string; 
}

 function UserContainer (): JSX.Element {

    const molID: string = `9a2b0d5e-4888-47d3-836a-b82df580614b`;
    const [isChatOpen, setChatOpen] = React.useState<boolean>(false);

    const userFromSearch = useSelector<AppState, UserDataModel[]>(({chats}) => chats.users);
    const chatStatus = useSelector<AppState, string>(({chats} )=> chats.status)

    const dispatch = useDispatch()

    React.useEffect( () => {
        dispatch(getUserInfoAction(
            {id: molID}
        ))
    }, []);

    const getUsers = React.useCallback((searchValue: string) => {
        dispatch(debounceUserSearchAction({name: searchValue}))
    }, [dispatch]); 

    const getCurrentChat = React.useCallback((id: string) => {
        dispatch(setChatroomAction({id}));
        if(chatStatus !== "error") setChatOpen(true);
    }, [dispatch]); 

    const createAndGetNeedChat = (contactName: {name: string, id: string}, user: UserDataModel) => {
        const newChat =  {
            chatId: `${contactName.id}.${user.id}`,
            chatTitle: [{userName: contactName.name, userId: contactName.id},
            {userName: user.name , userId: user.id}],
            messages: []
        }
        dispatch(createNewChatAction(newChat)); 
        dispatch(changeUserDataAction({email: user.email, changeFields: {chats: [...user.chats, newChat]}}));
        if(chatStatus === "success") setChatOpen(true);
    }

    const isChatCreated = (chat : UserChatModel[], contactId: string ) => {
        return chat.find((chat) => {
            return chat.chatTitle.find((user) => {
                return user.userId === contactId
            })
        }); 
    }

    const openChatWithUser = (contactName: {name: string, id: string}, user: UserDataModel ) => {
         
        const getChat = isChatCreated(user.chats, contactName.id);
    
        if(getChat) {
            console.log("chat is here")
            getCurrentChat(getChat.chatId); 
        }
        else {
            createAndGetNeedChat(contactName, user)
        }
    }

    return (
        <div className="userContainer">
          <UserComponent userFromSearch={userFromSearch} getUsers={getUsers} isChatOpen={isChatOpen} getCurrentChat={getCurrentChat} openChatWithUser={openChatWithUser}/>
        </div>
    )
}

export default React.memo( UserContainer );