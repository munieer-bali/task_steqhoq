const { Sequelize, DataTypes } = require('sequelize');

// Konfigurasi koneksi MySQL
const sequelize = new Sequelize('task', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    timestamps: false,
});

module.exports = { Task, sequelize };