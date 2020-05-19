import React from 'react'

const NotificationError = ({message}) => {
    if(message === null) {
      return null
      }
      
      return (
        <div className="error">
          {message}
        </div>
      )
    }
  

export default NotificationError