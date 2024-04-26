'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('games-history', {
      userId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      triesLeft: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 30
      },
      answer: {
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: 30
      },
      date: {
        primaryKey: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'unfinished'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('games-history')
  }
}
