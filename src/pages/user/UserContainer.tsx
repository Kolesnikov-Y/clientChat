import { AppState } from '../../app-state';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewChatAction, debounceUserSearchAction, setChatroomAction } from '../../redux/chats/store/actions';
import UserComponent from './UserComponent';
import './style/userStyle.css'
import  { MessageModel } from '../ChatContainer';
import { addUsersChatAction, getUserInfoAction } from '../../redux/users/store/actions';
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
    // const mockID: string = `9a2b0d5e-4888-47d3-836a-b82df580614b`;
    const [isChatOpen, setChatOpen] = React.useState<boolean>(false);

    const userFromSearch = useSelector<AppState, UserDataModel[]>(({chats}) => chats.users);
    const chatStatus = useSelector<AppState, string>(({chats} )=> chats.status)

    const dispatch = useDispatch(); 

    const getUsers = React.useCallback((searchValue: string) => {
        dispatch(debounceUserSearchAction({name: searchValue}))
    }, [dispatch]); 

    const getCurrentChat = (id: string): void => {
        dispatch(setChatroomAction({id}));
        if(chatStatus !== "error") setChatOpen(true);
    }; 

    const createAndGetNeedChat = (contactName: {name: string, id: string}, user: UserDataModel) => {
        const newChat =  {
            chatId: `${contactName.id}.${user.id}`,
            chatTitle: [{userName: contactName.name, userId: contactName.id},
            {userName: user.name , userId: user.id}],
            messages: []
        }


        dispatch(createNewChatAction(newChat)); 
        dispatch(addUsersChatAction(newChat));
        if(chatStatus === "success") setChatOpen(true);
    }

    const isChatCreated = (chat : UserChatModel[], contactId: string ) => {
        return chat.find((chat) => {
            return chat.chatTitle.find((user) => {
                return user.userId === contactId
            })
        }); 
    }

    const openChatWithUser = (contactName: {name: string, id: string}, user: UserDataModel ): void => {
         
        const getChat = isChatCreated(user.chats, contactName.id);
    

        if(getChat) {
            console.log("chat is here")
            getCurrentChat(getChat.chatId); 
        }
        else {
            createAndGetNeedChat(contactName, user)
        }
    }

    // TEST

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

          <UserComponent userFromSearch={userFromSearch} getUsers={getUsers} isChatOpen={isChatOpen} getCurrentChat={getCurrentChat} openChatWithUser={openChatWithUser}/>
        </div>
    )
}

export default React.memo( UserContainer );