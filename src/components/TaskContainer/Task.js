import React from 'react';
import { Card, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit} from '@fortawesome/free-solid-svg-icons';
import {formatDate} from '../../Tools/Tools';
import classes from './style.module.css';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';


function Task (props){
    const { data } = props;
    return (
      <Card className={classes.card}>
        <Card.Header>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={props.onCheck}
          />
        </Card.Header>
        <Card.Body>
          <Card.Title>{data.title}</Card.Title>
          <Card.Text >
            {data.description}
          </Card.Text>
          <Card.Text className={classes.date}>
          Creation date {formatDate(data.created_at)}
        </Card.Text>
        <Card.Text className={classes.date}>
        Completion date {formatDate(data.date)}
      </Card.Text>
              <>
                <FontAwesomeIcon className={classes.icon} icon={faEdit} onClick={()=>props.onEdit(data.id)} />
                <FontAwesomeIcon  className={classes.icon} icon={faTrashAlt} onClick={props.onDelete} />
                <div className={classes.div}>
                  <Button 
                  variant="success" 
                  onClick = {props.onOpenModal}
                  className={classes.button}
                  >
                  Open in modal
                  </Button>

                  <Link to={`/task/${data.id}`}>
                  <Button 
                  className={classes.button}
                  variant="warning"
                  >
                  Open in separate page
                  </Button>
                  </Link>
                </div>
              </>
        </Card.Body>
      </Card>
    );
  }

Task.propTypes={
  data:PropTypes.object.isRequired,
  isSelected:PropTypes.bool.isRequired,
  onCheck:PropTypes.func.isRequired,
  onOpenModal:PropTypes.func.isRequired,
  onDelete:PropTypes.func.isRequired,
  onEdit:PropTypes.func.isRequired
}


export default React.memo(Task);