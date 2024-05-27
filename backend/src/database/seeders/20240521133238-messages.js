'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const baseDate = new Date()
    await queryInterface.bulkInsert('messages', [
      {
        message: 'Olá, tudo bem?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 60000),
        updated_at: new Date(baseDate.getTime() + 60000)
      },
      {
        message: 'Tudo, e com você?',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 70000),
        updated_at: new Date(baseDate.getTime() + 70000)
      },
      {
        message: 'Estou bem também!',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 80001),
        updated_at: new Date(baseDate.getTime() + 80001)
      },
      {
        message: 'Que bom! Como posso te ajudar hoje?',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 81002),
        updated_at: new Date(baseDate.getTime() + 81002)
      },
      {
        message: 'Eu tenho que descobrir qual a coisa secreta, né?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 82003),
        updated_at: new Date(baseDate.getTime() + 82003)
      },
      {
        message: 'Isso mesmo! Me faça uma pergunta sobre ela.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 83004),
        updated_at: new Date(baseDate.getTime() + 83004)
      },
      {
        message: 'Ok, essa coisa é verde?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 84005),
        updated_at: new Date(baseDate.getTime() + 84005)
      },
      {
        message: 'Pode ser.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 85006),
        updated_at: new Date(baseDate.getTime() + 85006)
      },
      {
        message: 'Essa coisa é de metal?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 86007),
        updated_at: new Date(baseDate.getTime() + 86007)
      },
      {
        message: 'Normalmente não.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 87008),
        updated_at: new Date(baseDate.getTime() + 87008)
      },
      {
        message: 'Essa coisa usa eletricidade?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 88009),
        updated_at: new Date(baseDate.getTime() + 88009)
      },
      {
        message: 'Não usa.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 89010),
        updated_at: new Date(baseDate.getTime() + 89010)
      },
      {
        message: 'Essa coisa é pesada?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 90011),
        updated_at: new Date(baseDate.getTime() + 90011)
      },
      {
        message: 'Não é.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 91012),
        updated_at: new Date(baseDate.getTime() + 91012)
      },
      {
        message: 'Essa coisa é de vestir?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 92013),
        updated_at: new Date(baseDate.getTime() + 92013)
      },
      {
        message: 'Não.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 93014),
        updated_at: new Date(baseDate.getTime() + 93014)
      },
      {
        message: 'Essa coisa é encontrada na cozinha?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 94015),
        updated_at: new Date(baseDate.getTime() + 94015)
      },
      {
        message: 'Normalmente não.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 95016),
        updated_at: new Date(baseDate.getTime() + 95016)
      },
      {
        message: 'Essa coisa pode ser perigosa?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 96017),
        updated_at: new Date(baseDate.getTime() + 96017)
      },
      {
        message: 'Eu diria que não.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 97018),
        updated_at: new Date(baseDate.getTime() + 97018)
      },
      {
        message: 'Essa coisa é uma ferramenta?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 98019),
        updated_at: new Date(baseDate.getTime() + 98019)
      },
      {
        message: 'De certo modo, sim!',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 99020),
        updated_at: new Date(baseDate.getTime() + 99020)
      },
      {
        message: 'Essa coisa é de barro ou argila?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 100021),
        updated_at: new Date(baseDate.getTime() + 100021)
      },
      {
        message: 'Geralmente, não.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 101022),
        updated_at: new Date(baseDate.getTime() + 101022)
      },
      {
        message: 'Essa coisa é de plástico?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 102023),
        updated_at: new Date(baseDate.getTime() + 102023)
      },
      {
        message: 'Geralmente, sim!',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 103024),
        updated_at: new Date(baseDate.getTime() + 103024)
      },
      {
        message: 'Essa coisa é cara?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 104025),
        updated_at: new Date(baseDate.getTime() + 104025)
      },
      {
        message: 'Não.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 105026),
        updated_at: new Date(baseDate.getTime() + 105026)
      },
      {
        message: 'Essa coisa é de madeira?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 106027),
        updated_at: new Date(baseDate.getTime() + 106027)
      },
      {
        message: 'Pode ser.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 107028),
        updated_at: new Date(baseDate.getTime() + 107028)
      },
      {
        message: 'Essa coisa é de metal?',
        role: 'user',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 108029),
        updated_at: new Date(baseDate.getTime() + 108029)
      },
      {
        message: 'Não.',
        role: 'assistant',
        assistant_id: '1',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 109030),
        updated_at: new Date(baseDate.getTime() + 109030)
      },
      {
        message: 'Essa coisa é usada no trabalho?',
        role: 'user',
        assistant_id: '2',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 110031),
        updated_at: new Date(baseDate.getTime() + 110031)
      },
      {
        message: 'Depende do seu trabalho, mas geralmente, não.',
        role: 'assistant',
        assistant_id: '2',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 111032),
        updated_at: new Date(baseDate.getTime() + 111032)
      },
      {
        message: 'Essa coisa é importante para a sociedade?',
        role: 'user',
        assistant_id: '2',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 112033),
        updated_at: new Date(baseDate.getTime() + 112033)
      },
      {
        message: 'Eu diria que não.',
        role: 'assistant',
        assistant_id: '2',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 113034),
        updated_at: new Date(baseDate.getTime() + 113034)
      },
      {
        message: 'Essa coisa é maleável?',
        role: 'user',
        assistant_id: '3',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 114035),
        updated_at: new Date(baseDate.getTime() + 114035)
      },
      {
        message: 'Talvez, um pouco.',
        role: 'assistant',
        assistant_id: '3',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 115036),
        updated_at: new Date(baseDate.getTime() + 115036)
      },
      {
        message: 'Essa coisa é de madeira?',
        role: 'user',
        assistant_id: '3',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 116037),
        updated_at: new Date(baseDate.getTime() + 116037)
      },
      {
        message: 'Sim.',
        role: 'assistant',
        assistant_id: '3',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 117038),
        updated_at: new Date(baseDate.getTime() + 117038)
      },
      {
        message: 'Essa coisa é um pente?',
        role: 'user',
        assistant_id: '3',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 118039),
        updated_at: new Date(baseDate.getTime() + 118039)
      },
      {
        message: 'Sim, parabéns!',
        role: 'assistant',
        assistant_id: '3',
        user_id: '1',
        created_at: new Date(baseDate.getTime() + 119040),
        updated_at: new Date(baseDate.getTime() + 119040)
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('messages', null, {})
  }
}
