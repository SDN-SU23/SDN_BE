"use strict";

const Report = require("../models/report.model");

class ReportService {
  static getAllReports = async () => {
    try {
      return await Report.find();
    } catch (error) {
      throw new Error("Error retrieving reports: " + error.message);
    }
  };

  static createReport = async (data) => {
    try {
      return await Report.create(data);
    } catch (error) {
      throw new Error("Error creating report: " + error.message);
    }
  };

  static getReportByID = async (id) => {
    try {
      return await Report.findById(id);
    } catch (error) {
      throw new Error("Error retrieving report by ID: " + error.message);
    }
  };

  static updateReport = async (id, newData) => {
    try {
      return await Report.findByIdAndUpdate(id, newData, { new: true });
    } catch (error) {
      throw new Error("Error updating report: " + error.message);
    }
  };

  static deleteReport = async (id) => {
    try {
      return await Report.findByIdAndDelete(id);
    } catch (error) {
      throw new Error("Error deleting report: " + error.message);
    }
  };
}

module.exports = ReportService;
