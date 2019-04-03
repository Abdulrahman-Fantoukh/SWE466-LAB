import React, { Component } from 'react'
import { connect } from 'react-redux'
import { makeid } from '../../helper'
class TaskDetails extends Component {

    renderPredecessorList = () => {
        const predecessorList = this.props.task.dependencies.predecessor.map(task => {
            return (
                <li>{task.taskName}</li>
            )
        })
        return predecessorList
    }
    renderSuccessorList = () => {
        const successorList = this.props.task.dependencies.predecessorTo.map(task => {
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
                <hr />
            </div>
        )
    }
    
    
    render() {

        let text = makeid()
      
        var sdate = this.props.task.startDate.split("T")
        var stime = sdate[1].split(":")[0] + ":" + sdate[1].split(":")[1]
        var edate = this.props.task.endDate.split("T")
        var etime = edate[1].split(":")[0] + ":" + edate[1].split(":")[1]
        return (
            <div>
                <button type="button" class="btn btn-outline-primary btn-sm" data-toggle="modal" data-target={"#" + text} >
                    Task Details
                </button>
                <div class="modal fade" id={text} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title" id="exampleModalLabel">{this.props.task.name}</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body container">
                                <div className="row">
                                    <div className="col-12">
                                        <label>Start Date : {sdate[0]} {stime} </label>
                                    </div>
                                    <div>
                                        <label>End Date : {edate[0]} {etime} </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <label>Duration: {this.props.task.duration} Days</label>
                                    </div>
                                </div>
                                <hr />
                                {this.renderDependencies()}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo,
        projectInContext: state.projectInContext
    }
}

export default connect(mapStateToProps)(TaskDetails)