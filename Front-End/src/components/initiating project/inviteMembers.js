import React, { Component } from 'react'
import {connect} from 'react-redux'
import { addResource } from '../../store/actionCreators/projectActions'

class AddResource extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addedResources :"",
        }
    }


    handleChange = (e) =>{
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    handleSubmit = (e) =>{
        e.preventDefault()
        this.props.addResource(this.state.addedResources, this.props.project, this.props.userInfo )
        window.location.reload()// necessery.
    }
    render() {
        return (
            <form>
            <div className="form-group">
                <label>Invite More Members</label>
                <input data-toggle="dropdown"type="text" className="form-control" onChange={this.handleChange} id="addedResources" />
                <small className='form-text text-muted'>Enter each email seperated by commas</small>
                <button type="submit" className="btn btn-primary " onClick= {this.handleSubmit} >Invite Members</button>
            </div>
            </form>
        )
    }
}


const mapStateToProps = (state) =>{
    return{
        userInfo : state.userInfo,
        users : state.users
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        addResource : (addedResources, project , userInfo) => dispatch(addResource(addedResources, project, userInfo)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddResource)