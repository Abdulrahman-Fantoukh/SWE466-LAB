
const initState = {
    isAuthenticated: false,
    projects: [],
    userInfo: {},
    projectInContext: {},
    users : []
}

const rootReducer = (state = initState, action) => {
    if (action.type === 'AUTHENTICATE_THE_USER') {
        return state = {
            ...state,
            isAuthenticated: true
        }
    }
    if (action.type === 'REMOVE_AUTH') {
        return state = {
            ...state,
            isAuthenticated: false
        }
    }
    if (action.type === "SET_USER_INFO") {
        return state = {
            ...state,
            userInfo: action.userInfo
        }
    }
    if (action.type === "CREATE_PROJECT") {
        console.log(action.project)
        let newProjects = [...state.projects, action.project]
        state = {
            ...state,
            projects: newProjects
        }
        return state
    }
    if (action.type === "SET_USER_PROJECTS") {
        console.log("in reducer")
        return state = {
            ...state,
            projects: action.projects
        }
    }

    if (action.type === "REMOVE_RESOURCE") {
        let newProject = action.payload.project
        console.log(newProject,'EH')
        let newProjectsList = [...state.projects, newProject]
        let newResources = newProject.resources.filter(resource => {return action.payload.resource._id === resource._id})
        console.log(newResources, "new Resources")
        newProject = {
            ...newProject,
            resources: newResources
        }
        console.log(newProject, "the project we modified")
        newProjectsList.push(newProject)
        state = {
            ...state,
            projects: newProjectsList
        }
        console.log(state, "هذي الستييييت")
        return state
    }

    if (action.type === "SET_PROJECT") {
        let newProjectInContext = {}
        state.projects.forEach(project => {
            if (project._id === action.project) {
                newProjectInContext = { ...project }
            }
        })
        return state = {
            ...state,
            projectInContext: newProjectInContext
        }

    }

    if (action.type === "ADD_RESOURCE") {
        console.log("maaaaaaaa")
        console.log(action.payload.res.data)
        const oldProjects = state.projects.filter(project => project._id !== action.payload.project._id)
        const newProjects = [...oldProjects, action.payload.res.data]
        return state = {
            ...state,
            projectInContext: action.payload.res.data,
            projects: newProjects
        }
    }
    if (action.type === "CREATE_TASK") {
        const oldProjects = state.projects.filter(project => project._id !== action.payload.project._id)
        const newProjects = [...oldProjects, action.payload.res.data]
        return state = {
            ...state,
            projectInContext: action.payload.res.data,
            projects: newProjects
        }
    }

    if (action.type === "DELETE_TASK") {
        const oldProjects = state.projects.filter(project => project._id !== action.payload.PID)
        const newProjects = [...oldProjects, action.payload.res.data]
        console.log(newProjects)
        return state = {
            ...state,
            projectInContext: action.payload.res.data,
            projects : newProjects
        }
    }

    if(action.type==="MODIFY_TASK"){
        const oldProjects = state.projects.filter(project => project._id !== action.payload.project._id)
        const newProjects = [...oldProjects, action.payload.res.data]
        return state ={
            ...state,
            projectInContext : action.payload.res.data,
            projects : newProjects
        }
    }

    return state
}

export default rootReducer