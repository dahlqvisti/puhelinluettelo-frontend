import React from 'react'

const NotificationReplace = ({message}) => {
    if(message === null) {
      return null
    }
    
    
      return (
        <div className="replaced">
        {message}
      </div>
  
      )
    }


export default NotificationReplace 