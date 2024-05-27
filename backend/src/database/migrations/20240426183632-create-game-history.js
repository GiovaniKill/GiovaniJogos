'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('games_history', {
      userId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'user_id'
      },
      triesLeft: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 30,
        field: 'tries_left'
      },
      answer: {
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: 30
      },
      date: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'unfinished'
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
    await queryInterface.dropTable('games-history')
  }
}
