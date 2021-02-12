import React from 'react';
import './style/userStyle.css'
import { AppState } from '../../app-state';
import { useDispatch, useSelector } from 'react-redux';
import { createNewChatAction, debounceUserSearchAction, setChatroomAction } from '../../redux/chats/store/actions';
import { addUsersChatAction, getUserInfoAction } from '../../redux/users/store/actions';
import UserComponent from './UserComponent';
import  { MessageModel } from '../chat/ChatContainer';
import { ChatTitleModel } from '../../model';

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
    chatTitle : ChatTitleModel[]; 
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
    const [mockID, setMockID] = React.useState<string>('');
    const [isChatOpen, setChatOpen] = React.useState<boolean>(false);

    const userFromSearch = useSelector<AppState, UserDataModel[]>(({chats}) => chats.users);
    const chatStatus = useSelector<AppState, string>(({chats} )=> chats.status)

    const dispatch = useDispatch(); 

    const getUsers = React.useCallback((searchValue: string) => {
        dispatch(debounceUserSearchAction({name: searchValue}))
    }, [dispatch]); 



    const isChatCreated = (chat : UserChatModel[], contactId: string ) => {
        return chat.find((chat) => {
            return chat.chatTitle.find((user) => {
                return user.userId === contactId
            })
        }); 
    }

    const getCurrentChat = (id: string): void => {
        dispatch(setChatroomAction({id}));
        if(chatStatus !== "error"){
            setChatOpen(true);
        } 
    }; 

    const createAndGetNeedChat = (contactName: {name: string, id: string}, user: UserDataModel) => {
        console.log("contact", contactName);
        console.log("user", user);        
        
        const newChat =  {
            chatId: ``,
            chatTitle: [{userName: user.name , userId: user.id}, {userName: contactName.name, userId: contactName.id}],
            messages: []
        }
        dispatch(createNewChatAction(newChat));
        // if(chatStatus === "success") setChatOpen(true);
    }

    const openChatWithUser = (contactName: {name: string, id: string}, user: UserDataModel ): void => {
         
        const getChat = isChatCreated(user.chats, contactName.id);
    
        if(getChat) {
            console.log("chat is here", getChat.chatId)
            getCurrentChat(getChat.chatId); 
        }
        else {
            createAndGetNeedChat(contactName, user)
        }
    }

    const changeUsersIDHelper = (e: any) => {
        setMockID(e.currentTarget.value)
    }

    const submitHelper = (e: any) => {
        e.preventDefault(); 
        dispatch(getUserInfoAction(
            {id: mockID}
        ))
    }

    return (
        <div className="userContainer">
            <form action="" onSubmit={submitHelper}>
                <input type="text" placeholder="User ID" value={mockID} onChange={changeUsersIDHelper}/>
            </form>

          <UserComponent userFromSearch={userFromSearch} 
                getUsers={getUsers} 
                isChatOpen={isChatOpen} 
                getCurrentChat={getCurrentChat} 
                openChatWithUser={openChatWithUser}
                createAndGetNeedChat={createAndGetNeedChat}
                />
                
        </div>
    )
}

export default React.memo( UserContainer );