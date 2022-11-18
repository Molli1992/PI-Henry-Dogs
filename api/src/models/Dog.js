const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    altura_min: {
      type: DataTypes.STRING,
    },
    altura_max: {
      type: DataTypes.STRING,
    },
    peso_min: {
      type: DataTypes.STRING,
    },
    peso_max: {
      type: DataTypes.STRING,
    },
    AñosDeVida: {
      type: DataTypes.STRING,
    },
    img: {
      type: DataTypes.STRING,
    },
    temperamento: {
      type: DataTypes.STRING,
    }
  });
};
