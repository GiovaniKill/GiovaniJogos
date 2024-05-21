'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'first_name'
      },
      lastName: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'last_name'
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        allowNull: true,
        type: Sequelize.STRING
      },
      subscription: {
        allowNull: true,
        type: Sequelize.STRING,
        unique: true
      },
      profilePicPath: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'profile_pic_path'
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        field: 'updated_at',
        defaultValue: Sequelize.NOW
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users')
  }
}
