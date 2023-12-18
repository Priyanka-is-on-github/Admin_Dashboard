import React, { useContext, useState } from 'react'
import { detailsContext } from './App';

function UserItem({ values }) {

    const { name, email, role } = values;
    const [isEditing, setIsEditing] = useState(false);
    const { details, setDetails } = useContext(detailsContext);

    function Edit(indexnum) {

        // document.getElementById('name').readOnly = false;
        if (isEditing)
            setIsEditing(false);
        else
            setIsEditing(true);

    }

    function Delete(indexnum) {


        let newdata = details.filter((currele, index) => {

            return (
                index != indexnum
            )

        })

        setDetails(newdata);
    }

    return (
        <tr>
            <td>
                <input type="checkbox" />
            </td>
            {details.length == 0 ? (
                <>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Role</td>
                </>
            ) : (
                <>

                    <td><input type="text" value={name} name="" id="name" readOnly={isEditing} onChange={() => { }} /></td>
                    <td><input type="text" value={email} name="" id="email" readOnly={isEditing} onChange={() => { }} /></td>
                    <td><input type="text" value={role} name="" id="role" readOnly={isEditing} onChange={() => { }} /></td>
                </>
            )}

            <td>
                <button onClick={() => { Edit(index) }}>edit</button>
                <button onClick={() => { Delete(index) }}>delete</button>
            </td>
        </tr>
    )
}

export default UserItem