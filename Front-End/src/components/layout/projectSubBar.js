import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {setProject} from '../../store/actionCreators/projectActions'
class ProjectSubBar extends Component{
    constructor(props) {
        super(props)
        this.state = {
            sidebarOpen: false
        }
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }
    
    render() {
        const project = this.props.project
        return (
            <div>
                <input type="checkbox" class="openSidebarMenu toggleCheckBox" id="openSidebarMenu" />
                <label for="openSidebarMenu" class="sidebarIconToggle">
                    <div class="spinner diagonal part-1"></div>
                    <div class="spinner horizontal"></div>
                    <div class="spinner diagonal part-2"></div>
                </label>
                <div id="sidebarMenu">
                    <ul class="sidebarMenuInner">
                        <li><Link to="#"><h1>{project.title}</h1></Link></li>
                        <li><Link to={{ pathname: "/home/board", state: { project} }}>Board</Link></li>
                        <li><Link to='/home/resource'>Resources</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.isAuthenticated,
        userInfo: state.userInfo,
        project : state.projectInContext
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
    setProject : (project) => dispatch(setProject(project))
}
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectSubBar);
