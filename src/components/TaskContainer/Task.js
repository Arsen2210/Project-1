import React from 'react';
import { Card, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit} from '@fortawesome/free-solid-svg-icons';
import EditTask from '../EditTask';
import {formatDate} from '../../Tools/Tools';
import classes from './style.module.css';
import {Link} from 'react-router-dom';

export default class Task extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false
    }
  }
  render() {
    const { data } = this.props;
    const { isEdit } = this.state;

    return (
      <Card>
        <Card.Header>
          <input
            type="checkbox"
            checked={this.props.isSelected}
            onChange={this.props.onCheck}
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
          {
            isEdit ?
            <EditTask
            text = {this.props.text}
            onCancelEdit = {this.cancelEdit}
            onSaveEdit = {this.saveEdit}
            />           
            :
              <>
                <FontAwesomeIcon icon={faEdit} onClick={()=>this.props.onEdit(data.id)} />
                <FontAwesomeIcon icon={faTrashAlt} onClick={this.props.onDelete} />
                <p>
                <Button 
                variant="primary" 
                onClick = {this.props.onOpenModal}
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
          }
        </Card.Body>
      </Card>
    );
  }
}