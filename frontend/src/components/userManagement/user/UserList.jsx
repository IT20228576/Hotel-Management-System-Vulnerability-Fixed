/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { Table } from "react-bootstrap";
import PaginationComponent from "../../reservationManagement/layout/PaginationComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import UserModal from "./UserModal";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const UserList = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(10);
  const [filter, setFilter] = useState("Both");
  const [user, setUser] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  function userList() {
    /* Returning the data in the form of a table. */
    return users?.map((current, index) => {
      /* Checking if the name contains the search string or if the search string is empty. */
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>
            {current.firstName} {current.lastName}
          </td>
          <td>{current.email}</td>
          <td className="d-flex justify-content-center">
            <button
              className="btn btn-outline-secondary"
              onClick={viewUser.bind(this, current)}
            >
              <RemoveRedEyeIcon />
            </button>
            &nbsp;
            <button
              className="btn btn-outline-warning"
              onClick={() => {
                updateUser(current);
              }}
            >
              <EditIcon />
            </button>
            &nbsp;
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                deleteUser(current);
              }}
            >
              <DeleteIcon />
            </button>
          </td>
        </tr>
      );
    });
  }

  /**
   * When the user clicks on a row, the user's data is set to the state and the modal is shown.
   */
  function viewUser(data) {
    setUser(data);
    handleShow();
  }

  /**
   * When the user clicks the update button, navigate to the update page and pass the user object as
   * state.
   */
  async function updateUser(data) {
    data.dob = data.dob.substring(0, 10);
    navigate("/users/update", { state: data });
  }

  /**
   * When the Admin clicks the delete button, delete the user account.
   */
  const deleteUser = async (data) => {
    try {
      if (!window.confirm("Are you sure you wish to delete this account?")) {
        return;
      }

      const result = await axios.delete(
        "http://localhost:8000/user/delete/" + data._id
      );

      if (result?.status === 201) {
        alert("Account deleted successfully");
        navigate("/users");
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };

  const adminFilter = (e) => {
    e.preventDefault();
    setFilter("Admin");
  };
  const customerFilter = (e) => {
    e.preventDefault();
    setFilter("Customer");
  };
  const bothFilter = (e) => {
    e.preventDefault();
    setFilter("Both");
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      try {
        const result = await axios.get(
          `http://localhost:8000/user/?page=${currentPage}&size=${totalItems}&search=${search}&filter=${filter}`
        );
        /* Setting the state of the notes and totalPage variables. */
        setUsers(result?.data?.users);
        setTotalPage(result?.data?.totalPage);
        setTotal(result?.data?.total);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
  };

  useEffect(() => {
    /**
     * "getall" is an async function that uses axios to get data from the server, and then sets the
     * state of the notes and totalPage variables.
     */
    const getall = async () => {
      try {
        const result = await axios.get(
          `http://localhost:8000/user/?page=${currentPage}&size=${totalItems}&search=${search}&filter=${filter}`
        );
        /* Setting the state of the notes and totalPage variables. */
        setUsers(result?.data?.users);
        setTotalPage(result?.data?.totalPage);
        setTotal(result?.data?.total);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    };
    getall();
  }, [currentPage, filter, totalItems]);

  return (
    <div className="main">
      {show === true && <UserModal user={user} handleClose={handleClose} />}
      <div className="sub-main">
        <div className="head-left">
          <h1>Users</h1>
          <a
            href="/users/add"
            style={{ marginLeft: "40px", marginRight: "20px" }}
          >
            <button
              className="btn btn-outline-success"
              style={{ width: "100px", height: "50px" }}
            >
              <AddCircleIcon /> Add
            </button>
          </a>
          <h1 style={{ color: "gray" }}>|</h1>
          <a href="/users/report" style={{ marginInline: "20px" }}>
            <button
              className="btn btn-outline-primary"
              style={{ width: "120px", height: "50px" }}
            >
              <SummarizeIcon /> Report
            </button>
          </a>
        </div>
        <div className="head-right">
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          <h1 style={{ color: "gray" }}>|</h1>
          <div className="dropdown">
            <a
              href="*"
              id="dropdownLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <button
                className="btn btn-outline-primary"
                style={{ width: "130px", height: "50px", marginInline: "20px" }}
              >
                <FilterAltIcon /> {filter}
              </button>
            </a>

            <ul className="dropdown-menu" aria-labelledby="dropdownLink">
              <button
                className="dropdown-item"
                type="button"
                onClick={adminFilter}
              >
                Admins
              </button>
              <button
                className="dropdown-item"
                type="button"
                onClick={customerFilter}
              >
                Customers
              </button>
              <button
                className="dropdown-item"
                type="button"
                onClick={bothFilter}
              >
                Both
              </button>
            </ul>
          </div>
        </div>
        <hr />
        <Table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{userList()}</tbody>
        </Table>
        <hr />
        <PaginationComponent
          pageNo={currentPage}
          setPageNo={setCurrentPage}
          itemsPerPage={totalItems}
          setItemsPerPage={setTotalItems}
          totalCount={total}
          pageCount={totalPage}
        />
      </div>
    </div>
  );
};

export default UserList;
