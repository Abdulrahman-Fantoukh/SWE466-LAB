import axios from 'axios'

export const addResource = (resource, project, userInfo) => {
    return (dispatch) => {
        let payload = {
            project,
            resource,
            userInfo
        }
        axios.post('http://localhost:3333/project/newResource', { payload }).then((res) => {
            console.log(res)
            payload = {...payload, res }
            dispatch({ type: "ADD_RESOURCE", payload })
        }).catch((exception) => {
            console.log(exception)
        })
    }
}

export const removeResources = (project, member) => {
    console.log("remove action here")
    return (dispatch, getState) => {
        const payload = { project, member }
        axios.post('http://localhost:3333/project/removeResources', { project, member }).then((res) => {
            dispatch({ type: "REMOVE_RESOURCE", payload })
            console.log(res)
        })
    }
}