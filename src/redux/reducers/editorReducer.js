const initialState = {
  loading: false,
  currentWeek: '',
  currentName: '',
  questions: [
    { id: 0, question: 'Аарон Джонс ярдов на выносе больше', total: 85.5 },
    { id: 1, question: 'Кайлин Хилл снепов больше', total: 7.5 },
    { id: 2, question: 'Кристиан Уотсон тачдаун на приеме больше', total: 0.5 }
  ],
  currentQuestion: '',
  currentTotal: '',
  currentID: null,
  currentDeadline: null,
  amountOfWeeks: null,
};

export default function editorReducer(state = initialState, action) {
  switch (action.type) {

    
    default:
      return state;
  }
}