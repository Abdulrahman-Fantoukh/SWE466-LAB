import React, { Component } from 'react';
import './App.css';
import Login from './components/accessing the system/login';
import WelcomeScreen from './components/accessing the system/WelcomeScreen'
import { Switch, Route, withRouter } from 'react-router-dom'
import Register from './components/accessing the system/register';
import Home from './components/initiating project/Home';
import RequireAuth from './HOCs/require_auth';
import { connect } from 'react-redux'
import CreateProject from './components/initiating project/createProject';
import { authenticate, fetchUserInfo } from './store/actionCreators/authAction'
import { fetchUserProjects, setProject } from './store/actionCreators/projectActions';
import Board from './components/Task/Board';
import qs from 'query-string'
import Axios from 'axios';
import Resource from './components/Resource/Resource';

class App extends Component {


  componentWillMount() {
    const token = localStorage.getItem('token');//name of cookie. NOT TO BE CONFUSED WITH API TOKEN !!!!!!!!!!!!
    if (token) {
      this.props.fetchUserInfo(token)
      this.props.fetchUserProjects(token)
      this.props.authenticate()
      console.log(this.props.location)
      if (this.props.location.hash !== "") {// will excecute this if he is redirected from DBX
        const parsedData = qs.parse(this.props.location.hash, { ignoreQueryPrefix: true })
        const payload = {
          access_token : parsedData.access_token,
          token_type : parsedData.token_type,
          account_id : parsedData.account_id,
          userEmail: token
        }
        console.log(payload)
        Axios.post("http://localhost:3333/dropbox/setAccessToken", { payload }).then((res) => {
          this.props.setUserInfo(res.data)
        }).catch((execption) => {
          console.log(execption)
        })
      }
    }

  }

  render() {

    return (



      <div className="App">
        <Switch>
          <Route exact path='/' component={WelcomeScreen} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route exact path='/home' component={RequireAuth(Home)} />
          <Route path='/home/newproject' component={RequireAuth(CreateProject)} />
          <Route path='/home/board' component={RequireAuth(Board)} />
          <Route path='/home/resource' component={RequireAuth(Resource)}/>
        </Switch>

      </div>

    );
  }
}



const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    authenticate: () => {
      dispatch({ type: "AUTHENTICATE_THE_USER" })
    },
    fetchUserInfo: (userEmail) => dispatch(fetchUserInfo(userEmail)),
    fetchUserProjects: (userEmail) => dispatch(fetchUserProjects(userEmail)),
    setProject: (project) => dispatch(setProject(project)),
    setUserInfo : userInfo => dispatch(({type: "SET_USER_INFO", userInfo}))
  }
}



export default withRouter(connect(null, mapDispatchToProps)(App))