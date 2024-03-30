const db = require("../models");
const Model = db.model;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Name cannot be empty!"
    });
    return;
  }

  // Create a model
  const model = {
    name: req.body.name,
    runtime: req.body.runtime,
    modelMetric: req.body.modelMetric,
    modelPath: req.body.modelPath,
    trainingLoss: req.body.trainingLoss,
    validationLoss: req.body.validationLoss,
    notes: req.body.notes,
    favorite: req.body.favorite,
  };

  // Save Model in the database
  Model.create(model)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Model."
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Model.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving models."
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Model.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Model was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Model with id=${id}. Maybe Model was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Model with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Model.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Model was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Model with id=${id}. Maybe Model was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Model with id=" + id
      });
    });
};
