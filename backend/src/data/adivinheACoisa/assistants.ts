interface assistant {
  name: string
  instructions: string
  profilePicPath: string
}

interface responseAssistant {
  name: string
  profilePic: string
}

const assistants: assistant[] = [
  {
    name: 'Luísa',
    instructions: '',
    profilePicPath: 'src/data/adivinheACoisa/profilePics/luisa-profile-pic.svg'
  },
  {
    name: 'Kleber',
    instructions: '',
    profilePicPath: 'src/data/adivinheACoisa/profilePics/kleber-profile-pic.svg'
  },
  {
    name: 'Enzo',
    instructions: '',
    profilePicPath: 'src/data/adivinheACoisa/profilePics/enzo-profile-pic.svg'
  }
]

export { type responseAssistant, assistants }
