import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addResource } from '../../store/actionCreators/resourceActions'

class AddResource extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name:"",
            kind:"",
            material:"",
            maxNoOfResources:0,
            StRate: "",
            ovt:"",
            CostPerUse:""
        }
    }
    handleChanges = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log("in submit")
        var max = this.state.maxNoOfResources / 100
        console.log(max)
        let resource = {
            name: this.state.name,
            kind:this.state.kind,
            material:this.state.material,
            maxNoOfResources:max,
            StRate: this.state.StRate,
            ovt:this.state.ovt,
            CostPerUse:this.state.CostPerUse,
        }
        console.log(this.props.projectInContext)
        this.props.addResource(resource,this.props.projectInContext, this.props.userInfo)
    }

    render(){
        return(
            <div>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addResource">
                    Add Resource
                    </button>
                <div class="modal fade" id="addResource" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Create task</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div class="form-group">
                                        <label for="name">Resource name</label>
                                        <input class="form-control" id="name" placeholder="Resource name" onChange={this.handleChanges} required/><br /><br />
                                    </div>
                                    <div class="form-group">
                                        <label>Resource type: </label>
                                        <select name="kind" id="kind" onChange={this.handleChanges} required>
                                            <option value="Work" default>Work</option>
                                            <option value="Material">Material</option>
                                            <option value="Cost">Cost</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-group" id="material" placeholder="material" onChange={this.handleChanges}/>
                                    </div>
                                    <div class="form-group">
                                        <label>Maximum Number Of Resources : </label>
                                        <select name="maxNoOfResources" id="maxNoOfResources" onChange={this.handleChanges} required>
                                            <option value="0"></option>
                                            <option value="10">10%</option>
                                            <option value="20">20%</option>
                                            <option value="30">30%</option>
                                            <option value="40">40%</option>
                                            <option value="50">50%</option>
                                            <option value="60">60%</option>
                                            <option value="70">70%</option>
                                            <option value="80">80%</option>
                                            <option value="90">90%</option>
                                            <option value="100">100%</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-group" id="StRate" placeholder="Standard Rate" onChange={this.handleChanges} required/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-group" id="ovt" placeholder="ovt" onChange={this.handleChanges}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-group" id="CostPerUse" placeholder="CostPerUse" onChange={this.handleChanges}/>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="submit" class="btn btn-primary">Add</button>
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
const mapStateToProps = (state) => {
    return {
        projectInContext: state.projectInContext,
        projects: state.projects,
        userInfo: state.userInfo
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addResource: (resource, project, userInfo) => { dispatch(addResource(resource, project, userInfo)) },
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddResource)

