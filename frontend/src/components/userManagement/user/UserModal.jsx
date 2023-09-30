import { Modal, Table } from "react-bootstrap";
import countries from "react-select-country-list";

const UserModal = (props) => {
  const { user, handleClose } = props;

  return (
    <Modal show={true} onHide={handleClose} className="modal-lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <h1>
            {user?.firstName} {user?.lastName}
          </h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table className="table table-bordered">
          <tbody>
            <tr key={1}>
              <td>
                <h3>E-mail</h3>
              </td>
              <td>
                <h3>{user?.email}</h3>
              </td>
            </tr>
            <tr key={2}>
              <td>
                <h3>Mobile</h3>
              </td>
              <td>
                <h3>{user?.mobile}</h3>
              </td>
            </tr>
            <tr key={3}>
              <td>
                <h3>Date of birth</h3>
              </td>
              <td>
                <h3>{user?.dob?.toString()?.substring(0, 10)}</h3>
              </td>
            </tr>
            <tr key={4}>
              <td>
                <h3>Country</h3>
              </td>
              <td>
                {user?.country !== undefined && (
                  <h3>{countries().getLabel(user?.country)}</h3>
                )}
              </td>
            </tr>
            <tr key={5}>
              <td>
                <h3>User Type</h3>
              </td>
              <td>
                <h3>{user?.userType}</h3>
              </td>
            </tr>
            <tr key={6}>
              <td>
                <h3>Verified</h3>
              </td>
              {user?.verified === true && (
                <td>
                  <h3>Verified</h3>
                </td>
              )}
              {user?.verified === false && (
                <td>
                  <h3>Not Verified</h3>
                </td>
              )}
            </tr>
            <tr key={7}>
              <td>
                <h3>Created by</h3>
              </td>
              {user?.adminCreated === true && (
                <td>
                  <h3>Admin</h3>
                </td>
              )}
              {user?.adminCreated === false && (
                <td>
                  <h3>User</h3>
                </td>
              )}
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default UserModal;
