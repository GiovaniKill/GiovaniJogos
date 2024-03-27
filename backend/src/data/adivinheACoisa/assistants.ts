interface assistant {
  name: string
  instructions: string
  profilePicPath: string
}

interface responseAssistant {
  name: string
  profilePic: string
}

const assistants: [assistant] = [
  {
    name: 'Luísa',
    instructions: '',
    profilePicPath: 'src/data/adivinheACoisa/profilePics/assistant-profile-pic.svg'
  }
]

export { type responseAssistant, assistants }
