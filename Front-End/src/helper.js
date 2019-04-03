import { default as Chatkit } from '@pusher/chatkit-server';

export const makeid = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

export const normalizeDate = (date) => {
    var date = date.split("T")
    var time = date[1].split(":")[0] + ":" + date[1].split(":")[1]
    const normalizedDate = {
        date,
        time
    }
    return normalizedDate
}
export const isResourceAssigned = (task, resource) => {
    var result = false 
    const assignedResources = task.assignedResources
    assignedResources.forEach(assignedResource => {
        if (resource.email === assignedResource.email) {
            result = true
        }
    })
    return result
}


export const getAbsoluteValue = (number) => {  
        if(number < 0)
            return number * -1;
        return number;
}

export const isTaskSubmitted = (taskId, project) =>{
    var result = false
    project.tasks.forEach(task=>{
        if(task._id === taskId && task.status === "SUBMITTED"){
            result = true
        }
    })
    return result
}

export const isTaskPending = (taskId, project) =>{
    var result = false
    project.tasks.forEach(task=>{
        if(task._id === taskId && task.status === "PENDING_FOR_CONFIRMATION"){
            result = true
        }
    })
    return result
}

export const isOutputTaskSubmitted = (outputOf, project) =>{
    let result = true
    project.tasks.forEach(task=>{
        task.outputDocuments.forEach(output=>{
            if(output.name === outputOf && task.status !== "SUBMITTED"){
                result = false
            }
        })
    })
    return result
}

export const isTaskOfOutputSubmitted = (inputDoc, project) =>{ //this method checks whether the task of the doc with storageReference passed is submitted or not
    let result= false
        project.tasks.forEach(task=>{
            task.outputDocuments.forEach(outDoc=>{
                if((outDoc.storageReference === inputDoc.storageReference && task.status ==="SUBMITTED")){
                    result = true
                    
                }
            })
        })
        return result
    
}