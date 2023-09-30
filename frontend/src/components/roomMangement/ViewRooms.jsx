import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import SummarizeIcon from "@mui/icons-material/Summarize";
import PopUpViewTemplate from "./PopUpView";
import PaginationComponent from "./layout/PaginationComponent";

function ViewRooms() {
  const [modalOpen, setModalOpen] = useState(false);
  const [details, setDetails] = useState([]);

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const [pageNo, setPageNo] = useState(1);

  const [pageCount, setPageCount] = useState(0);

  const [totalCount, setTotalCount] = useState(0);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [rooms, setRooms] = useState([]);
  let navigate = useNavigate();

  const getRooms = async () => {
    try {

      await axios

        .get(

          `http://localhost:8000/api/room/get?pageNo=${pageNo}&pageSize=${itemsPerPage}`

        )

        .then((res) => {

          if (res.status === 200) {

            setRooms(res.data.data);

            setPageCount(res.data.pagination.pageCount);

            setTotalCount(res.data.pagination.count);

          }

        });

    } catch (error) {



      alert(error);

    }
  }

  useEffect(() => {
    getRooms();
  }, []);

  async function update(id) {
    localStorage.setItem("updateid", id);
    navigate("/updateRoom");
  }

  const handleSearch = async (e) => {

    const searchTerm = e.target.value;

    try {

      if (searchTerm) {

        await axios

          .get(`http://localhost:8000/api/room/search/${searchTerm}`)

          .then((res) => {

            if (res.status === 200) {

              setRooms(res.data.data);

            }

          });

      }

      else {

        getRooms();

      }

    } catch (error) {



      alert(error);

    }

  };

  async function deleteRoom(room) {
    try {
      if (window.confirm("This Room Will Be Deleted!")) {
        await axios
          .delete(`http://localhost:8000/api/room/delete/${room._id}`)
          .then((res) => {

            if (res.status === 201) {
              alert("Deleted successfully....");
              getRooms();
            }
          });
      }
    } catch (error) {

      alert(error);
    }
  }

  return (
    <div>
      <div className="container">
        <div>
          <div>
            <nav className="navbar navbar-expand-lg navbar-light">
              <h1
                className="navbar-brand"
                style={{ marginRight: "100px", marginLeft: "100px" }}
              >
                Rooms
              </h1>
              <a href="/addRoom" style={{ marginRight: "10px" }}>
                <button
                  className="btn btn-outline-success my-1 my-sm-0"
                  type="submit"
                >
                  <AddCircleIcon /> Add
                </button>
              </a>
              <a href="/roomReport" style={{ marginRight: "10px" }}>
                <button
                  className="btn btn-outline-primary my-2 my-sm-0"
                  type="submit"
                >
                  <SummarizeIcon /> Report
                </button>
              </a>

              <div style={{ marginLeft: "500px" }}>
                <form className="form-inline my-2 my-lg-0">
                  <input
                    className="form-control mr-sm-2"
                    placeholder="Search by room name"
                    type="search"
                    name="searchQuery"
                    onChange={handleSearch}
                  ></input>
                </form>
              </div>
            </nav>
          </div>
        </div>
        <table className="table table-hover" style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th scope="col">
                <b>Room ID</b>
              </th>
              <th scope="col">
                <b>Room Name</b>
              </th>
              <th scope="col">
                <b>Room Type</b>
              </th>
              <th scope="col">
                <b>Room Price</b>
              </th>
              <th scope="col">
                <b>Room Number</b>
              </th>
              <th scope="col">
                <b>Actions</b>
              </th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => {
              return (
                <tr>
                  <td>{room._id}</td>
                  <td>{room.roomName}</td>
                  <td>{room.roomType}</td>
                  <td>{room.roomPrice}</td>
                  <td>{room.roomNumber}</td>
                  <td>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        setModalOpen(true); setDetails(room);
                      }}
                    >
                      <RemoveRedEyeIcon fontSize="large" />
                    </button>
                    <i className="btn btn-outline-warning">
                      <EditIcon
                        fontSize="large"
                        onClick={() => {
                          update(room._id);
                        }}
                      />
                    </i>
                    <i class="btn btn-outline-danger">
                      <DeleteIcon fontSize="large" onClick={() => deleteRoom(room)}
                      />
                    </i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {modalOpen === true ? (
          <PopUpViewTemplate handleModalClose={handleModalClose} details={details} />
        ) : (
          <></>
        )}
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
  );
}
export default ViewRooms;
