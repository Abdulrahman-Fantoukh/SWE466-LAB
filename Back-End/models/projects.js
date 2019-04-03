const mongoose = require('mongoose')
const schema = mongoose.Schema;
const projectsSchema = new schema({
    title: {
        type: String,
        required: true
    },
    creator: {
        type: String
    },
    status: {
        type: String,
        enum: ["RUNNING", "STOPPED"]
    },
    projectManager: {
        type:String,
        required: true
    },
    resources: [{
        name: String,
        kind: {
            type: String,
            enum: ["Work", "Material", "Cost"]
        },
        material: String,
        maxNoOfResources: Number,
        StRate: String,
        ovt:String,
        CostPerUse:String
    }],
    tasks: [{
        name: String,
        status: {
            type: String,
            enum: ["TO_DO"," SUBMITTED"]
        },
        startDate: Date,
        endDate: Date,
        duration: Number,
        dependencies: {
            Date: Date,
            predecessor: [{
                taskName: String,
                taskId: String
            }],
            predecessorTo: [{
                taskName: String,
                taskId: String
            }],
        },
        assignedResources: [{
            name: String,
        }],
    }]
})

const Projects = mongoose.model('projects', projectsSchema)

module.exports = Projects
