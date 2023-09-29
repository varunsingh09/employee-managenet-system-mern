const express = require("express");
const router = express.Router();
const {getRole,saveRole,updateRole,deleteRole} =require("./../controllers/roleController");

const { verifyAdminHR} = require("./../middleware/authMiddleware")

// Routes for Role
router.route("/").get(verifyAdminHR, getRole);

router.route("/").post(verifyAdminHR, saveRole);
router.route("/:id").put(verifyAdminHR, updateRole);
router.route("/:id").delete(verifyAdminHR, deleteRole);


// app.post("/api/role", verifyAdminHR, (req, res) => {

// });

// app.put("/api/role/:id", verifyAdminHR, (req, res) => {

// });
// app.delete("/api/role/:id", verifyAdminHR, (req, res) => {

// });





module.exports = router;
