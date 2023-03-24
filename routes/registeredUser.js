const authController = require("../controllers/authController");
const middlewareController = require("../controllers/middlewareController");
const registereredUserController = require("../controllers/registeredUserController"); //

const router = require("express").Router();


// CREATE REGISTER USER
router.post("/signup/:iduser", middlewareController.verifyToken, registereredUserController.registeredUser);

// GET ALL REGISTERED USERS
router.get("/list",registereredUserController.getRegisteredUsers);

// UPDATE REGISTER USER
router.post("/:id/update", middlewareController.verifyTokenAndAdminAuth, registereredUserController.updateRegisteredUser);

// DELETE REGISTER USER
router.delete("/:id/delete", middlewareController.verifyTokenAndAdminAuth, registereredUserController.deleteRegisteredUser);

module.exports = router;