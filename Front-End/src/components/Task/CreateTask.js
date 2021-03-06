import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createTask } from '../../store/actionCreators/taskActions'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class CreateTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            startDate: new Date(),
            endDate: new Date(),
            duration: 0,
            redirect: false,
            durationAlert: <div></div>
        }
      }

    handleStartDateChange = (date) => {   //for DATEPICKER
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

    handleChanges = (e) => {
        console.log(e.target.value)
        this.setState({
            [e.target.id]: e.target.value,
        })
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
    handleSubmit = (e) => {
        e.preventDefault()
        if(this.state.duration < 0){this.displayDurationAlert(); return}
        console.log("in submit")
        let task = {
            name: this.state.name,
            status : "TO_DO",
            duration : this.state.duration,
            startDate: this.state.startDate,
            endDate: this.state.endDate
        }
        console.log(this.props.project)
        console.log(task)
        this.props.createTask(this.props.project, task)
    }

    render() {
        return (
            <div>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#createTask">
                    Create task
                    </button>
                <div class="modal fade" id="createTask" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Create task</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            {this.state.durationAlert}
                            <div class="modal-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div class="form-group">
                                        <label for="name">Task name</label>
                                        <input class="form-control" id="name" placeholder="Task name" onChange={this.handleChanges} required/><br /><br />
                                        <div className="centered">
                                            <label className="label" htmlFor="startDate">Start Date: </label>
                                            <DatePicker className="form-control" selected={this.state.startDate} onChange={this.handleStartDateChange} /><br /><br />
                                        </div>
                                        <div>
                                            <label className="label" htmlFor="startDate">End Date: </label>
                                            <DatePicker className="form-control" selected={this.state.endDate} onChange={this.handleEndDateChange} /><br /><br />
                                        </div>
                                        <label className="label" htmlFor="Duration">Duration: </label>
                                        <input id="duration" value={this.state.duration} readOnly required/>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="submit" class="btn btn-primary">Create</button>
                                    </div>
                                </form>
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
        createTask: (project, task) => { dispatch(createTask(project, task)) },
    }
}

export default connect(null,mapDispatchToProps)(CreateTask);