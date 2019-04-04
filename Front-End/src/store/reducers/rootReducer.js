
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
    if (action.type === "REMOVE_RESOURCE" || action.type==="MODIFY_TASK" || action.type === "DELETE_TASK" || action.type === "CREATE_TASK" || action.type === "ADD_RESOURCE") {
        const oldProjects = state.projects.filter(project => project._id !== action.payload.res.data._id)
        const newProjects = [...oldProjects, action.payload.res.data]
        console.log(newProjects)
        return state = {
            ...state,
            projectInContext: action.payload.res.data,
            projects : newProjects
        }
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

    return state
}

export default rootReducer