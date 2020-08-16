const Message = ({ message: { user, text }, name }) => {
    const sender = user.trim().toLowerCase();
    return <div>
        {
            sender === name
                ?
                <>
                    <strong>{text}- <span>{sender}</span></strong>

                </>
                :
                <>
                    <p>{text}- <span>{sender}</span></p>

                </>
        }
    </div>
}

export default Message;