import React ,{useState} from "react";
import App from "./App";

const EditData = (props)=>{
   
  const [name , setName] = useState(props.name)
  const [email , setEmail] = useState(props.email)
  const [role , setRole] = useState(props.role)   
          
       return(

        <>
        
            
           
             <tr id = {props.id}>
             <td>
                  <input type="checkbox" />
                </td>
             <td><input type="text"  id = 'name' onChange={(event)=>{
                   setName(event.target.value)
              }} readOnly value ={name} /></td>  
              <td><input type="email" id ='email' readOnly value ={email} onChange={(event)=>{
                  setEmail(event.target.value)
              }} /></td> 
          
              
              <td><input type="text"  id='role'readOnly value = {role} onChange = {(event)=>{
                setRole(event.target.value)
              }}/></td> 
            
            <td>
                  <button onClick={()=>{props.editfun(props.id)}}>edit</button>  
                  <button onClick={()=>{Delete(index)}}>delete</button> 
                </td>
             </tr>
            
           
        </>
    )
}
export default EditData;