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
      allowNull: false
    },
    altura_max: {
      type: DataTypes.STRING,
      allowNull: false
    },
    peso_min: {
      type: DataTypes.STRING,
    },
    peso_max: {
      type: DataTypes.STRING,
      allowNull: false
    },
    AñosDeVida: {
      type: DataTypes.STRING,
      allowNull: false
    },
    img: {
      type: DataTypes.STRING,
    },
    temperamento: {
      type: DataTypes.STRING,
    }
  });
};
