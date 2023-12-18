import React, { useEffect, useState, createContext } from "react";
import EditData from "./EditData";
import "./App.css";

const DetailsContext = createContext();

function App() {
  const [details, setDetails] = useState([]);

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

  let selarr = [];

  const SelData = (idnum, event) => {
    let row = document.getElementById(idnum);

    if (event.target.checked == true) {
      row.style.backgroundColor = "lightgray";
      selarr.push(idnum);
    } else {
      row.style.backgroundColor = "transparent";
      selarr = selarr.filter((currele) => {
        return currele != idnum;
      });
    }
  };

  function MulDel() {
    let newarr = details.filter((currele) => {
      return !selarr.includes(currele.id);
    });

    setDetails(newarr);
  }

  return (
    <>
      <DetailsContext.Provider value={{ details, setDetails }}>
        <div>
          <input type="text" placeholder="Search..." />
          <button
            onClick={() => {
              MulDel();
            }}
          >
            delete
          </button>
        </div>
        <table border={1} cellPadding={10} cellSpacing={10}>
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
                <EditData
                  name={currele.name}
                  email={currele.email}
                  role={currele.role}
                  id={currele.id}
                  key={currele.id}
                  seldata={SelData}
                />
              );
            })}
          </tbody>
        </table>
      </DetailsContext.Provider>
    </>
  );
}

export default App;
export { DetailsContext };
