import React from 'react';
import { Card, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit} from '@fortawesome/free-solid-svg-icons';
import {formatDate} from '../../Tools/Tools';
import classes from './style.module.css';
import {Link} from 'react-router-dom';


function Task (props){
    const { data } = props;
    return (
      <Card>
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
                <FontAwesomeIcon icon={faEdit} onClick={()=>props.onEdit(data.id)} />
                <FontAwesomeIcon icon={faTrashAlt} onClick={props.onDelete} />
                <p>
                <Button 
                variant="primary" 
                onClick = {props.onOpenModal}
                >
                Open in modal
                </Button>

                <Link to={`/task/${data.id}`}>
                <Button 
                variant="primary"
                >
                Open in separate page
                </Button>
                </Link>
                </p>
              </>
        </Card.Body>
      </Card>
    );
  }

export default Task 