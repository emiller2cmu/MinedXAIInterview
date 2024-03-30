module.exports = app => {
    const models = require("../controllers/backend.controller.js");
  
    var router = require("express").Router();
  
    // Create a new model
    router.post("/", models.create);
  
    // Retrieve all models
    router.get("/", models.findAll);

    // Update model
    router.put("/:id", models.update);

    // Delete model
    router.delete("/:id", models.delete);
  
    app.use('/api/models', router);
  };