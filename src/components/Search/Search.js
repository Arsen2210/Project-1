import React, { Component } from 'react';
import { Button, InputGroup, FormControl, SplitButton, Dropdown, Form, NavDropdown, Navbar, Nav } from 'react-bootstrap';
import classes from './style.module.css';
import PropTypes from 'prop-types';

class Search extends Component {
    constructor(props) {
        super(props);

        this.defaultState = {
            search: '',
            sortId: '',
            sortTitle: '',
            filterId: '',
            filterTitle: '',
            date: ''
        };

        this.state = this.defaultState;
    }


    sort = [
        {
            id: 'none',
            title: 'None'
        },
        {
            id: 'a-z',
            title: 'a-z'
        },
        {
            id: 'z-a',
            title: 'z-a'
        },
        {
            id: 'creation_date_oldest',
            title: 'Creation date oldest'
        },
        {
            id: 'creation_date_newest',
            title: 'Creation date newest'
        },
        {
            id: 'completion_date_oldest',
            title: 'Compl. date oldest'
        },
        {
            id: 'completion_date_newest',
            title: 'Compl. date newest'
        }];

    filter = [
        {
            id: 'none',
            title: 'None'
        },
        {
            id: 'create_lt',
            title: 'Created before'
        },
        {
            id: 'create_gt',
            title: 'Created after'
        },
        {
            id: 'complete_lt',
            title: 'Complete before'
        },
        {
            id: 'complete_gt',
            title: 'Complete after'
        }];


    inputChangeHandler = (event) => {
        this.setState({ search: event.target.value });
    }

    submitHandler = (type = 'submit') => {
        if (type === 'reset') {
            this.props.onSubmit({});
        }
        else {
            const { sortId, search, filterId, date } = this.state;
            const data = {
                search: search,
                sort: sortId
            };
            if (filterId && date) {
                data[filterId] = date;
            }
            this.props.onSubmit(data);
        }

        this.setState(this.defaultState);

    }

    selectHandler = (type, id, title) => () => {
        if (id === 'none') {
            this.setState({ [type + 'Id']: '', [type + 'Title']: '' });
        }
        else {
            this.setState({ [type + 'Id']: id, [type + 'Title']: title });
        }
    }

    dateChangeHandler = (event) => {
        this.setState({ date: event.target.value });
    }

    render() {

        const { sortId, search, sortTitle, filterTitle, filterId, date } = this.state;

        return (
            <>
                <Navbar bg="light" expand="lg" className={classes.navbar}>
                    <Navbar.Brand href="#">Go for search</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <SplitButton
                                variant='outline-primary'
                                title={sortTitle || 'Sort'}
                                className={classes.navButton}
                            >
                                {this.sort.map(({ id, title }) =>
                                    <Dropdown.Item
                                        key={id}
                                        onClick={this.selectHandler('sort', id, title)}
                                        className={`${sortId === id ? classes.active : ''} ${classes.sortItem}`}
                                    >
                                        {title}
                                    </Dropdown.Item>)
                                }
                            </SplitButton>
                            <SplitButton
                                variant='outline-primary'
                                title={filterTitle || 'Filter'}
                                className={classes.navButton}
                            >
                                {this.filter.map(({ id, title }) =>
                                    <Dropdown.Item
                                        key={id}
                                        onClick={this.selectHandler('filter', id, title)}
                                        className={`${filterId === id ? classes.active : ''} ${classes.sortItem}`}
                                    >
                                        {title}
                                    </Dropdown.Item>)
                                }
                            </SplitButton>
                            <Button variant="outline-primary"  className={classes.navButton} onClick={() => this.submitHandler('reset')}>Reset</Button>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" value={search} onChange={this.inputChangeHandler} />
                            <Button variant="outline-primary" onClick={this.submitHandler} >Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </>
        );
    }
}

Search.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default Search;