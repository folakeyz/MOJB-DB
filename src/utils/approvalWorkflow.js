// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Connect to MongoDB
mongoose.connect("mongodb://localhost/workflows", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Mongoose schema for the workflow
const workflowSchema = new mongoose.Schema({
  name: String,
  status: {
    type: String,
    enum: ["draft", "active", "approved", "rejected"],
    default: "draft",
  },
  stages: [
    {
      name: String,
      description: String,
      approvals: {
        type: Number,
        default: 1,
      },
      approvedBy: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
  ],
});

// Create a Mongoose schema for the workflow history
const workflowHistorySchema = new mongoose.Schema({
  workflowId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workflow",
  },
  stage: Number,
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  approvedAt: Date,
});

// Create a Mongoose model for the workflow
const Workflow = mongoose.model("Workflow", workflowSchema);

// Create a Mongoose model for the workflow history
const WorkflowHistory = mongoose.model(
  "WorkflowHistory",
  workflowHistorySchema
);

// Create an Express app
const app = express();

// Parse JSON bodies
app.use(bodyParser.json());

// Define the approval middleware
const requireApproval = async (req, res, next) => {
  const { workflowId, stage } = req.params;
  const { userId } = req.body;

  try {
    // Retrieve the workflow from the database
    const workflow = await Workflow.findById(workflowId);

    // Check if the user has already approved the stage
    if (workflow.stages[stage].approvedBy.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User has already approved this stage" });
    }

    // Check if the user has the necessary permissions to approve the stage
    if (
      workflow.stages[stage].approvedBy.length >=
      workflow.stages[stage].approvals
    ) {
      return res.status(400).json({
        message: "Stage has already been approved by all required users",
      });
    }

    // Add the user to the approvedBy array
    workflow.stages[stage].approvedBy.push(userId);

    // Update the workflow in the database
    await workflow.save();

    // Add an entry to the workflow history
    await WorkflowHistory.create({
      workflowId,
      stage,
      approvedBy: userId,
      approvedAt: new Date(),
    });

    // Call the next middleware or route handler
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Define the workflow initiation route
app.post("/workflows", async (req, res) => {
  const { name, stages } = req.body;

  try {
    // Create a new workflow instance
    const workflow = await Workflow.create({
      name,
      stages,
    });

    // Send a response to the client
    res.json({ message: "Workflow created", workflow });
  } catch (err) {
    console.error(err);
  }
});

// Define the workflow status update route
app.put("/workflows/:workflowId/status", async (req, res) => {
  const { workflowId } = req.params;
  const { status } = req.body;

  try {
    // Update the workflow status in the database
    const workflow = await Workflow.findByIdAndUpdate(workflowId, { status });

    // Send a response to the client
    res.json({ message: "Workflow status updated", workflow });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Define the workflow stage approval route
app.post(
  "/workflows/:workflowId/stages/:stage/approvals",
  requireApproval,
  async (req, res) => {
    const { workflowId, stage } = req.params;
    const { userId } = req.body;

    try {
      // Send a response to the client
      res.json({ message: "Stage approved" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
