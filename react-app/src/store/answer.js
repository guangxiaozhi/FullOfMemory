// load all answers on single question page
const LOAD_ALL_ANSWERS = 'answers/LOAD_ALL_ANSWERS'

const loadAllAnswers = (answers) => {
  return {
    type:LOAD_ALL_ANSWERS,
    answers
  }
}

export const fetchAllAnswersByQuestionId = (questionId) => async (dispatch) => {
  // console.log("start fetch answers")
  const res = await fetch(`/api/questions/${questionId}/answers`)
  // console.log(res.ok)
  if (res.ok){
    const answers = await res.json();
    // console.log("answers form backend", answers)
    dispatch(loadAllAnswers(answers))
    return answers
  }
}

// edit answer by answer id
const EDIT_ANSWER = 'answers/EDIT_ANSWER'

const editAnswer = (answer) => {
  return {
    type:EDIT_ANSWER,
    answer
  }
}

export const fetchEditAnswer = (answer_body, answerId) => async (dispatch) => {
  const res = await fetch(`/api/answers/${answerId}`, {
    method: "PUT",
    headers: {"Content-Type":"application/json"},
    body:JSON.stringify(answer_body)
  })
  // console.log("res from thunk", res)
  // console.log("res.ok", res.ok)
  if (res.ok){
    const answer = await res.json();
    dispatch(editAnswer(answer))
    return answer.id
  }else {
    return ["answer field is required"]
  }
}

// delete answer by answer id
const DELETE_ANSWER = 'answers/DELETE_ANSWER'

const deleteOneAnswer = (answerId) => {
  return {
    type: DELETE_ANSWER,
    answerId
  }
}
export const fetchDeleteAnswer = (answerId) => async (dispatch) => {
  const res = await fetch(`/api/answers/${answerId}`, {
    method:'DELETE'
  })

  // console.log("res.ok", res.ok)
  if (res.ok){
    dispatch(deleteOneAnswer(answerId))
    return answerId
  }
}

// answer one question
const ANSWER_QUESTION = 'answers/ANSWER_QUESTION'
const answerOneQuestion = (newAnswer) => {
  return {
    type: ANSWER_QUESTION,
    newAnswer
  }
}
export const fetchAnswerOneQuestion = (answerBody, questionId) => async (dispatch) => {
  // console.log("answerBody", answerBody)
  const res = await fetch (`/api/questions/${questionId}/answers`, {
    method: "POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(answerBody)
  })
  // console.log("res.ok", res.ok)
  if (res.ok){
    const newAnswer = await res.json()
    dispatch(answerOneQuestion(newAnswer))
    return newAnswer.id
  }else {
    return ["answer field is required"]
  }
}

const initialState = {}
export default function answerReducer(state = initialState, action){
  let newState
  switch (action.type) {
    case LOAD_ALL_ANSWERS:
      // console.log("start reducer")
      // console.log("action.answers", action.answers)
      newState = {}
      const allAnswers = action.answers
      allAnswers.forEach(answer => {
        newState[answer["id"]] = answer
      });
      // console.log("newState", newState)
      return newState

    case EDIT_ANSWER:
      newState = {...state}
      newState[`${action.answer.id}`] = action.answer
      return newState

    case DELETE_ANSWER:
      newState = {...state}
      delete newState[action.answerId]
      return newState

    case ANSWER_QUESTION:
      newState = {...state}
      newState[`${action.newAnswer.id}`] = action.newAnswer
      return newState

    default:
      return state
  }
}
