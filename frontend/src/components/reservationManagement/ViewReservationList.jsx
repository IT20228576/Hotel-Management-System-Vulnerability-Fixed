import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ReservationPopup from "./ReservationPopup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PaginationComponent from "./layout/PaginationComponent";

function ViewReservationList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [details, setDetails] = useState([]);
  const [reservationInfo, setReservationInfo] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();

  async function getAllData() {
    try {
      await axios
        .get(
          `http://localhost:8000/reservations/getAll?pageNo=${pageNo}&pageSize=${itemsPerPage}`
        )
        .then((res) => {
          if (res.status === 200) {
            setDetails(res.data.data);
            setPageCount(res.data.pagination.pageCount);
            setTotalCount(res.data.pagination.count);
          }
        });
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNo, pageCount, itemsPerPage]);

  async function deleteReservation(detail) {
    try {
      if (window.confirm("This Reservation Will Be Deleted!")) {
        await axios
          .delete(`http://localhost:8000/reservations/delete/${detail._id}`)
          .then((res) => {
            if (res.status === 200) {
              alert(res.data.message);
              getAllData();
            }
          });
      }
    } catch (error) {
      alert(error);
    }
  }

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSearch = async (e) => {
    const searchTerm = e.target.value;
    try {
      if (searchTerm) {
        await axios
          .get(`http://localhost:8000/reservations/search/${searchTerm}`)
          .then((res) => {
            if (res.status === 200) {
              setDetails(res.data.data);
              setTotalCount(res.data.data.length);
            }
          });
      } else {
        getAllData();
      }
    } catch (error) {
      alert(error);
    }
  };

  function updateReservation(detail) {
    navigate("/reservations/update", { state: detail });
  }

  var dataList =
    details.length > 0 ? (
      details.map((item, index) => {
        return (
          <tr key={index}>
            <td>{item.referenceNumber}</td>
            <td>{item.firstName + " " + item.lastName}</td>
            <td>{item.mobile}</td>
            <td>{item.checkinDate.substring(0, 10)}</td>
            <td>{item.checkoutDate.substring(0, 10)}</td>
            <td className="d-flex justify-content-center">
              <button
                className="btn btn-outline-secondary"
                onClick={() => {
                  setModalOpen(true);
                  setReservationInfo(item);
                }}
              >
                <RemoveRedEyeIcon />
              </button>
              &nbsp;
              <button
                className="btn btn-outline-warning"
                onClick={() => {
                  updateReservation(item);
                }}
              >
                <EditIcon />
              </button>
              &nbsp;
              <button
                className="btn btn-outline-danger"
                onClick={() => {
                  deleteReservation(item);
                }}
              >
                <DeleteIcon />
              </button>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td>
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
            }}
          >
            No Result Found
          </div>
        </td>
      </tr>
    );

  return (
    <>
      <div className="container" style={{ minHeight: "500px" }}>
        <div>
          <div>
            <nav className="navbar navbar-expand-lg navbar-light">
              <h1
                className="navbar-brand"
                style={{
                  marginRight: "80px",
                  marginLeft: "80px",
                  fontSize: "32px",
                }}
              >
                Reservations
              </h1>
              <a href="/reservations/add" style={{ marginRight: "10px" }}>
                <button
                  className="btn btn-outline-success my-1 my-sm-0"
                  type="submit"
                >
                  <AddCircleIcon /> Add
                </button>
              </a>
              <a href="/reservations/report" style={{ marginRight: "10px" }}>
                <button
                  className="btn btn-outline-primary my-2 my-sm-0"
                  type="submit"
                >
                  <SummarizeIcon /> Report
                </button>
              </a>

              <div>
                <form className="form-inline my-2 my-lg-0">
                  <input
                    className="form-control mr-sm-2"
                    style={{
                      width: "430px",
                      marginLeft: "100px",
                      marginRight: "10px",
                    }}
                    placeholder="Search By Reference Number/ First Name/ Last Name"
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
                <b>Reference Number</b>
              </th>
              <th scope="col">
                <b>Name</b>
              </th>
              <th scope="col">
                <b>Phone Number</b>
              </th>
              <th scope="col">
                <b>Check-in</b>
              </th>
              <th scope="col">
                <b>Check-out</b>
              </th>
              <th scope="col">
                <b>Actions</b>
              </th>
            </tr>
          </thead>
          <tbody>{dataList}</tbody>
        </table>
        {modalOpen === true ? (
          <ReservationPopup
            handleModalClose={handleModalClose}
            reservationInfo={reservationInfo}
          />
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
    </>
  );
}

export default ViewReservationList;
