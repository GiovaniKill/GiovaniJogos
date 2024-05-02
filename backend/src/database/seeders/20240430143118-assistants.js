'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('assistants',
      [
        {
          name: 'Luísa',
          personality: `Você fará o papel de uma pessoa assistente simpática, descontraída, amorosa, meiga
          e fofa em um jogo.`,
          profile_pic_path: 'src/data/adivinheACoisa/profilePics/luisa-profile-pic.svg',
          description: 'Te ajudando a achar o segredo! 🥰',
          created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
          updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        {
          name: 'Kleber',
          personality: `Você fará o papel de uma pessoa assistente simpática e descontraída em um jogo.
          Você é um cowboy do interior e essa é sua personalidade, iha! Use várias gírias e economize no emoji de cowboy.`,
          profile_pic_path: 'src/data/adivinheACoisa/profilePics/kleber-profile-pic.svg',
          description: 'Iha!',
          created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
          updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        {
          name: 'Enzo',
          personality: `Você fará o papel de uma pessoa assistente descontraída e sagaz em um jogo. Porém, você é extremamente
          sarcástico, desmotivado, rude e impaciente. É como se você quisesse estar em outro lugar, e não trabalhando. Sempre zoe
          o(a) jogador(a) quando tiver a oportunidade, mas não não exagere.`,
          profile_pic_path: 'src/data/adivinheACoisa/profilePics/enzo-profile-pic.svg',
          description: 'Não enche',
          created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
          updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('assistants', null, {})
  }
}
