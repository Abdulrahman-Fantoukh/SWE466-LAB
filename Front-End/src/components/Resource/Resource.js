import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddResource from './addResource'
class Resource extends Component {
    
    renderResources = () => {

        const resourcesList = this.props.projectInContext.resources.map(resource=>{
            return(
                <div>
                {resource.name} {resource.kind}
                </div>
                )
        })
        return resourcesList
    }
    render(){
        return(
            <div>
            <p>here are the resources</p>
            <div>
                {this.renderResources()}
            </div>
            <AddResource/>
            </div>
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
export default connect(mapStateToProps)(Resource)