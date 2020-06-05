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
      res.status(500).json({ error: "Actions not found" });
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  actions
    .get(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Action not found." });
    });
});

router.post("/", validateProjectId, (req, res) => {
  actions
    .insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Unable to post the action." });
    });
});

router.put("/:id", validateProjectId, (req, res) => {
  actions
    .update(req.params.id, req.body)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Unable to update the action." });
    });
});

router.delete("/:id", validateProjectId, (req, res) => {
  actions
    .remove(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Unable to delete the action." });
    });
});

function validateProjectId(req, res, next) {
  actions
    .get(req.params.id)
    .then((id) => {
      if (id) {
        next();
      } else {
        res.status(404).send("The id doesn't exsist.");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error validating id");
    });
}

module.exports = router;
