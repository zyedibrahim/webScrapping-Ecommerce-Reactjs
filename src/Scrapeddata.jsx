import { useEffect, useState } from "react";
import { API } from "./global";
import { Link } from "react-router-dom";
import { style } from "@mui/system";

export function Scrapeddata() {
  const [data, setdata] = useState([]);
  const [clothsdata, setclothsdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [Price, setPrice] = useState();

  useEffect(() => {
    fetch(`${API}/scrapdata`)
      .then((data) => data.json())
      .then((data) => setdata(data));
  }, []);
  useEffect(() => {
    fetch(`${API}/scrapdata/cloths`)
      .then((data) => data.json())
      .then((data) => setclothsdata(data));
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

  const slicedata = clothsdata.slice(0, 2);

  const color = {
    color: "#ff9742",
  };

  return (
    <div>
      <nav className=" navbar navbar-expand-md bg-dark navbar-dark">
        <div className="container">
          <Link to={"/"} className=" text-white navbar-brand ms-5">
            <i className="me-2 fa-brands fa-shopify" style={color}></i>
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
                    className="search-btn"
                    type="button"
                    id="button-addon2"
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </div>
              </span>
            </div>
            <ul className="navbar-nav text-center ms-auto  ">
              <li className="nav-item active ">
                <Link to={"/gadget"} className="nav-link active">
                  Gadget
                </Link>
              </li>
              <li className="nav-item  ">
                <Link to={"/cloths"} className="nav-link">
                  Cloths
                </Link>
              </li>
              <li className="nav-item ">
                <Link to={"/watch"} className="nav-link">
                  Watch
                </Link>{" "}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="row">
        <div className="col">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-bs-ride="true"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://wallpaperaccess.com/full/1448061.jpg"
                  className="d-block w-100"
                  alt="img1"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://wallpaperaccess.com/full/1448077.jpg"
                  className="d-block w-100"
                  alt="img2"
                />
              </div>

              <div className="carousel-item">
                <img
                  src="https://wallpaperaccess.com/full/1448102.jpg"
                  className="d-block w-100"
                  alt="img3"
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      <div className="row mt-3  ms-2 me-2">
        {currentpost
          ?.filter((item) => {
            return searchQuery.toLowerCase() === ""
              ? item
              : item.title.toLowerCase().includes(searchQuery);
          })
          ?.map((ele) => {
            return (
              <div key={ele._id} className="col-12 col-md-3 col-lg-3 col-xlg-3">
                <div className="card  h-100">
                  <img
                    src={ele.image}
                    alt={ele.title}
                    style={sizecard}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <div className="card-titlt">{ele.title}</div>
                    <div className="card-text">rating : {ele.rating}</div>
                    <div className="card-text">
                      {ele.price}{" "}
                      <span className="ms-2 text-muted">{ele.offer}</span>{" "}
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

        {/* pagination */}
        <div className="mt-3 d-flex flex-wrap justify-content-center">
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
  );
}
