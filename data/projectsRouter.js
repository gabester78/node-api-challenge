const express = require("express");
const router = express.Router();
const server = express();
const projects = require("./helpers/projectModel");

server.use(express.json());

router.get("/", (req, res) => {
  projects
    .get(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).jeson({ error: "Projects not found." });
    });
});

router.get("/:id", (req, res) => {
  projects
    .get(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).jeson({ error: "Project not found." });
    });
});

router.post("/", (req, res) => {
  projects
    .insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Unable to post the project." });
    });
});

router.delete("/:id", (req, res) => {
  projects
    .remove(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Unable to delete the project." });
    });
});

router.put("/:id", (req, res) => {
  projects
    .update(req.params.id, req.body)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Unable to update the project." });
    });
});

module.exports = router;
