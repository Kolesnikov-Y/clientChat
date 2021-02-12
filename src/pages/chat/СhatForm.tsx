import React, { ChangeEvent } from 'react'; 
import './style/chatForm.css'
import { LeftCircleOutlined } from '@ant-design/icons';


interface ChatFormProps {
    submitHelper: (message: string) => void;
}

 function ChatFromComponent ({submitHelper}: ChatFormProps): JSX.Element {
    const [message, setMessage] = React.useState<string>('');
  
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.currentTarget.value);
    }

    const submitHandler = (e: React.FormEvent)=> {
        e.preventDefault(); 
        if(!message || !message.trim())  {
            return false
        } else {
            submitHelper(message)
            setMessage('')
        } 
    }

    return (
        <form className="chat-form" id="chat-form" action="" onSubmit={submitHandler}>
            <input type="text" onChange={changeHandler} className="chat-input" placeholder='message...' name='message' value={message}/>
            <button type="submit"  className="btn-sendMessage">
                <LeftCircleOutlined className="sendMessage-icon"/>
            </button>
        </form>
    )
}

export default React.memo(ChatFromComponent); 