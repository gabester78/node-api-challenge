const express = require("express");
const router = express.Router();
const server = express();
const actions = require("./helpers/actionModel");

server.use(express.json());

router.get("/", (req, res) => {
  actions
    .get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Projects not found" });
    });
});

router.get("/:id", (req, res) => {
  actions
    .get(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Project not found." });
    });
});

router.post("/", (req, res) => {
  actions
    .insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Unable to post the project." });
    });
});

router.put("/:id", (req, res) => {
  actions
    .update(req.params.id, req.body)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Unable to update the project." });
    });
});

router.delete("/:id", (req, res) => {
  actions
    .remove(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Unable to delete the project." });
    });
});

module.exports = router;
