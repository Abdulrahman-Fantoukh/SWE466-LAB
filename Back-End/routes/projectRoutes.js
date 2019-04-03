const express = require('express');
const projectRoute = express.Router()
const projects = require('../models/projects')
const mongoose = require('../dbConfig/databaseCon')
const users = require('../models/users');

projectRoute.post('/newproject', function (req, res) {
    let project = {
        title: req.body.project.title,
        projectManager: req.body.project.projectManager,
        status: 'RUNNING',
    }
    projects.create(project).then(function (project) {
        res.status(200).send(project)
    }).catch(function (error) {
        console.log(error)
        res.status(500)
    });
});

projectRoute.get('/getUserProjects', function (req, res) {
    mongoose.model('projects').find({ "projectManager": req.query.userEmail },
        function (err, userProjects) {
            if (err) {
                res.status(500)
            }
            res.status(200).send(userProjects)
        })
});

projectRoute.post('/deleteproject', function (req, res) {
    mongoose.model("projects").findByIdAndUpdate(req.body.project._id, {"status" : "STOPPED"}).then(function(record){
        res.status(200).send(record)
    }).catch(function(exception){
        res.status(500).send(exception)
    })
})

projectRoute.post('/removeResources', function (req, res) {
    mongoose.model("projects").findByIdAndUpdate(req.body.project._id, { $pull: { "resources": { _id: req.body.resource._id } } }).then(function (record) {
        res.status(200).send(record)
    }).catch(function (err) {
        console.log(err)
    })
})

projectRoute.post('/newResource', function (req, res) {
    console.log(req.body.payload.project)
    const resource = {
        name: req.body.payload.resource.name,
        kind: req.body.payload.resource.kind,
        material:req.body.payload.resource.material,
        maxNoOfResources:req.body.payload.resource.maxNoOfResources,
        StRate: req.body.payload.resource.StRate,
        ovt:req.body.payload.resource.ovt,
        CostPerUse:req.body.payload.resource.CostPerUse
    }
    console.log(resource,"resource")
    mongoose.model("projects").findByIdAndUpdate(req.body.payload.project, { $push: { "resources": resource } },{ new: true }).then(function (record) {
        res.status(200).send(record)
    }).catch(function (err) {
        console.log(err)
    })

})


module.exports = projectRoute