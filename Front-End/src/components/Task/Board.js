import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreateTask from './CreateTask'
import ProjectSubBar from '../layout/projectSubBar';
import { deleteTask, submitTask } from '../../store/actionCreators/taskActions'
import TaskDetails from './TaskDetails';
import ModifyTask from './ModifyTask'
import Navbar from '../layout/Navbar'
import { normalizeDate } from '../../helper'

class Board extends Component {
    constructor(props) {
        super(props)
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleDelete = (task_id) => {
        this.props.deleteTask(task_id, this.props.projectInContext)
    }
    renderDeleteTask = (task) => {
        return (
            <div className="tooltips">
            <button title="Delete task" className="close deleteTask" data-dismiss="alert" aria-label="Close" onClick={() => { this.handleDelete(task._id, this.props.projectInContext._id) }} key={task._id}>
                <i className="material-icons">highlight_off</i>
            </button>
            <span className="tooltiptext">Delete Task</span>
            </div>
        )
    }
    renderCreateTaskButton = () => {
        return (
            <CreateTask project={this.props.projectInContext} />
        )
    }

    arePredecessorsSubmitted = task => {
        var result = true
        this.props.projectInContext.tasks.forEach(element => {
            task.dependencies.predecessor.forEach(pred => {
                if (element._id === pred.taskId && element.status !== "SUBMITTED") {
                    result = false
                }
            })
        })
        return result
    }

    renderSubmissionButton = (task) => {
        if (task.status !== "SUBMITTED") {
            if (!this.arePredecessorsSubmitted(task)) {
                return (
                    <div>
                        <button title="Not all predecessor tasks are submitted" className="btn btn-info btn-sm" onClick={() => { this.handleTaskSubmission(task) }} disabled>Submit Task</button>
                    </div>
                )
            }
            return (<div>
                <button className="btn btn-info btn-sm" onClick={() => { this.handleTaskSubmission(task) }}>Submit Task</button>
            </div>
            )
        }
    }

    handleTaskSubmission = (task) => {
        let payload = {
            task,
            project: this.props.projectInContext,
            userInfo: this.props.userInfo
        }
        this.props.submitTask(payload)
    }

    setTaskLength = () => {
        var tasks = this.props.projectInContext.tasks
        this.setState({
            taskLength: tasks.length
        })
    }
    renderTasks = () => {
        let number = 0
        let taskList
        var tasks = this.props.projectInContext.tasks
        taskList = tasks.map(task => {
                let startDate = normalizeDate(task.startDate).date[0] + " " + normalizeDate(task.startDate).time
                let endDate = normalizeDate(task.endDate).date[0] + " " + normalizeDate(task.endDate).time
                let rowColor = ""
                let taskStatus = ""
                if (task.status === "SUBMITTED") { rowColor = "task-done"; taskStatus = "Done" }
                else { rowColor = "task-todo"; taskStatus = "To Do" }
                return (
                    <tr className={rowColor + " task taskBorder spaceUnder"}>
                        <th scope="row" width="10" id="taskNumber">{++number}</th>
                        <td>
                            {task.name}
                        </td>
                        <td>
                            {taskStatus}
                        </td>
                        <td>
                            {task.duration}
                        </td>
                        <td>
                            {startDate}
                        </td>
                        <td>
                            {endDate}
                        </td>
                        <td>
                            {this.calculateCost(task)}
                        </td>
                        <td>
                            <TaskDetails task={task} number={number} />
                        </td>
                        <td><ModifyTask tasks={tasks} task={task} /></td>
                        <td id="lastTB">{this.renderDeleteTask(task)}</td>
                    </tr>
                )
            })
        return taskList

    }
    renderEmptyState = () => {
        return (
            <img className="noTasks" src={require('../../images/No-Tasks.png')} width="350" height="350" />
        )
    }
    calculateCost = (task) => {
        let cost = 0
        task.assignedResources.map(resource => {
            if(resource.ovt <= 0){
            cost += (resource.StRate * 8 * task.duration) * resource.maxNoOfResources
            }else {
                cost += (resource.StRate * 8 * task.duration * resource.ovt) * resource.maxNoOfResources 
            }
        })
        return cost
    }
    calculateProjectCost = () => {
        let cost = 0
        this.props.projectInContext.tasks.map(task => {
            cost += this.calculateCost(task)
        })
        return cost
    }

    render() {
        let tasks = this.props.projectInContext.tasks.length ? (
            <div>
                <Navbar />
                <ProjectSubBar />
                <div className="table-responsive tasksTableContainer">
                    <table class="table table-sm tasksList" id="albums" cellspacing="0">
                        <thead className="alert-secondary" >
                            <tr>
                                <th className="tasksTableHeaderFirst" scope="col" width="70">Task Number</th>
                                <th scope="col" width="150">Task Name</th>
                                <th scope="col" width="100">Status</th>
                                <th scope="col" width="100">Duration</th>
                                <th scope="col" width="150">Start Date</th>
                                <th scope="col" width="150">Finish Date</th>
                                <th scope="col" width="150">Total Cost</th>
                                    <th></th><th></th><th className="tasksTableHeaderLast"></th>
                            </tr>
                        </thead>
                        <tbody className="alert-secondary">
                            {this.renderTasks()}
                            <tr>
                                <th className="taskTableFooterFirst" scope="col" width="100">Total Cost</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>{this.calculateProjectCost()}</th>
                                <th></th>
                                <th></th>
                                <th className="taskTableFooterLast"></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                    {this.renderCreateTaskButton()}
                <div id="footer"></div>
            </div>

        ) : (
                <div>
                    <Navbar />
                    <ProjectSubBar />
                    {this.renderEmptyState()}
                    {this.renderCreateTaskButton()}
                </div>
            )
        return (
            tasks
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projectInContext: state.projectInContext,
        projects: state.projects,
        userInfo: state.userInfo
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteTask: (task_id, project) => dispatch(deleteTask(task_id, project)),
        submitTask: (payload) => dispatch(submitTask(payload)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Board)