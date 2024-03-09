const express = require("express");
const router = express.Router();
const reportController = require("../controllers/report.controller");

router.post("/", reportController.createReport);
router.get("/", reportController.getAllReports);
router.get("/:reportId", reportController.getReportByID);
router.put("/:reportId", reportController.updateReport);
router.delete("/:reportId", reportController.deleteReport);
router.put("/:reportId/updateReportStatus", reportController.updateStatusReport);

module.exports = router;
