import axios from 'axios'

export const createProjectAction = (project, userInfo) => {
    return (dispatch, getState) => {
        //async call to database. after that the dispatcher is sent 
        
            axios.post('http://localhost:3333/project/newproject', { project , userInfo }).then((res) => {
                this.setChatId(res.data)
            dispatch({ type: "CREATE_PROJECT", project: res.data })

            }).catch((exception) => {
                console.log(exception)
            })
    }
}


//this action creator is used to fetch projects from the database. With thunk also
export const fetchUserProjects = (userEmail) => {
    return (dispatch, getState) => {
        axios.get('http://localhost:3333/project/getUserProjects?userEmail=' + userEmail).then((res) => {
            console.log(res.data, "in fetch projects action")
            dispatch({ type: "SET_USER_PROJECTS", projects: res.data })
        }).catch((exception) => {
            console.log(exception)
        })
    }
}
export const setProject = (project) => {
    return (dispatch) => {
        dispatch({ type: "SET_PROJECT", project })
    }
}