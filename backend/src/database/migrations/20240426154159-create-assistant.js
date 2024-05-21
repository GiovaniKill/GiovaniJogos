'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('assistants', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      personality: {
        allowNull: false,
        type: Sequelize.TEXT('medium')
      },
      profilePicPath: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'profile_pic_path'
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('assistants')
  }
}
