import axios from 'axios'

export const createTask = (project, task) => {
    return (dispatch) => {
        console.log(project, "this is project")
        console.log(task, "this task")
        const payload = { project, task }
        axios.post('http://localhost:3333/task/newTask', { payload }).then((res) => {
            const payload = { project, task, res }
            dispatch({ type: "CREATE_TASK", payload })
            console.log(res, "response from back end")
        }).catch((exception) => {
            console.log(exception)
        })

    }
}

export const deleteTask = (task_id, project) => {
    return (dispatch) => {
        console.log(task_id, ", Task ID")
        console.log(project._id, ", Project ID")
        const PID = project._id
        const payload = { task_id, PID}
        axios.post('http://localhost:3333/task/deleteTask', { payload }).then((res) => {
            const payload = { task_id, PID, res }
            dispatch({ type: "DELETE_TASK", payload })
            console.log(res, "Response")
        }).catch((exception) => {
            console.log(exception)
        })
    }
}


export const setDependancy = (payload) => {
    return (dispatch) => {
        axios.post('http://localhost:3333/task/setDependancy', { payload }).then((res) => {
            console.log(res)
            payload = { ...payload, res }
            dispatch({ type: "MODIFY_TASK", payload })
        }).catch((exception) => {
            console.log(exception)
        })
    }
}

export const submitTask = (payload) => {  //1
    return (dispatch) => {
        axios.post("http://localhost:3333/task/submitTask", { payload }).then((res) => {
            payload = { ...payload, res }
            dispatch({ type: "MODIFY_TASK", payload })
        }).catch((exception) => {
            console.log(exception)
        })
    }
}

export const confirmTaskSubmission = (payload) => { //2
    return (dispatch) => {
        axios.post('http://localhost:3333/task/confirmTaskSubmission', { payload }).then((res) => {
            console.log(res)
            payload = { ...payload, res }
            dispatch({ type: "MODIFY_TASK", payload })
        }).catch((exception) => {
            console.log(exception)
        })
    }
}

export const editTask = (payload) => {
    return (dispatch) => {
        axios.post('http://localhost:3333/task/editTask', { payload }).then((res) => {
            console.log(res)
            payload = { ...payload, res }
            dispatch({ type: "MODIFY_TASK", payload })
        }).catch((exception) => {
            console.log(exception)
        })
    }
}

export const assignResource = (payload) => {  //3
    return (dispatch) => { 
        axios.post('http://localhost:3333/task/assignResource', { payload }).then((res) => {
            console.log(res)
            payload = { ...payload, res }
            console.log(payload, "CHECKING!")  
            dispatch({ type: "MODIFY_TASK", payload })
        }).catch((exception) => {
            console.log(exception)
        })
    }
}

export const unAssignResource = payload => {
    return (dispatch) => {
        axios.post('http://localhost:3333/task/unAssignResource', { payload }).then((res) => {
            console.log(res)
            payload = { ...payload, res }
            dispatch({ type: "MODIFY_TASK", payload })
        }).catch((exception) => {
            console.log(exception)
        })
    }
}


export const removeDependency = payload => {
    return (dispatch) => {
        axios.post('http://localhost:3333/task/removeDependency', { payload }).then((res) => {
           
            payload = { ...payload, res }
             dispatch({type:"MODIFY_TASK", payload})
        }).catch((exception) => {
            console.log(exception)
        })
    }
}
