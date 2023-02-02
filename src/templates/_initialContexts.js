export const app = {
  tabActive: 1,
  about: '',
  currentWeek: 0,
  nextWeek: null,
  selectedWeek: 0,
  emptyEditor: false,
  isItYou: true,
  otherUserUID: null,
  otherUserName: null,
  alert: false
}

export const user = { 
  name: '', 
  email: '', 
  admin: false, 
  adminAsPlayer: true 
}

export const weeks = [{ number: '', name: '', questions: {} }]

export const about = []

export const editor = { 
  questions: {}, 
  name: '', 
  active: false, 
  deadline: '' 
}

export const questionInWorkInit = { 
  question: '', 
  total: '', 
  id: null
}
