import {
  SET_EDITOR_CURRENT_WEEK,
  SET_EDITOR_CURRENT_NAME,
  SET_EDITOR_CURRENT_QUESTION,
  SET_EDITOR_CURRENT_TOTAL,
  SET_EDITOR_CURRENT_ID,
  SET_EDITOR_CURRENT_DEADLINE,
  SET_EDITOR_QUESTIONS,
  SET_CURRENT_ERROR,
  SET_EDITOR_CURRENT_HASH,
  SET_EDITOR_CURRENT_WEEK_ID,
  SET_EDITOR_FROM_WEEKLIST,
  CLEAR_EDITOR,
} from "../types";

const initialState = {
  currentWeek: "",
  currentName: "",
  questions: [],
  currentQuestion: "",
  currentTotal: "",
  currentID: "",
  currentDeadline: "",
  currentError: "",
  currentHash: "",
};

export default function editorReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EDITOR_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };

    case SET_CURRENT_ERROR:
      return {
        ...state,
        currentError: action.payload,
      };

    case SET_EDITOR_CURRENT_WEEK:
      return {
        ...state,
        currentWeek: action.payload,
      };

    case SET_EDITOR_CURRENT_NAME:
      return {
        ...state,
        currentName: action.payload,
      };

    case SET_EDITOR_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: action.payload,
      };

    case SET_EDITOR_CURRENT_TOTAL:
      return {
        ...state,
        currentTotal: action.payload,
      };

    case SET_EDITOR_CURRENT_ID:
      return {
        ...state,
        currentID: action.payload,
      };

    case SET_EDITOR_CURRENT_DEADLINE:
      return {
        ...state,
        currentDeadline: action.payload,
      };

    case SET_EDITOR_CURRENT_WEEK_ID:
      return {
        ...state,
        currentWeekId: action.payload,
      };

    case CLEAR_EDITOR:
      return {
        ...state,
        currentWeek: "",
        currentName: "",
        questions: [],
        currentQuestion: "",
        currentTotal: "",
        currentID: "",
        currentDeadline: "",
        currentHash: "",
        currentWeekId: "",
      };

    case SET_EDITOR_FROM_WEEKLIST:
      return {
        ...state,
        currentWeek: action.payload.number,
        currentName: action.payload.name,
        questions: action.payload.questions,
        currentDeadline: action.payload.deadline,
        currentHash: action.payload.hash,
        currentWeekId: action.payload.id,
      };

    case SET_EDITOR_CURRENT_HASH:
      return {
        ...state,
        currentHash: action.payload,
      };

    default:
      return state;
  }
}
