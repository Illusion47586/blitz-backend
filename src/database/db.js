const { Sequelize, DataTypes } = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/transaction.db'
})

const transaction = db.define('transaction', {
    I_type: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    I_subtype: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    I_color: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    O_type: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    O_subtype: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    O_color: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    freq : {
        type: DataTypes.INTEGER
    }
})


exports = module.exports = {db, transaction}
