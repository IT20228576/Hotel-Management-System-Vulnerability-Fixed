import React, { useState, useEffect, useContext } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { NavLink } from "react-router-dom";
import { deldata } from "./context/ContextProvider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SummarizeIcon from "@mui/icons-material/Summarize";
import PaginationComponent from "../reservationManagement/layout/PaginationComponent";

const ViewListEvents = () => {
  const [geteventdata, setEventdata] = useState([]);
  

  const [pageNo, setPageNo] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);


  const { setDLTdata } = useContext(deldata);
  const [searchTerm, setSearchTerm] = useState("");

  const getdata = async () => {

    const res = await fetch(`http://localhost:8000/event/view?pageNo=${pageNo}&pageSize=${itemsPerPage}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await res.json();


    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setEventdata(data.geteventdata);
      setPageCount(data.pagination.pageCount);
      setTotalCount(data.pagination.count);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNo, pageCount, itemsPerPage]);

  const deleteevent = async (id) => {
    const res2 = await fetch(`http://localhost:8000/event/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deletedata = await res2.json();
    

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      alert("Deleted Event Details Successfully");
      console.log("event deleted");
      setDLTdata(deletedata);
      getdata();
    }
  };

  return (
    <>
      <div className="container">
        <div className="mt-5">
          <div>
            <div>
              <nav
                className="navbar navbar-expand-lg navbar-light"
                style={{ marginLeft: "100px" }}
              >
                <h1
                  className="navbar-brand"
                  style={{ marginRight: "100px", marginLeft: "100px", fontSize: "40px" }}
                >
                  Events
                </h1>
                <a href="/event/new" style={{ marginRight: "10px" }}>
                  <button
                    className="btn btn-outline-success my-1 my-sm-0"
                    style={{ width: "100px" }}
                    type="submit"
                  >
                    <AddCircleIcon /> Add
                  </button>
                </a>
                <a href="/eventreport" style={{ marginRight: "10px" }}>
                  <button
                    className="btn btn-outline-primary my-2 my-sm-0"
                    style={{ width: "130px" }}
                    type="submit"
                  >
                    <SummarizeIcon /> Report
                  </button>
                </a>

                <div style={{}}>
                  <form className="form-inline my-2 my-lg-0">
                    <input
                      className="form-control mr-sm-2"
                      style={{
                        width: "430px",
                        marginLeft: "100px",
                        marginRight: "10px",
                      }}
                      placeholder="Search By Event Name / Type / Date / Status"
                      type="search"
                      name="searchQuery"
                      onChange={(event) => {
                        setSearchTerm(event.target.value);
                      }}
                    ></input>
                  </form>
                </div>
              </nav>
            </div>
          </div>

          <div className="container">
            <table className="table table-hover" style={{ textAlign: "center" }}>
              <thead>
                <tr>
                  <th scope="col">
                    <b>Event ID</b>
                  </th>
                  <th scope="col">Event Name</th>
                  <th scope="col">Action</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {geteventdata.length > 0 ? (geteventdata
                  .filter((element) => {
                    if (searchTerm === "") {
                      return element;
                    } else if (
                      element.EventName.toLowerCase().includes(
                        searchTerm.toLowerCase()
                      ) ||
                      element.EventType.toLowerCase().includes(
                        searchTerm.toLowerCase()
                      ) ||
                      element.EventDate.toLowerCase().includes(
                        searchTerm.toLowerCase()
                      ) ||
                      element.EventStatus.toLowerCase().includes(
                        searchTerm.toLowerCase()
                      )
                    ) {
                      return element;
                    } else {

                      return false;
                    }
                  }).map((element, id) => {
                    return (
                      <>
                        <tr>
                          <td>E{id + 100 + 1}</td>
                          <td>{element.EventName}</td>
                          <td>
                            <NavLink to={`/view/${element._id}`}>
                              {" "}
                              <i className="btn btn-outline-secondary">
                                <RemoveRedEyeIcon />
                              </i>
                            </NavLink>
                            &nbsp; &nbsp;
                            <NavLink to={`/edit/${element._id}`}>
                              <i className="btn btn-outline-warning">
                                <EditIcon />
                              </i>
                            </NavLink>
                            &nbsp; &nbsp;
                            <i
                              className="btn btn-outline-danger"
                              onClick={() => deleteevent(element._id)}
                            >
                              <DeleteIcon />
                            </i>
                            &nbsp;
                          </td>
                        </tr>
                      </>
                    );
                  })) : (
                  <div
                    className="notify"
                    style={{
                      position: "relative",
                      left: "60%",
                      right: "40%",
                      top: "30%",
                      bottom: "50%",
                      fontSize: "40px",
                      fontWeight: "bold",
                    }}>
                    No Result Found
                  </div>
                )}
              </tbody>
            </table>
          </div>
        </div>

      
      <PaginationComponent
        pageNo={pageNo}
        setPageNo={setPageNo}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        totalCount={totalCount}
        pageCount={pageCount}
      />
      </div>
    </>
  );
};

export default ViewListEvents;
