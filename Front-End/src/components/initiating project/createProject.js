import React, { Component } from 'react';
import { connect } from 'react-redux'
import { createProjectAction } from '../../store/actionCreators/projectActions'
import Navbar from '../layout/Navbar'

class CreateProject extends Component {
    constructor(props) {
        super(props)
        console.log(props.userInfo, "create project cons")
    }
    state = {
        projectTitle: "",
        showWarningMessage: false,
        redirect: false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log(e.target.value)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log("in submit")
        if (this.state.projectTitle === "") {
            this.setState({
                showWarningMessage: true
            })
            return
        }
        else {
            let project = {
                projectManager: this.props.userInfo.email,
                title: this.state.projectTitle,
            }
            this.props.createProject(project, this.props.userInfo)
          
            this.props.history.push('/home')
        }
    }

    render() {
        if (this.state.showWarningMessage) {
            this.warningMessage = <div className="alert alert-danger" role="alert">You are Required to Enter a Project Title </div>
        }
        return (
            <div>
            <Navbar />
            <div className="container">
                <form className="dropdown" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Project Title</label>
                        {this.warningMessage}
                        <input type="text" className="form-control" placeholder="e.g. graduation project" onChange={this.handleChange} id="projectTitle" />
                    </div>
                    <button type="submit" className="btn btn-primary " >Create Project</button>
                </form>
            </div>
            </div>
        )
    }

}
const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project, userInfo) => dispatch(createProjectAction(project, userInfo)),
    }
}
const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo,
        users : state.users
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)