import React from 'react'



const NotificationAdd = ({message}) => {
    if(message === null) {
      return null
    }
    
    
      return (
        <div className="added">
        {message}
      </div>
  
      )
    }
   

export default NotificationAdd