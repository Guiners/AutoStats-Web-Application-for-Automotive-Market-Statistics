import express from "express";
const calculationController = require("../controllers/calculationController");
const jwtAuth = require("../middlewear/jwtAuth");

const router = express.Router();

router.route("/min").post(calculationController.calcMin);
// .get(jwtAuth.auth, calculationController.calcMin)

router.route("/max").post(calculationController.calcMax);
// .get(jwtAuth.auth, calculationController.calcMax)

router.route("/avg").post(calculationController.calcAVG);
// .get(jwtAuth.auth, calculationController.calcAVG)

router.route("/median").post(calculationController.calcMedian);
// .get(jwtAuth.auth, calculationController.calcMedian)

router.route("/mode").post(calculationController.calcMode);
// .get(jwtAuth.auth, calculationController.calcMode)

module.exports = router;
