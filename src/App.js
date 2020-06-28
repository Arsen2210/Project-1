import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavMenu from './components/NavMenu/NavMenu';
import ToDo from './components/containers/Todo/Todo';
import About from './components/containers/About/About';
import Contact from './components/containers/Contact/Contact';
import SingleTask from './components/containers/SingleTask/SingleTask';
import NotFound from './components/containers/NotFound/NotFount';
import Loader from './components/loader/loader';
import { withSnackbar } from 'notistack';
import {connect} from 'react-redux';
import {Route, Switch, Redirect} from 'react-router-dom';

class App extends React.Component{

componentDidUpdate(prevProps){
  if(!prevProps.success && this.props.success){
    this.props.enqueueSnackbar(this.props.success, { 
      variant: 'success',
  });
  return;
  }

  if(!prevProps.error && this.props.error){
    this.props.enqueueSnackbar(this.props.error, { 
      variant: 'error',
  });
  return;
  }

}

  render(){

  return (
    <div className={'App'}>  
    <NavMenu/> 
    <Switch>
    <Route path='/' exact component={ToDo}/>
    <Route path='/about' exact component={About}/>
    <Route path='/contact' exact component={Contact}/>
    <Route path='/task/:id' exact component={SingleTask}/>
    <Route path='/404' exact component={NotFound}/>
    <Redirect to='/404' />
    </Switch>

    {this.props.loading && <Loader/>}
    </div>
  );

  }

}


export default connect((state)=>{
 return {
    error: state.error,
    success: state.success,
    loading:  state.loading
    }
})(withSnackbar(React.memo(App)));