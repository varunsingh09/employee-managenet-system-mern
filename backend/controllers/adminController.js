const asyncHandler = require("express-async-handler");
const Portal = require("./../models/portal");
const Project = require("./../models/project");
const { PortalValidation, ProjectValidation } = require("./../schema/");

const getPortal = asyncHandler(async (req, res) => {
    try {
        const portalData = await  Portal.find()
   // .populate({ path: "projects" })
        res.status(200).send(portalData);

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

const savePortal = asyncHandler(async (req, res) => {
    try {
        const { error } = PortalValidation.validate(req.body);
        if (error) {
            console.log(error);
            res.status(400).send(error.details[0].message);
        } else {
            let newPortal;
            newPortal = {
                PortalName: req.body.PortalName,
                Status: req.body.Status
            };

            const portalData = await Portal.create(newPortal);
            console.log("new Portal Saved");
            console.log(req.body);
            res.status(201).send(portalData);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

const updatePortal = asyncHandler(async (req, res) => {
    try {
        const { error } = PortalValidation.validate(req.body);
        if (error) {
            console.log(error);
            res.status(400).send(error.details[0].message);
        } else {
            let updatePortal;
            updatePortal = {
                PortalName: req.body.PortalName,
                Status: req.body.Status
            };
            const portal = await Portal.findByIdAndUpdate(req.body._id, updatePortal);
            if (portal) {
                console.log("put");
                console.log(req.body);
                res.status(201).send(updatePortal);
            }
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

const deletePortal = asyncHandler(async (req, res) => {
    try {
        const portal = await Portal.findByIdAndRemove({ _id: req.params.id });
        if (portal) {
            console.log("portal deleted");
            res.send(portal);
            const deleted = await Project.deleteMany({ portals: { _id: portal._id } });
            console.log("new Portal Saved");
            console.log("delete");

        }
        console.log(req.params.id);
    } catch (err) {
        res.status(500).send(err);
    }
});

const getProjectBid = asyncHandler(async (req, res) => {
    try {
        const project = await Project.find()
            .populate("portals");

        res.status(200).send(project);

    } catch (err) {
        res.status(500).send(err);
    }
});

const saveProjectBid = asyncHandler(async (req, res) => {
    try {
        const { error } = ProjectValidation.validate(req.body);
        if (error) {
            console.log(error);
            res.status(400).send(error.details[0].message);
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
            await Project.create(project);
            res.status(201).send(project);
            console.log("new project Saved");
        }
        console.log(req.body);


    } catch (err) {
        res.status(500).send(err);
    }
});

const updateProjectBid = asyncHandler(async (req, res) => {
    try {
        const { error } = ProjectValidation.validate(req.body);
        if (error) {
            console.log(error);
            res.status(400).send(error.details[0].message);
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

            await Project.findByIdAndUpdate(req.params.id, updateProject)
            res.status(201).send(updateProject);
            console.log("put");
            console.log(req.body);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

const deleteProjectBid = asyncHandler(async (req, res) => {
    try {
        const project = Project.findByIdAndRemove({ _id: req.params.id });
        console.log("project deleted");
        res.status(201).send(project);
        console.log("delete");
        console.log(req.params.id);
    } catch (err) {
        res.status(500).send(err);
    }
});


module.exports = {
    getPortal, savePortal, updatePortal, deletePortal,
    getProjectBid, saveProjectBid, updateProjectBid, deleteProjectBid
};
