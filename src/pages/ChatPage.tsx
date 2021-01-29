import React, { ChangeEvent } from 'react';    


interface ChatPageProps {
    submitHelper : (message: string) => void;
    chat: string[];
}


export default function ChatPage ({submitHelper, chat}: ChatPageProps): JSX.Element {
    const [message, setMessage] = React.useState<string>('');
  
    const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setMessage(e.currentTarget.value)
    }

    const submitHandler = (e: React.FormEvent): void => {
        e.preventDefault(); 
        submitHelper(message)
        setMessage('')
    }

    // ==============================
    
    function renderChat () {
        if(chat && chat.length) {
            return chat.map((chat) => {
                return (
                    <div key={Math.random() + Math.random()}>
                        <p>{chat}</p>

                    </div>
                )
            })
        }
        return <h3>пока чатов нет</h3>
    }


    return (
        <div className="chat">
              <h2>chat will be here</h2>
                <button className="btn-connect">connect</button>

                <div className="chat-container">
                    <form action="" onSubmit={submitHandler}>
                        <input type="text" onChange={changeHandler} className="chat-input" name='message' value={message}/>
                        <button type="submit"  className="btn-sendMessage">
                            Send
                        </button>

                    </form>

                    <div className="chat-body">
                            {renderChat()}
                    </div>
                </div>

          </div>
    )
}