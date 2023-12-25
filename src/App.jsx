import React, { useEffect, useState, createContext } from "react";
import ReactPaginate from "react-paginate";
import EditData from "./EditData";
import "./App.css";

const DetailsContext = createContext();
const FilterContext = createContext();

function App() {
  const [details, setDetails] = useState([]);
  const [filtername, setFiltername] = useState([]);
  const [currentpage, setCurrentpage] = useState(0);
  const itemsPerPage = 10;
  const pagecount = Math.ceil(filtername.length / itemsPerPage);
  let end_user_id = itemsPerPage * [currentpage + 1];
  let start_user_id = end_user_id - itemsPerPage;

  let current_users = filtername.slice(start_user_id, end_user_id);
  

  useEffect(() => {
    (async () => {
      let data = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json",
        { method: "GET" }
      );
      let datas = await data.json();

      setDetails(datas);
      setFiltername(datas);
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
    let newfilterdata = filtername.filter((currele) => {
      return !selarr.includes(currele.id);
    });

    let newarr = details.filter((currele) => {
      return !selarr.includes(currele.id);
    });

    setFiltername(newfilterdata);
    setDetails(newarr);
  }

  function FilterProp(value) {
    if (value.length === 0) {
      setFiltername(details);
    }

    let filtered = details.filter((currele) => {
      if (currele.name.toString().toLowerCase().includes(value)) {
        return true;
      } else {
        return false;
      }
    });

    setFiltername(filtered);
  }

  const handlePageClick = ({ selected }) => {
    setCurrentpage(selected);
  };

  return (
    <>
      <DetailsContext.Provider value={{ details, setDetails }}>
        <FilterContext.Provider value={{ filtername, setFiltername }}>
          <div>
            <input
              type="text"
              placeholder="Search..."
              onChange={(event) => {
                FilterProp(event.target.value);
              }}
            />
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
              {current_users.map((currele, index) => {
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

          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageCount={pagecount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        </FilterContext.Provider>
      </DetailsContext.Provider>
    </>
  );
}

export default App;
export { DetailsContext, FilterContext };
