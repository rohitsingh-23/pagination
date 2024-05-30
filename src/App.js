import axios from "axios";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";

const baseUrl = `https://give-me-users-forever.vercel.app/api/users/`;

function App() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    let itemNumber = page * 10;
    axios.get(`${baseUrl}${itemNumber}/next`).then((res) => {
      console.log(res.data.users);
      setData((prev) => [...res.data.users]);
    });
  }, [page]);

  const handlePageChange = (num) => {
    setPage((prev) => {
      if (num > 0) {
        return prev + num;
      } else if (num < 0) {
        if (page == 0) {
          return page;
        } else {
          return prev + num;
        }
      }
    });
  };

  return (
    <div className="App">
      <div className="cards-container">
        {data.map((item) => {
          console.log(item);
          return (
            <div className="card">
              <h1>{item.ID}</h1>
              <h2>Full Name: {item.FirstNameLastName}</h2>
              <h3>Email Address: {item.EmailAddress}</h3>
              <h3>Email: {item.Email}</h3>
              <h3>Job Title: {item.JobTitle}</h3>
              <h3>Company: {item.Company}</h3>
            </div>
          );
        })}
      </div>
      <button
        disabled={page == 1 ? true : false}
        onClick={() => {
          handlePageChange(-1);
        }}
      >
        Previous
      </button>
      {[...Array(10).keys()]
        .map((item, i) => {
          if (page > 5) {
            let temp = page + i + 1 - 5;

            return temp;
          } else {
            return i + 1;
          }
        })
        .map((item) => {
          // console.log(item, page);
          return (
            <button
              onClick={() => setPage(item -1)}
              key={item}
              className={item == page + 1 ? "selected" : null}
            >
              {item}
            </button>
          );
        })}
      <button
        onClick={() => {
          handlePageChange(1);
        }}
      >
        Next
      </button>
    </div>
  );
}

export default App;
