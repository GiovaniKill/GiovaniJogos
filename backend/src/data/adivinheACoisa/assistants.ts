interface assistant {
  name: string
  instructions: string
  profilePicPath: string
  description: string
}

interface responseAssistant {
  name: string
  profilePic: string
  description: string
}

const assistants: assistant[] = [
  {
    name: 'Luísa',
    instructions: '',
    profilePicPath: 'src/data/adivinheACoisa/profilePics/luisa-profile-pic.svg',
    description: 'Te ajudando a achar o segredo!'
  },
  {
    name: 'Kleber',
    instructions: '',
    profilePicPath: 'src/data/adivinheACoisa/profilePics/kleber-profile-pic.svg',
    description: 'Iha!'
  },
  {
    name: 'Enzo',
    instructions: '',
    profilePicPath: 'src/data/adivinheACoisa/profilePics/enzo-profile-pic.svg',
    description: 'Não enche'
  }
]

export { type responseAssistant, assistants }
