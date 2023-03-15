import { useEffect, useState } from "react";
import { API } from "./global";
import { Link } from "react-router-dom";

export function Scrapeddata() {
  const [data, setdata] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(`${API}/scrapdata`)
      .then((data) => data.json())
      .then((data) => setdata(data));
  }, []);

  const sizecard = {
    style: "max-width: 540px",
  };

  return (
    <div>
      <nav className=" navbar navbar-expand-md bg-dark navbar-dark">
        <div className="d-flex ">
          <Link to={"/students"} className=" text-white navbar-brand ms-5">
            Amaikart
          </Link>

          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#mynav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse " id="mynav">
            <div className=" ms-5 me-5 btn-group">
              <span className="d-flex" role="search">
                <input
                  className="form-control  me-2"
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    console.log(searchQuery);
                  }}
                  aria-label="Search"
                />
                <button className="btn btn-warning" type="button">
                  Search
                </button>
              </span>
            </div>
            <ul className="navbar-nav me-auto ">
              <li className="nav-item active ">
                <Link to={"/gadget"} className="nav-link">
                  Gadget
                </Link>
              </li>
              {/* <li className="nav-item  ">
                <Link to={"/addbooks"} className="nav-link">
                  AddBooks
                </Link>
              </li>
              <li className="nav-item ">
                <Link to={"/books/take"} className="nav-link">
                  Return Books
                </Link>{" "}
              </li>

              <li className="nav-item active">
                {" "}
                <a className="nav-link" href="#">
                  Login
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>

      {/* <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          console.log(searchQuery);
        }}
      /> */}
      <div className="row mt-3 ">
        {data
          ?.filter((item) => {
            return searchQuery.toLowerCase() === ""
              ? item
              : item.title.toLowerCase().includes(searchQuery);
          })
          ?.map((ele) => {
            return (
              <div key={ele._id} className="col-3">
                <div className="card">
                  <img
                    src={ele.image}
                    alt={ele.title}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <div className="card-titlt">{ele.title}</div>
                    <div className="card-text">{ele.rating}</div>
                    <div className="card-text">
                      {ele.price}{" "}
                      <span className="text-muted">{ele.offer}</span>{" "}
                    </div>
                  </div>
                  <div className="card-footer border-0 bg-white mt-1 mb-1">
                    <div className="d-grid">
                      <button className="btn mb-1 btn-warning">AddCart</button>
                      <button className="btn btn-warning">Buy</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
