import React from "react"

const Person = (props) => 
{
  return (
    <div>
     <p>{props.name} {props.number}   <button onClick={props.remove}>Delete</button></p>
    

   </div>
  )
   
}

export default Person