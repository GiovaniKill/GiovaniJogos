'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('messages', [
      {
        message: 'Olá, tudo bem?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Tudo, e com você?',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Estou bem também!',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Que bom! Como posso te ajudar hoje?',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Eu tenho que descobrir qual a coisa secreta, né?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Isso mesmo! Me faça uma pergunta sobre ela.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Ok, essa coisa é verde?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Pode ser.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Essa coisa é de metal?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Normalmente não.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Essa coisa usa eletricidade?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Não usa.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Essa coisa é pesada?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Não é.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Essa coisa é de vestir?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Não.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Essa coisa é encontrada na cozinha?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Normalmente não.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Essa coisa pode ser perigosa?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Eu diria que não.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Essa coisa é uma ferramenta?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'De certo modo, sim!',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Essa coisa é de barro ou argila?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Geralmente, não.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Essa coisa é de plástico?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Geralmente, sim!',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Essa coisa é cara?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Não.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Essa coisa é de madeira?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Pode ser.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Essa coisa é de metal?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Não.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Essa coisa é usada no trabalho?',
        role: 'user',
        assistant_id: '2',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Depende do seu trabalho, mas geralmente, não.',
        role: 'assistant',
        assistant_id: '2',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Essa coisa é importante para a sociedade?',
        role: 'user',
        assistant_id: '2',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Eu diria que não.',
        role: 'assistant',
        assistant_id: '2',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Essa coisa é maleável?',
        role: 'user',
        assistant_id: '3',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Talvez, um pouco.',
        role: 'assistant',
        assistant_id: '3',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Essa coisa é de madeira?',
        role: 'user',
        assistant_id: '3',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Sim.',
        role: 'assistant',
        assistant_id: '3',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Essa coisa é um pente?',
        role: 'user',
        assistant_id: '3',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        message: 'Sim, parabéns!',
        role: 'assistant',
        assistant_id: '3',
        user_id: '1',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('messages', null, {})
  }
}
