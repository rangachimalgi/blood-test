import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import fs from "fs";
import util from "util";
import Order from "../models/Orders.js";
import archiver from "archiver";
import { sendEmail } from "./emailHelper.js";

const writeFile = util.promisify(fs.writeFile);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const sendReportsByEmail = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).send("Order not found.");
    }

    if (!order.reports || order.reports.length === 0) {
      return res.status(404).send("No reports available for this order.");
    }

    // Create ZIP in-memory
    const archive = archiver("zip");
    const buffers = [];
    archive.on("data", (data) => buffers.push(data));
    archive.on("end", async () => {
      const buffer = Buffer.concat(buffers);

      try {
        // Now send this buffer as an attachment
        await sendEmail(
          order.email,
          "Your Reports",
          "Attached are your reports in a ZIP format.",
          [
            {
              filename: `reports-${order._id}.zip`,
              content: buffer,
            },
          ]
        );
        res.status(200).send("Reports sent to email successfully.");
      } catch (emailErr) {
        console.error("Error sending email:", emailErr);
        res.status(500).send("Error sending reports by email.");
      }
    });

    order.reports.forEach((report) => {
      const reportPath = path.join(__dirname, "..", report);
      archive.file(reportPath, { name: path.basename(report) });
    });

    archive.finalize();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error processing request.");
  }
};

export const downloadReports = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).send("Order not found.");
    }

    if (!order.reports || order.reports.length === 0) {
      return res.status(404).send("No reports available for this order.");
    }

    const archive = archiver("zip");

    // ✅ Set proper headers
    res.setHeader("Content-Disposition", `attachment; filename=reports-${order._id}.zip`);
    res.setHeader("Content-Type", "application/zip");

    // ✅ Pipe archive into response
    archive.pipe(res);

    // ✅ Add each file to archive
    order.reports.forEach((report) => {
      const reportPath = path.join(__dirname, "..", report.storedPath || report); // support both old and new format
      archive.file(reportPath, { name: path.basename(reportPath) });
    });

    // ✅ Finalize archive (sends ZIP)
    archive.finalize();

  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error downloading reports.");
  }
};

export const uploadReport = async (req, res) => {
  try {
    console.log("🛬 Entered uploadReport controller");
    console.log("req.files:", req.files);
    console.log("req.params:", req.params);
    console.log("req.body:", req.body);

    if (!req.files || !Array.isArray(req.files)) {
      return res.status(400).send("No files were uploaded or the uploaded files structure is unexpected.");
    }

    // Ensure the uploads/reports directory exists
    const reportsDir = path.join(__dirname, "../uploads/reports");
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    const order = await Order.findById(req.params.orderId);
    if (!order) {
      console.error("❌ Order not found for ID:", req.params.orderId);
      return res.status(404).send("Order not found.");
    }

    const fileWritePromises = req.files.map(async (reportFile) => {
      const timestamp = Date.now();
      const uniqueName = `${timestamp}-${Math.random().toString(36).slice(2)}-${reportFile.originalname}`;
      const uploadPath = path.join(reportsDir, uniqueName);

      try {
        await writeFile(uploadPath, reportFile.buffer);
        console.log("✅ File written:", uploadPath);
      } catch (err) {
        console.error("❌ File write error:", err);
      }

      order.reports.push({
        originalName: reportFile.originalname,
        storedPath: `/uploads/reports/${uniqueName}`,
      });
    });

    await Promise.all(fileWritePromises);

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Error updating order" });
  }
};
