'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('messages', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      message: {
        allowNull: false,
        type: Sequelize.TEXT('medium')
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'user_id'
      },
      assistantId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'assistants',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'assistant_id'
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        primaryKey: true,
        type: Sequelize.DATE(3),
        field: 'created_at',
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE(3),
        field: 'updated_at',
        defaultValue: Sequelize.NOW
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('messages')
  }
}
