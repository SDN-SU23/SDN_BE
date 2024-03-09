"use strict";

const ReportService = require("../services/report.service");

class ReportController {
  getAllReports = async (req, res) => {
    try {
      const reports = await ReportService.getAllReports();
      res.status(200).json({
        status: 200,
        data: reports,
      });
    } catch (error) {
      console.error("Error retrieving reports:", error);
      res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  };

  createReport = async (req, res) => {
    try {
      const data = await ReportService.createReport(req.body);
      res.status(201).json({
        status: 201,
        data: data,
      });
    } catch (error) {
      console.error("Error creating report:", error);
      res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  };

  getReportByID = async (req, res) => {
    try {
      const report = await ReportService.getReportByID(req.params.reportId);
      if (!report) {
        return res.status(404).json({
          status: 404,
          message: "Report not found",
        });
      }
      res.status(200).json({
        status: 200,
        data: report,
      });
    } catch (error) {
      console.error("Error retrieving report by ID:", error);
      res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  };

  updateReport = async (req, res) => {
    try {
      const updatedReport = await ReportService.updateReport(req.params.reportId, req.body);
      if (!updatedReport) {
        return res.status(404).json({
          status: 404,
          message: "Report not found",
        });
      }
      res.status(200).json({
        status: 200,
        data: updatedReport,
      });
    } catch (error) {
      console.error("Error updating report:", error);
      res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  };

  deleteReport = async (req, res) => {
    try {
      const deletedReport = await ReportService.deleteReport(req.params.reportId);
      if (!deletedReport) {
        return res.status(404).json({
          status: 404,
          message: "Report not found",
        });
      }
      res.status(200).json({
        status: 200,
        data: deletedReport,
      });
    } catch (error) {
      console.error("Error deleting report:", error);
      res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  };

  updateStatusReport = async (req, res) => {
    try {
      const updatedReport = await ReportService.updateStatusReport(req.params.reportId, req.body.status);

      res.status(200).json({
        status: 200,
        data: updatedReport,
      });
    } catch (error) {
      console.error("Error updating report status:", error);
      res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  };
}

module.exports = new ReportController();
