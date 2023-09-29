const asyncHandler = require("express-async-handler");
const Joi = require("joi");
const Portal = require("./../models/portal");
const Project = require("./../models/project");
const { PortalValidation, ProjectValidation } = require("./../schema/");

const getPortal = asyncHandler(async (req, res) => {
    Portal.find()
        .populate({ path: "projects" })
        .exec(function (err, portalData) {
            if (err) {
                res.send("err");
                console.log(err);
            }
            res.send(portalData);
        });
});

const savePortal = asyncHandler(async (req, res) => {
    Joi.validate(req.body, PortalValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let newPortal;
            newPortal = {
                PortalName: req.body.PortalName,
                Status: req.body.Status
            };

            Portal.create(newPortal, function (err, portalData) {
                if (err) {
                    console.log(err);
                    res.send("error");
                } else {
                    res.send(portalData);
                    console.log("new Portal Saved");
                }
            });
            console.log(req.body);
        }
    });
});

const updatePortal = asyncHandler(async (req, res) => {
    Joi.validate(req.body, PortalValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let updatePortal;
            updatePortal = {
                PortalName: req.body.PortalName,
                Status: req.body.Status
            };
            Portal.findByIdAndUpdate(req.body._id, updatePortal, function (
                err,
                Portal
            ) {
                if (err) {
                    res.send("error");
                } else {
                    res.send(updatePortal);
                }
            });
        }

        console.log("put");
        console.log(req.body);
    });
});

const deletePortal = asyncHandler(async (req, res) => {
    Portal.findByIdAndRemove({ _id: req.params.id }, function (err, portal) {
        if (!err) {
            console.log("portal deleted");
            res.send(portal);
            Project.deleteMany({ portals: { _id: portal._id } }, function (err) {
                if (err) {
                    res.send("error");
                    console.log(err);
                }
            });
            console.log("new Portal Saved");
        } else {
            console.log("error");
            res.send("err");
        }
    });
    console.log("delete");
    console.log(req.params.id);
});

const getProjectBid = asyncHandler(async (req, res) => {
    Project.find()
        .populate("portals")
        .exec(function (err, project) {
            if (err) {
                console.log(err);
                res.send("err");
            } else {
                res.send(project);
            }
        });
});

const saveProjectBid = asyncHandler(async (req, res) => {
    Joi.validate(req.body, ProjectValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let project;
            project = {
                ProjectTitle: req.body.ProjectTitle,
                ProjectURL: req.body.ProjectURL,
                ProjectDesc: req.body.ProjectDesc,
                portals: req.body.Portal_ID,
                EstimatedTime: req.body.EstimatedTime,
                EstimatedCost: req.body.EstimatedCost,
                ResourceID: req.body.ResourceID,
                Status: req.body.Status,
                Remark: req.body.Remark
            };
            Project.create(project, function (err, project) {
                if (err) {
                    console.log(err);
                    res.send("error");
                } else {
                    res.send(project);
                    console.log("new project Saved");
                }
            });
            console.log(req.body);
        }
    });
});

const updateProjectBid = asyncHandler(async (req, res) => {
    Joi.validate(req.body, ProjectValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let updateProject;
            updateProject = {
                ProjectTitle: req.body.ProjectTitle,
                ProjectURL: req.body.ProjectURL,
                ProjectDesc: req.body.ProjectDesc,
                portals: req.body.Portal_ID,
                EstimatedTime: req.body.EstimatedTime,
                EstimatedCost: req.body.EstimatedCost,
                ResourceID: req.body.ResourceID,
                Status: req.body.Status,
                Remark: req.body.Remark
            };

            Project.findByIdAndUpdate(req.params.id, updateProject, function (
                err,
                Project
            ) {
                if (err) {
                    res.send("error");
                } else {
                    res.send(updateProject);
                }
            });
        }

        console.log("put");
        console.log(req.body);
    });
});

const deleteProjectBid = asyncHandler(async (req, res) => {
    Project.findByIdAndRemove({ _id: req.params.id }, function (err, project) {
        if (err) {
            console.log("error");
            res.send("err");
        } else {
            console.log("project deleted");
            res.send(project);
        }
    });
    console.log("delete");
    console.log(req.params.id);
});


module.exports = {
    getPortal, savePortal, updatePortal, deletePortal,
    getProjectBid, saveProjectBid, updateProjectBid, deleteProjectBid
};
