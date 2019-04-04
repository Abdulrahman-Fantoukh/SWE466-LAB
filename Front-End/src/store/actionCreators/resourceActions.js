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

export const removeResources = (resource, project) => {
    console.log(resource,"remove action here")
    console.log(project,"OJ")
    return (dispatch, getState) => {
        let payload = { resource, project }   //Change to resource
        axios.post('http://localhost:3333/project/removeResources', { payload }).then((res) => {
            payload = {...payload, res}
            dispatch({ type: "REMOVE_RESOURCE", payload })
            console.log(res)
        })
    }
}