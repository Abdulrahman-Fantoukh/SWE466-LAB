import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {setProject} from '../../store/actionCreators/projectActions'


class ProjectCard extends Component {

    setProjectCookie = (project ,projectId) =>  {
       // localStorage.setItem("currentProject", projectId)
        this.props.setProject(projectId)
    }
    render() {
        const projects = this.props.projects
        const projectsList = projects.length ? (
            projects.map((project) => {
                if(project.status === "STOPPED"){
                    return
                }
                return (
                    <div className="card bg-light col-sm-3" key={project._id} >
                        <div className="card-body">
                            <h4 className="card-title">{project.title}</h4>
                            <Link onClick= {() => this.setProjectCookie(project, project._id)} to={{ pathname: "/home/board", state: { project } }} className="card-link">Open Project</Link>
                        </div>
                    </div>
                )
            })) : (<div className="col-sm">You Have No Running Projects</div>)

        return (
            <div className="row">
                {projectsList}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.projects,
        userInfo: state.userInfo 
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
    setProject : (project) => dispatch(setProject(project))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard)