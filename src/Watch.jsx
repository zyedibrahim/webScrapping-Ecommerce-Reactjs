import { useEffect, useState } from "react";
import { API } from "./global";
import { Link } from "react-router-dom";
import "./App.css";

export function Watch() {
  const [data, setdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    fetch(`${API}/scrapdata/watch`)
      .then((data) => data.json())
      .then((data) => setdata(data));
  }, []);

  const sizecard = {
    height: "200px",
  };

  const [currentpage, setcurrentpage] = useState(1);
  const [postperpage, setpostperpage] = useState(8);

  const lastpostindex = currentpage * postperpage;
  const firstpostindex = lastpostindex - postperpage;

  const currentpost = data.slice(firstpostindex, lastpostindex);
  const totalpost = data.length;

  // pagination
  let pages = [];
  for (let i = 1; i < Math.ceil(totalpost / postperpage); i++) {
    pages.push(i);
  }

  return (
    <div>
      <nav className=" navbar navbar-expand-md bg-dark navbar-dark">
        <div className="container">
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

          <div className="collapse navbar-collapse" id="mynav">
            <div className=" ms-2 ">
              <span className="d-flex" role="search">
                <div className="input-group">
                  <input
                    className=" p-2 no-rounded custom-width"
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                    }}
                    aria-label="Search"
                  />
                  <button
                    className="btn btn-warning"
                    type="button"
                    id="button-addon2"
                  >
                    Button
                  </button>
                </div>
              </span>
            </div>
            <ul className="navbar-nav text-center ms-auto  ">
              <li className="nav-item active ">
                <Link to={"/gadget"} className="nav-link">
                  Gadget
                </Link>
              </li>
              <li className="nav-item  ">
                <Link to={""} className="nav-link">
                  Cloths
                </Link>
              </li>
              <li className="nav-item ">
                <Link to={"/watch"} className="nav-link active">
                  Watch
                </Link>{" "}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="row m-2">
        <div className="col-md-3"></div>
        <div className="col-md-9">
          <div className="row mt-3 ">
            {currentpost
              ?.filter((item) => {
                return searchQuery.toLowerCase() === ""
                  ? item
                  : item.title.toLowerCase().includes(searchQuery);
              })
              ?.map((ele) => {
                return (
                  <div key={ele._id} className="col-3">
                    <div className="card  h-100">
                      <img
                        src={ele.image}
                        alt={ele.title}
                        style={sizecard}
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <div className="card-titlt">
                          {ele.title.length < 50 ? ele.title.slice(0, 50) : ""}
                        </div>
                        <div className="card-text">{ele.rating}</div>
                        <div className="card-text">
                          {ele.price}{" "}
                          <span className="text-muted">{ele.offer}</span>{" "}
                        </div>
                      </div>
                      <div className="card-footer border-0 bg-white mt-1 mb-1">
                        <div className="d-grid">
                          <button className="btn mb-1 btn-warning">
                            AddCart
                          </button>
                          <button className="btn btn-warning">Buy</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {/* pagination */}
          <div className="mt-3 d-flex justify-content-center">
            <nav aria-label="...">
              <ul className="pagination">
                {pages.map((page, index) => {
                  return (
                    <li key={index} className="page-item">
                      <span
                        className={`page-link ${
                          page == currentpage ? "active" : ""
                        }`}
                        onClick={() => setcurrentpage(page)}
                      >
                        {page}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}