import React from 'react'


const NotificationDelete = ({message}) => {
    if(message === null) {
      return null
    }
    
   
      return (
        <div className="deleted">
        {message}
      </div>
  
      )
    }

export default NotificationDelete