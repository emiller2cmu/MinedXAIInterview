module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("model", {
      name: {
        type: Sequelize.STRING
      },
      runtime: {
        type: Sequelize.DATE
      },
      modelMetric: {
        type: Sequelize.STRING
      },
      modelPath: {
        type: Sequelize.STRING
      },
      trainingLoss: {
        type: Sequelize.FLOAT
      },
      validationLoss: {
        type: Sequelize.FLOAT
      },
      notes: {
        type: Sequelize.STRING
      },
      favorite: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Model;
  };