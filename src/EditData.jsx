import React, { useState, useContext, createContext } from "react";
import App from "./App";
import { DetailsContext , FilterContext } from "./App";

const EditData = (props) => {
  const userdetail = useContext(DetailsContext);
  const { details, setDetails } = userdetail;

  const filterobj = useContext(FilterContext)
  const {filtername , setFiltername} = filterobj;

  const [editsave, setEditsave] = useState("✏️"); 



  const [name, setName] = useState(props.name);
  const [email, setEmail] = useState(props.email);
  const [role, setRole] = useState(props.role);

  const Delete = (indexnum) => {
    let newdata =details.filter((currele) => {  
      return currele.id != indexnum; 
    });
    
    let newfilterdata = filtername.filter((currele)=>{ 
      return currele.id != indexnum; 
    })
    setFiltername(newfilterdata); 
    setDetails(newdata); 
    };

    

  const Edit = (indexnum) => {
    let row = document.getElementById(indexnum);

    if (row.querySelector("#name").hasAttribute("readOnly")) {
      row.querySelector("#name").removeAttribute("readOnly");
      row.querySelector("#email").removeAttribute("readOnly");
      row.querySelector("#role").removeAttribute("readOnly");
      setEditsave("📄");
    } else {
      row.querySelector("#name").setAttribute("readOnly", true);
      row.querySelector("#email").setAttribute("readOnly", true);
      row.querySelector("#role").setAttribute("readOnly", true);
      setEditsave("✏️");
    }
  };

  return (
    <>
      <tr id={props.id}>
        <td id="inpt">
          <input
            type="checkbox"
            style={{ backgroundColor: "transparent" }}
            id="chkbox"
            onClick={(event) => {
              props.seldata(props.id, event);
            }}
          />
        </td>
        <td>
          <input
            type="text"
            id="name"
            onChange={(event) => {
              setName(event.target.value);
            }}
            readOnly
            value={name}
          />
        </td>
        <td>
          <input
            type="email"
            id="email"
            readOnly
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </td>

        <td>
          <input
            type="text"
            id="role"
            readOnly
            value={role}
            onChange={(event) => {
              setRole(event.target.value);
            }}
          />
        </td>

        <td>
          <button
            id="edit-save"
            onClick={() => {
              Edit(props.id);
            }}
          >
            {editsave}
          </button>
          <button
            onClick={() => {
              Delete(props.id);
            }}
          >
            🗑️
          </button>
        </td>
      </tr>
    </>
  );
};
export default EditData;
