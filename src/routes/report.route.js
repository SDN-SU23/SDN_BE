const express = require("express");
const router = express.Router();
const reportController = require("../controllers/report.controller");
const { checkIsLogin, checkRole } = require('../auth');

router.use(checkIsLogin)

router.post("/", reportController.createReport);

router.use(checkRole('Moderator'))

router.get("/", reportController.getAllReports);

router.get("/:reportId", reportController.getReportByID);

router.delete("/:reportId", reportController.deleteReport);

router.put("/updateReportStatus/:reportId", reportController.updateStatusReport);

module.exports = router;
