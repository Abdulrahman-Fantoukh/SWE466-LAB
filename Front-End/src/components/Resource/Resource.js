import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddResource from './addResource'
import { removeResources } from '../../store/actionCreators/resourceActions';
import Navbar from '../layout/Navbar';
import ProjectSubBar from '../layout/projectSubBar'

class Resource extends Component {
    
    renderResources = () => {
        const resourcesList = this.props.projectInContext.resources.map(resource => {
            let rowColor = ""
            let resourceKind = ""
            if(resource.kind === 'Work') {rowColor = "task-todo"; resourceKind = "Work"}
            else if(resource.kind === "Material") {rowColor = "task-wfc"; resourceKind = "Material"}
            else if(resource.kind === "Cost") {rowColor = "task-done"; resourceKind = "Cost"}
            return(
                 <tr className={rowColor + " task taskBorder spaceUnder"}>
                        <th id="taskNumber">
                            {resource.name}
                        </th>
                        <td>
                            {resourceKind}
                        </td>
                        <td>
                            {resource.material}
                        </td>
                        <td>
                            {resource.maxNoOfResources * 100}%
                        </td>
                        <td>
                            {resource.StRate}$/hr
                        </td>
                        <td>
                            {resource.ovt}
                        </td>
                        <td>
                            {resource.CostPerUse}
                        </td>
                        <td></td>
                        <td></td>
                        <td scope="col" width="350"></td>
                        <td id="lastTB">{this.renderDeleteResource(resource)}</td>
                    </tr>
                )
        })
        return resourcesList
    }
    renderDeleteResource = (resource) => {
        return (
            <div className="tooltips">
                <button title="Delete resource" className="close deletResource" data-dismiss="alert" aria-label="Close" onClick={() => { this.handleDelete(resource, this.props.projectInContext) }} key={resource._id}>
                    <i className="material-icons">highlight_off</i>
                </button>
                    <span className="tooltiptext">Delete Resource</span>
            </div>
            
        )
    }
    handleDelete = (resource) => {
        return (
            this.props.removeResources(resource, this.props.projectInContext)
        )
    }
    render(){
            let resources = this.props.projectInContext.resources.length ? (
                <div>
                    <Navbar />
                    <ProjectSubBar />
                    <div className="table-responsive tasksTableContainer">
                        <table class="table table-sm tasksList" id="albums" cellspacing="0">
                            <thead className="alert-secondary" >
                                <tr>
                                    <th className="tasksTableHeaderFirst" scope="col" width="70">Resource Name</th>
                                    <th scope="col" width="350">Type (List)</th>
                                    <th scope="col" width="200">Material</th>
                                    <th scope="col" width="200">Max (No. of Source)</th>
                                    <th scope="col" width="200">St. Rate</th>
                                    <th scope="col" width="200">Ovt.</th>
                                    <th scope="col" width="300">Cost/Use</th>
                                        <th></th><th></th><th></th><th></th><th className="tasksTableHeaderLast"></th>
                                </tr>
                            </thead>
                            <tbody className="alert-secondary">
                                {this.renderResources()}
                            </tbody>
                        </table>
                    </div>
                    <AddResource/>
                    <div id="footer"></div>
                </div>
    
            ) : (
                    <div>
                        <Navbar />
                        <ProjectSubBar />
                        <AddResource/>
                    </div>
                )
            return (
                resources
            )
    }
            /* <div>
                <Navbar />
                <ProjectSideBar />
            <p>here are the resources</p>
            <div>
                {this.renderResources()}
            </div>
            <AddResource/>
</div> */}
const mapStateToProps = (state) => {
    return {
        projectInContext: state.projectInContext,
        projects: state.projects,
        userInfo: state.userInfo
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeResources: (resource, project, userInfo) => { dispatch(removeResources(resource, project, userInfo))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Resource)