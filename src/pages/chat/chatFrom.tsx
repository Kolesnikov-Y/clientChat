import React, { ChangeEvent } from 'react'

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
        if(!message)  {
            return false
        }else {
            submitHelper(message)
            setMessage('')
        } 
    }


    return (
        <form action="" onSubmit={submitHandler}>
            <input type="text" onChange={changeHandler} className="chat-input" name='message' value={message}/>
            <button type="submit"  className="btn-sendMessage">
                Send
            </button>
        </form>
    )
}

export default React.memo(ChatFromComponent); 