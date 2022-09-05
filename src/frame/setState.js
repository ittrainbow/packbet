export function setState(id, buttons, answers) {
  return {
    'buttons': buttons[id],
    'answers': answers[id]
  }
}