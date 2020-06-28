import React,{useState} from 'react';
import classes from './style.module.css';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { nameValidator, emailValidator } from '../../../Tools/validator';
import { connect } from 'react-redux';
import contact from '../../../store/actions/contact';
import PropTypes from 'prop-types';

function Contact(props){
    const state1=useState({name: ''})
    const change1=state1[1]
    const state2=useState({email: ''})
    const change2=state2[1]
    const state3=useState({message: ''})
    const change3=state3[1]
    const submitHandler = () => {
        const data={
            name:state1[0].name,
            email:state2[0].email,
            massage:state3[0].massage
        }
        props.contact(data);
        change1({name: ''})
        change2({email: ''})
        change3({message: ''})
    }
    const resetHandler=()=>{
        change1({name:""})
        change2({email:""})
        change3({massage:""})
    }
    const nameInputChangeHandler=(event)=>{
        change1({name:event.target.value})
    }
    const emailInputChangeHandler=(event)=>{
        change2({email:event.target.value})
    }
    const massageInputChangeHandler=(event)=>{
        change3({massage:event.target.value})
    }
    const  name=state1[0].name
    const  email=state2[0].email
    const  message=state3[0].massage
    const isNameValid = nameValidator(name);
    const isEmailValid = emailValidator(email);


        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col sm='6'>
                        <Form>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label className={classes.a}>Your name *</Form.Label>
                                <Form.Control
                                    value={name}
                                    className={!isNameValid ? classes.invalid : ''}
                                    type='text'
                                    onChange={nameInputChangeHandler}
                                />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label className={classes.a}>Email address *</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    className={`${!isEmailValid ? classes.invalid : ''}`}
                                    placeholder="name@example.com"
                                    onChange={emailInputChangeHandler}
                                />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label className={classes.a}>Your message</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={message}
                                    onChange={massageInputChangeHandler}
                                />
                            </Form.Group>
                            <Button
                                variant={`success ${classes.submitButton}`}
                                onClick={submitHandler}
                                disabled={!(isNameValid && isEmailValid)}
                            >
                                Submit
                            </Button>
                            <Button
                                variant="danger"
                                onClick={resetHandler}
                                disabled={!name && !message && !email }
                            >
                                Reset 
                            </Button>
                        </Form>

                    </Col>
                </Row>

            </Container>

        );
    }


const mapDispatchtoProps = {
    contact,
}


Contact.propTypes={
    contact: PropTypes.func.isRequired
}


export default connect(null, mapDispatchtoProps)(React.memo(Contact));