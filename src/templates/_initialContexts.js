export const app = {
  tabActive: 1,
  about: '',
  currentWeek: 0,
  nextWeek: null,
  selectedWeek: 0,
  emptyEditor: false
}

export const user = { 
  name: '', 
  email: '', 
  admin: false, 
  adminAsPlayer: false 
}

export const weeks = [{ number: '', name: '', questions: {} }]

export const answers = null

export const about = []

export const editor = { 
  questions: {}, 
  name: '... no week name', 
  active: false, 
  deadline: '' 
}

export const questionInWorkInit = { 
  question: '', 
  total: '', 
  id: null
}