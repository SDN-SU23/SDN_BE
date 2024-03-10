"use strict";

const Report = require("../models/report.model");

class ReportService {
  static getAllReports = async (query) => {
    try {
      const result = await Report.find().limit(query.pageSize).skip((query.currentPage - 1) * query.pageSize).lean();
      return {
        result,
        currentPage: query.currentPage,
        pageSize: query.pageSize,
        totalPage: Math.ceil(await Report.countDocuments() / query.pageSize)
      }
    } catch (error) {
      throw new Error("Error retrieving reports: " + error.message);
    }
  };

  static createReport = async (data) => {
    try {
      const result = await Report.create(data);
      return result;
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

  static updateStatusReport = async (id, status) => {
    try {
      return await Report.findByIdAndUpdate
        (id, { status: status }, { new: true });
    }
    catch (error) {
      throw new Error("Error updating report status: " + error.message);
    }
  }

  static deleteReport = async (id) => {
    try {
      return await Report.findByIdAndDelete(id);
    } catch (error) {
      throw new Error("Error deleting report: " + error.message);
    }
  };
}

module.exports = ReportService;
