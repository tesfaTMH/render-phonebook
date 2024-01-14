export const SuccessNotification = ({ message }) => {
    if (message === null){
        return null
    }
    return(
        <div className="successMsg">
            {message}
        </div>
    )
}

export const ErrorNotification = ({ error }) => {
    if (error === null){
        return null
    }
    return(
        <div className="errorMsg">
            {error}
        </div>
    )
}