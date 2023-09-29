const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const verifyAdmin = asyncHandler(async (req, res, next) => {
    console.log(req.headers["authorization"]);
    const Header = req.headers["authorization"];

    if (typeof Header !== "undefined") {
        // decodedData = jwt.decode(req.headers['authorization']);
        // if(decodedData.account)
        jwt.verify(Header, jwtKey, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                console.log(authData);
                if (authData.account == 1) {
                    next();
                } else {
                    res.sendStatus(403);
                }
            }
        });
    } else {
        // Forbidden
        res.sendStatus(403);
    }
});

const verifyAdminHR = asyncHandler(async (req, res, next) => {
    console.log(req.headers["authorization"]);
    const Header = req.headers["authorization"];

    if (typeof Header !== "undefined") {
        // decodedData = jwt.decode(req.headers['authorization']);
        // if(decodedData.account)
        jwt.verify(Header, jwtKey, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                console.log(authData);
                if (authData.account == 1 || authData.account == 2) {
                    next();
                } else {
                    res.sendStatus(403);
                }
            }
        });
    } else {
        // Forbidden
        res.sendStatus(403);
    }
});

const verifyHR = asyncHandler(async (req, res, next) => {
    console.log(req.headers["authorization"]);
    const Header = req.headers["authorization"];

    if (typeof Header !== "undefined") {
        // decodedData = jwt.decode(req.headers['authorization']);
        // if(decodedData.account)
        jwt.verify(Header, jwtKey, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                console.log(authData);
                if (authData.account == 2) {
                    next();
                } else {
                    res.sendStatus(403);
                }
            }
        });
    } else {
        // Forbidden
        res.sendStatus(403);
    }
});

const verifyHREmployee = asyncHandler(async (req, res, next) => {
    console.log(req.headers["authorization"]);
    const Header = req.headers["authorization"];

    if (typeof Header !== "undefined") {
        // decodedData = jwt.decode(req.headers['authorization']);
        // if(decodedData.account)
        jwt.verify(Header, jwtKey, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                console.log(authData);
                if (authData.account == 2) {
                    next();
                } else if (authData.account == 3) {
                    if (authData._id == req.params.id) {


                        next();
                    }
                    else {
                        res.sendStatus(403);

                    }


                } else {
                    res.sendStatus(403);
                }
            }
        });
    } else {
        // Forbidden
        res.sendStatus(403);
    }
});

const verifyEmployee = asyncHandler(async (req, res, next) => {
    console.log(req.headers["authorization"]);
    const Header = req.headers["authorization"];

    if (typeof Header !== "undefined") {
        // decodedData = jwt.decode(req.headers['authorization']);
        // if(decodedData.account)
        jwt.verify(Header, jwtKey, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                if (authData._id == req.params.id) {
                    console.log(authData);
                    if (authData.account == 3) {
                        next();
                    } else {
                        res.sendStatus(403);
                    }
                } else {
                    res.sendStatus(403);
                }
            }
        });
    } else {
        // Forbidden
        res.sendStatus(403);
    }
});






module.exports = { verifyAdmin, verifyAdminHR, verifyHR, verifyHREmployee, verifyEmployee };
