import React, { Component } from 'react'
import { makeid } from '../../helper'
import DatePicker from "react-datepicker";
import { connect } from 'react-redux'
import { setDependancy, editTask, assignResource, unAssignResource, removeDependency } from '../../store/actionCreators/taskActions'


class ModifyTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            startDate: this.props.task.startDate,
            endDate: this.props.task.endDate,
            duration: this.props.task.duration,
            predecessor: "",
            successor: "",
            redirect: false,
            durationAlert: <div></div>
        }
    }

    handleStartDateChange = (date) => {   //for DATEPICKER
        console.log(this.props.task.startDate)
        console.log(date)
        this.setState({
            startDate: date,
            duration: this.convertDuration(this.state.endDate - date)
        });
        console.log(this.state.startDate)
    }

    handleEndDateChange = (date) => {
            this.setState({
                endDate: date,
                duration: this.convertDuration(date - this.state.startDate)
            });
    }
    convertDuration = (duration) => {
        return Math.ceil(((((duration / 1000 ) / 60 ) / 60 ) / 24 ) )
    }
    displayDurationAlert = () => {
        let error = <div className="alert alert-danger" role="alert" onClick={this.closeDurationAlert}>
                                Invalid duration !
                        <button type="button" className="close" aria-label="Close" >
                            <i className="material-icons ">highlight_off</i>
                        </button>
                    </div>
        this.setState({
            durationAlert:error
        })
    }
    closeDurationAlert = () => {
        this.setState({
            durationAlert: <div></div>
        })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    handleEdit = () => {
        if(this.state.duration < 0){this.displayDurationAlert(); return}
        const payload = {
            name: this.state.name,
            description: this.state.description,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            duration: this.state.duration,
            project: this.props.projectInContext,
            task: this.props.task,

        }

        this.props.editTask(payload)
    }
    setDependancy = (task) => {
        const payload = {
            predecessorTask: task,
            taskInContext: this.props.task,
            project: this.props.projectInContext
        }
        this.props.setDependancy(payload)
    }
    renderTaskDropdown = () => {
        let flag = false
        const tasks = this.props.projectInContext.tasks.map(task => {
            this.props.task.dependencies.predecessor.forEach(element => {
                if (element.taskId === task._id) {
                    flag = true
                }
            })
            if (flag) {
                return
            }
            if (this.props.task._id === task._id) {
                return
            }
            return (
                <a className="dropdown-item" value={task.name} onClick={() => { this.setDependancy(task) }}>{task.name}</a>
            )
        })
        return tasks
    }
    handelRemoveDependency = task => {
        const payload = {
            taskInContext: this.props.task,
            targetTask: task,
            project: this.props.projectInContext
        }
        this.props.removeDependency(payload)
    }
    renderRemoveDepenedencyButton = (task) => {
        return (
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => { this.handelRemoveDependency(task) }}>
                <i className="material-icons ">highlight_off</i>
            </button>
        )
    }
    renderPredecessorList = () => {
        const predecessorList = this.props.task.dependencies.predecessor.map(task => {
            if (this.props.task.name === task.taskName) {
                return
            }
            return (
                <li>{task.taskName} {this.renderRemoveDepenedencyButton(task)}</li>
            )
        })
        return predecessorList
    }
    renderSuccessorList = () => {
        const successorList = this.props.task.dependencies.predecessorTo.map(task => {
            if (this.props.task.name === task.taskName) {
                return
            }
            return (
                <li>{task.taskName}</li>
            )
        })
        return successorList
    }
    renderDependencies = () => {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <h5>Dependencies</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <label>Predecessor Tasks :</label>
                    </div>
                    <div className="col-3">
                        {this.renderPredecessorList()}
                    </div>
                    <div className="col-3"></div>
                    <div className="col-2"></div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <label>Successor Tasks :</label>
                    </div>
                    <div className="col-2">
                        {this.renderSuccessorList()}
                    </div>
                </div>
            </div>
        )
    }
    renderTeamMembers = () => {
        const resources = this.props.projectInContext.resources.map(resource => {
            if (this.searchForAssignement(resource)) {
                return (
                    <a class="dropdown-item" onClick={() => { this.handleAssign(resource) }}>{resource.name}</a>
                )
            }
        })
        return resources
    }
    searchForAssignement = (resource) => {
        const assignedResources = this.props.task.assignedResources
        if (assignedResources.find(aResource => { return aResource.name === resource.name })) { return false }
        else { return true }
    }
    renderAssignButton = () => {
            return (
                <div class="dropdown">
                    <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                        Assign resource
                    </button>
                    <div class="dropdown-menu">
                        {this.renderTeamMembers()}
                    </div>
                </div>
            )
    }
    handleAssign = (resource) => {
        const payload = {
            resource: resource,
            task: this.props.task,
            project: this.props.projectInContext,
        }
        this.props.assignResource(payload)
    }
    renderUnAssignButton = (resource) => {
        return (
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => { this.handleUnassign(resource) }}>
                <i className="material-icons ">highlight_off</i>
            </button>
        )
    }
    handleUnassign = (resource) => {
        const payload = {
            resource: resource,
            task: this.props.task,
            project: this.props.projectInContext
        }
        this.props.unAssignResource(payload)
    }
    renderAssignedResources = () => {
        const assignedResources = this.props.task.assignedResources.map(resource => {
            return (
                <div className="col">
                    <p className="inline" on>{resource.name}</p>
                    {this.renderUnAssignButton(resource)}
                </div>
            )
        })
        return assignedResources
    }

    render() {
        let text = makeid()
        return (
            <div className="editTask">
                <div className="tooltips">
                    <button title="Edit task" className="close" aria-label="Close" data-toggle="modal" data-target={"#" + text}>
                        <i class="material-icons">edit</i>
                    </button>
                    <span className="tooltiptext">Edit Task</span>
                </div>
                <div class="modal fade" id={text} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">{this.props.task.name}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            {this.state.durationAlert}
                            <div class="modal-body">
                                <div class="form-group">
                                    <label for="name">Task name</label>
                                    <input type="text" class="form-control" id="name" placeholder={this.props.task.name} onChange={this.handleChange} required />


                                    <div className="centered">
                                        <label className="label" htmlFor="startDate">Start Date: </label>
                                        <DatePicker className="form-control" selected={this.state.startDate} onChange={this.handleStartDateChange} /><br /><br />
                                        <label className="label" htmlFor="endDate">End Date: </label>
                                        <DatePicker className="form-control" selected={this.state.endDate} onChange={this.handleEndDateChange} /><br /><br />
                                        <label className="label" htmlFor="Duration">Duration: </label>
                                        <input id="duration" onChange={this.handleChange} required readOnly value={this.state.duration}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col align-self-end">
                                        <button className="btn btn-primary btn-sm" onClick={this.handleEdit}>edit task</button>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-12">
                                        <h5>Assign members</h5>
                                    </div>
                                </div>
                                <div className="row">
                                    {this.renderAssignButton()}
                                    {this.renderAssignedResources()}
                                </div>
                                <hr />

                                {this.renderDependencies()}


                                <div className="row">
                                    <div className="col-12">
                                        <div class="dropdown">
                                            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                                                Tasks
                                        </button>
                                            <div className="dropdown-menu">
                                                {this.renderTaskDropdown()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


const mapDispatchToProps = (dispatch) => {
    return {
        setDependancy: (payload) => { dispatch(setDependancy(payload)) },
        editTask: (payload) => { dispatch(editTask(payload)) },
        assignResource: (payload) => { dispatch(assignResource(payload)) },
        setDependancy: (payload) => { dispatch(setDependancy(payload)) },
        editTask: (payload) => { dispatch(editTask(payload)) },
        unAssignResource: (payload) => { dispatch(unAssignResource(payload)) },
        removeDependency: payload => { dispatch(removeDependency(payload)) },
    }
}

const mapStateToProps = (state) => {
    return {
        projectInContext: state.projectInContext,
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyTask)