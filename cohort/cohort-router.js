const knex = require("knex");
const router = require("express").Router();

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./data/cohort.db3"
  },
  useNullAsDefault: true
};
const db = knex(knexConfig);

router.get("/", (req, res) => {
  db("cohort")
    .then(cohort => {
      res.status(200).json(cohort);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  db("cohort")
    .where({ id: req.params.id })
    .first()
    .then(cohort => {
      if (cohort) {
        res.status(200).json(cohort);
      } else {
        res.status(404).json({ message: "Cohort not found" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ message: "please provide a name" });
  } else {
    db("cohort")
      .insert(req.body, "id")
      .then(ids => {
        db("cohort")
          .where({ id: ids[0] })
          .first()
          .then(role => {
            res.status(200).json(role);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
});

router.put("/:id", (req, res) => {
  db("cohort")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `${count} ${count > 1 ? "records" : "record"} updated`
        });
      } else {
        res.status(404).json({ message: "Cohort does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  db("cohort")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `${count} ${count > 1 ? "records" : "record"} deleted`
        });
      } else {
        res.status(404).json({ message: "Role does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
