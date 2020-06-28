import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

function TaskModal(props) {

  const handleEdit = (taskData) => () => {
    props.onEdit(taskData.id);
  }
  const closeModal = () =>{
    props.onHide()
  }
  const { taskData } = props;


  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Full task information
              </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{taskData.title}</h4>
        <p>
          {taskData.description}
        </p>
        <p>
          Created {taskData.created_at.slice(0, 10)}
        </p>
        <p>
          Due date {taskData.date.slice(0, 10)}
        </p>
        <FontAwesomeIcon icon={faEdit} onClick={handleEdit(taskData)} />
        <FontAwesomeIcon icon={faTrashAlt} onClick={props.onDelete} />

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

TaskModal.propTypes={
  taskData:PropTypes.object.isRequired,
  onEdit:PropTypes.func.isRequired,
  onHide:PropTypes.func.isRequired,
  onDelete:PropTypes.func.isRequired,
  show:PropTypes.bool.isRequired
}


export default React.memo(TaskModal);