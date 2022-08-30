import {
  SET_EDITOR_CURRENT_WEEK,
  SET_EDITOR_CURRENT_NAME,
  SET_EDITOR_CURRENT_QUESTION,
  SET_EDITOR_CURRENT_TOTAL,
  SET_EDITOR_CURRENT_ID,
  SET_EDITOR_CURRENT_DEADLINE,
  SET_EDITOR_QUESTIONS
} from '../types';

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
  currentID: '',
  currentDeadline: '',
  amountOfWeeks: null,
  currentHash: null
};

export default function editorReducer(state = initialState, action) {
  switch (action.type) {    
    
    case SET_EDITOR_QUESTIONS:
      return {
        ...state,
        questions: action.questions
      }
      
    case SET_EDITOR_CURRENT_WEEK:
      return {
        ...state,
        currentWeek: action.currentWeek
      }
 
    case SET_EDITOR_CURRENT_NAME:
      return {
        ...state,
        currentName: action.currentName
      }
      
    case SET_EDITOR_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: action.currentQuestion
      }
      
    case SET_EDITOR_CURRENT_TOTAL:
      return {
        ...state,
        currentTotal: action.currentTotal
      }
      
    case SET_EDITOR_CURRENT_ID:
      return {
        ...state,
        currentID: action.currentID
      }

    case SET_EDITOR_CURRENT_DEADLINE:
      return {
        ...state,
        currentDeadline: action.currentDeadline
      }

    default:
      return state;
  }
}