import React, { useEffect, useState } from "react";
import EditData from "./EditData";

function App() {
  const [details, setDetails] = useState([]); 
  const [name, setName] = useState("Arone Miles");

  useEffect(() => {
    (async () => {
      let data = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json",
        { method: "GET" }
      );
      let datas = await data.json();

      setDetails(datas);
     
    })();
  }, []);

  function Delete(indexnum){
   
     
   let newdata = details.filter((currele , index)=>{
       
      return(
        index != indexnum   
      )

    })
   
    setDetails(newdata);
   
     
  }

  
  
    const Edit =(indexnum)=>{
    
        let row = document.getElementById(indexnum); 
       if( row.querySelector('#name').hasAttribute("readOnly")) 
        {
          row.querySelector('#name').removeAttribute("readOnly"); 
          row.querySelector('#email').removeAttribute("readOnly"); 
          row.querySelector('#role').removeAttribute("readOnly"); 
           
        }
        else{
          row.querySelector('#name').setAttribute("readOnly" , true); 
          row.querySelector('#email').setAttribute("readOnly", true); 
          row.querySelector('#role').setAttribute("readOnly" , true); 
         
        }
          
          console.log(row.querySelector('#name')); 
    }   

  

  

  return (
    <>

      <table border={2}>
        <thead>
          <tr>
            <td>
              <input type="checkbox" />
            </td>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {details.map((currele, index) => {
            return (
              // <tr   id = {index} key = {index} >  
              //   <td>
              //     <input type="checkbox" />
              //   </td>
              //   {details.length == 0 ? ( 
              //     <>
              //       <td>Name</td>
              //       <td>Email</td> 
              //       <td>Role</td> 
              //     </>  
              //   ) : (
              //     <>
                    
              //       <td><input type="text"  id = 'name' onChange={(event)=>{  
              //         console.log(event.target.value) 
                         
              //       }} readOnly value ={currele.name} /></td>  
              //       <td><input type="email" id ='email' readOnly value ={currele.email} /></td> 
                
                    
              //       <td><input type="text"  id='role'readOnly value = {currele.role}/></td> 
              //     </>
              //   )}

              //   <td>
              //     <button onClick={()=>{Edit(index)}}>edit</button> 
              //     <button onClick={()=>{Delete(index)}}>delete</button>
              //   </td>
              // </tr>

              <EditData name = {currele.name} email = {currele.email} role = {currele.role} id = {index} key = {index} editfun ={Edit} /> 
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;