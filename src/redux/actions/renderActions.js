import {
  SET_RENDER,
  SET_RENDER_BUTTONS,
  NULLIFY_RENDER,
  SET_RENDER_BUTTONSTATE,
  SET_RENDER_ANSWERSTATE,
  SET_RENDER_LOADEDSTATE
} from '../types'

export function actionSetRender(state) {
  return {
    type: SET_RENDER,
    payload: state
  }
}

export function actionSetRenderButtons(data) {
  return {
    type: SET_RENDER_BUTTONS,
    payload: data
  }
}

export function actionNullifyRender() {
  return {
    type: NULLIFY_RENDER
  }
}

export function actionSetRenderButtonState(buttons) {
  return {
    type: SET_RENDER_BUTTONSTATE,
    payload: buttons
  }
}

export function actionSetRenderAnswerState(buttons) {
  return {
    type: SET_RENDER_ANSWERSTATE,
    payload: buttons
  }
}

export function actionSetRenderLoadedState(buttons) {
  return {
    type: SET_RENDER_LOADEDSTATE,
    payload: buttons
  }
}