'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('messages', [
      {
        message: 'Olá, tudo bem?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Tudo, e com você?',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Estou bem também!',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Que bom! Como posso te ajudar hoje?',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Eu tenho que descobrir qual a coisa secreta, né?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Isso mesmo! Me faça uma pergunta sobre ela.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Ok, essa coisa é verde?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Pode ser.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Essa coisa é de metal?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Normalmente não.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Essa coisa usa eletricidade?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Não usa.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Essa coisa é pesada?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Não é.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Essa coisa é de vestir?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Não.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Essa coisa é encontrada na cozinha?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Normalmente não.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Essa coisa pode ser perigosa?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Eu diria que não.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Essa coisa é uma ferramenta?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'De certo modo, sim!',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Essa coisa é de barro ou argila?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Geralmente, não.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Essa coisa é de plástico?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Geralmente, sim!',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Essa coisa é cara?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Não.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Essa coisa é de madeira?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Pode ser.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Essa coisa é de metal?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Não.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Essa coisa é usada no trabalho?',
        role: 'user',
        assistant_id: '2',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Depende do seu trabalho, mas geralmente, não.',
        role: 'assistant',
        assistant_id: '2',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Essa coisa é importante para a sociedade?',
        role: 'user',
        assistant_id: '2',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Eu diria que não.',
        role: 'assistant',
        assistant_id: '2',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Essa coisa é maleável?',
        role: 'user',
        assistant_id: '3',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Talvez, um pouco.',
        role: 'assistant',
        assistant_id: '3',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Essa coisa é de madeira?',
        role: 'user',
        assistant_id: '3',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Sim.',
        role: 'assistant',
        assistant_id: '3',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Essa coisa é um pente?',
        role: 'user',
        assistant_id: '3',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Sim, parabéns!',
        role: 'assistant',
        assistant_id: '3',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('messages', null, {})
  }
}
