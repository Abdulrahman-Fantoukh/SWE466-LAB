const express = require('express');
const taskRoute = express.Router()
const projects = require('../models/projects')
const mongoose = require('../dbConfig/databaseCon')

taskRoute.post('/newTask', function (req, res) {
    let task = {
        name: req.body.payload.task.name,
        status: req.body.payload.task.status,
        startDate: req.body.payload.task.startDate,
        duration: req.body.payload.task.duration,
        endDate: req.body.payload.task.endDate
    }
    mongoose.model("projects").findByIdAndUpdate(req.body.payload.project, { $push: { "tasks": task } }, { new: true }).then(function (record) {

        res.status(200).send(record)
    }).catch(function (err) {
        res.status(500).send(err)
    })
});


taskRoute.post('/deleteTask', function (req, res) {

    mongoose.model("projects").findByIdAndUpdate(req.body.payload.PID, { $pull: { "tasks": { "_id": req.body.payload.task_id } } }, { new: true }).then(function (record) {

        res.status(200).send(record)
    }).catch(function (err) {
        res.status(500).send(err)
    })
});

taskRoute.post('/setDependancy', function (req, res) {
    console.log(req.body.payload)
    const predecessorTask = {
        taskName: req.body.payload.predecessorTask.name,
        taskId: req.body.payload.predecessorTask._id
    }
    const predecessorTo = { taskName: req.body.payload.taskInContext.name, taskId: req.body.payload.taskInContext._id }
    mongoose.model("projects").findByIdAndUpdate(req.body.payload.project._id,
        {
            $push: {
                "tasks.$[taskInContext].dependencies.predecessor": predecessorTask,
                "tasks.$[predecessorTask].dependencies.predecessorTo": predecessorTo
            }
        },
        {
            arrayFilters: [{ "taskInContext._id": mongoose.Types.ObjectId(req.body.payload.taskInContext._id) },
            { "predecessorTask._id": mongoose.Types.ObjectId(req.body.payload.predecessorTask._id) }
            ], new: true
        }
    ).then(function (record) {
        console.log(record, "HI")
        res.status(200).send(record)
    }).catch(function (exception) {
        console.log(exception)
        res.status(500).send(exception)
    })
})

taskRoute.post('/submitTask', function (req, res) {
    mongoose.model("projects").findByIdAndUpdate(req.body.payload.project._id, {$set: {"tasks.$[elem].status": "SUBMITTED",}},
        { arrayFilters: [{ "elem._id": mongoose.Types.ObjectId(req.body.payload.task._id) }], new: true }).then(function (record) {
            res.status(200).send(record)
        }).catch(function (exception) {
            console.log(exception)
            res.status(500).send(exception)
        })
    }
)


taskRoute.post('/editTask', function (req, res) {
    mongoose.model("projects").findByIdAndUpdate(req.body.payload.project._id, {
        $set: {
            "tasks.$[elem].name": req.body.payload.name,
            "tasks.$[elem].description": req.body.payload.description,
            "tasks.$[elem].startDate": req.body.payload.startDate,
            "tasks.$[elem].duration": req.body.payload.duration,
            "tasks.$[elem].endDate": req.body.payload.endDate,
        }
    }, { arrayFilters: [{ "elem._id": mongoose.Types.ObjectId(req.body.payload.task._id) }], new: true }).then(function (record) {
        console.log(record, "edit task")
        res.status(200).send(record)
    }).catch(function (err) {
        res.status(500).send(err)
    })
});

taskRoute.post('/assignResource', function (req, res) {
    newAssignedResources = [...req.body.payload.task.assignedResources, req.body.payload.resource]
    console.log(newAssignedResources)
    mongoose.model("projects").findByIdAndUpdate(req.body.payload.project._id, { $set: { "tasks.$[elem].assignedResources": newAssignedResources } }
        , { arrayFilters: [{ "elem._id": mongoose.Types.ObjectId(req.body.payload.task._id) }], new: true }).then(function (record) {
            console.log(record, "assign task")
            res.status(200).send(record)
        }).catch(function (err) {
            console.log(err)
        })
});

taskRoute.post('/unAssignResource', function (req, res) {
    const assignedResources = req.body.payload.task.assignedResources
    const newAssignedResources = assignedResources.filter(resource => { return resource._id !== req.body.payload.resource._id })
    mongoose.model("projects").findByIdAndUpdate(req.body.payload.project._id, { $set: { "tasks.$[elem].assignedResources": newAssignedResources } }
        , { arrayFilters: [{ "elem._id": mongoose.Types.ObjectId(req.body.payload.task._id) }], new: true }).then(function (record) {
            res.status(200).send(record)
        }).catch(function (err) {
            console.log(err)
        })
})

taskRoute.post('/removeDependency', function (req, res) {
    console.log(req.body)
    const newPredeccessorList = req.body.payload.taskInContext.dependencies.predecessor.filter(element => {
        return element.taskId !== req.body.payload.targetTask.taskId
    })

    mongoose.model("projects").findByIdAndUpdate(req.body.payload.project._id, {
        $set: {
            "tasks.$[taskInContext].dependencies.predecessor": newPredeccessorList
        },
        $pull: {
            "tasks.$[predecessorTask].dependencies.predecessorTo": { taskId: req.body.payload.taskInContext._id }
        }
    },
        {
            arrayFilters: [{ "taskInContext._id": mongoose.Types.ObjectId(req.body.payload.taskInContext._id) },
            { "predecessorTask._id": mongoose.Types.ObjectId(req.body.payload.targetTask.taskId) }
            ], new: true
        }).then(function (record) {
            console.log(record)
            res.status(200).send(record)
        }).catch(function (exception) {
            console.log(exception)
            res.status(500).send(exception)
        })

})
function normalize(text) {
    text = text.replace(/\s/g, '');
    text = text.split(',')
    return text
}
module.exports = taskRoute