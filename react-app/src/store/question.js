// load all questions
const LOAD_ALL_QUESTIONS = 'questions/LOAD_ALL_QUESTIONS'
const loadAllQuestions = (questions) => {
  return {
    type:LOAD_ALL_QUESTIONS,
    allQuestions:questions
  }
}

export const fetchAllQuestions = () => async(dispatch) => {
  const res = await fetch('/api/questions')
  if (res.ok) {
    const questions = await res.json()
    // console.log("questions from thunk", questions)
    dispatch(loadAllQuestions(questions))
  }
}

// load one question details
const GET_QUESTION_DETAILS = 'questions/GET_QUESTION_DETAILS'
const loadOneQuestion = (singleQuestion) => {
  return {
    type:GET_QUESTION_DETAILS,
    singleQuestion
  }
}
export const fetchOneQuestion = (questionId) => async (dispatch) => {
  // console.log("start thunk", questionId)
  const res = await fetch(`/api/questions/${questionId}`);
  // console.log(res.ok)
  // console.log("res.ok", await res.json())
  if(res.ok){
    const singleQuestion = await res.json();
    // console.log("singleQuestion from thunk", singleQuestion)
    await dispatch(loadOneQuestion(singleQuestion))
    return singleQuestion
  }
}

// delete one question by id
const DELETE_ONE_QUESTION = 'questions/DELETE_ONE_QUESTION'
const deleteOneQuestion = (questionId) => {
  return {
    type:DELETE_ONE_QUESTION,
    questionId
  }
}

export const deleteOneQuestionThunk = (questionId) => async (dispatch) => {
  // console.log("delete question 2")
  const res = await fetch(`/api/questions/${questionId}`, {
    method:"DELETE"
  })
  // console.log("delete question thunk res.ok", res.ok)
  // console.log("delete question thunk questionId", questionId)
  if (res.ok){
    dispatch(deleteOneQuestion(questionId))
  }
}

// update one question by id
const UPDATE_ONE_QUESTION = 'questions/UPDATE_ONE_QUESTION'
const updateOneQuestion = (question) => {
  return {
    type:UPDATE_ONE_QUESTION,
    question
  }
}
export const updateQuestionThunk = (updatedQuestion,questionId) => async (dispath) => {
  // console.log("updated question", updatedQuestion)
  const res = await fetch(`/api/questions/${questionId}`,  {
    method: "PUT",
    headers: {"Content-Type":"application/json"},
    body:JSON.stringify(updatedQuestion)
  })
  if(res.ok){
    const data = await res.json()
    dispath(updateOneQuestion(data))
    return data.id
  }else {
    const data = await res.json()
    // console.log("errorr data from create thunk", data)
    const result = []
    if ("errors" in data){
      // console.log("unique error")
      result.push(Object.values(data))
    }else{
      for (let key in data) {
      result.push([`Question ${key} is required`])
      }
    }
    return result
  }
}


//Create question
const CREATE_QUESTION = "questions/CREATE_QUESTION"
const createOneQuestion = (question) => {
  return {
    type:CREATE_QUESTION,
    question
  }
}

export const createQuestionThunk = (newQuestion) => async (dispatch) => {
  // console.log("newQuestion from thunk", newQuestion)
  const res = await fetch('/api/questions/',  {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body:JSON.stringify(newQuestion)
  })
  // console.log("create question thunk res.ok", res.ok)
  if (res.ok){
    const data = await res.json()
    dispatch(createOneQuestion(data))
    return data.id
  }else {
    const data = await res.json()
    // console.log("errorr data from create thunk", data)
    const result = []
    if ("errors" in data){
      // console.log("unique error")
      result.push(Object.values(data))
    }else{
      for (let key in data) {
      result.push([`Question ${key} is required`])
      }
    }
    return result
  }
}

const initialState = {};
export default function questionReducer(state = initialState, action){
  const newState = {...state}
  switch (action.type){
    case LOAD_ALL_QUESTIONS:
      const newAllQuestions = {}
      // console.log("action.allQuestions", action.allQuestions)
      action.allQuestions.forEach(question => {
        // console.log("each question", question)
        newAllQuestions[question.id] = question
      });
      // console.log("newAllQuestions", newAllQuestions)
      return {
        ...state,
        allQuestions:{...newAllQuestions}
      }

    case GET_QUESTION_DETAILS:
      // console.log("?????? state ????????", state)
      // console.log("action.singleQuestion", action.singleQuestion)
      // console.log("newState in reducer", newState)
      newState.singleQuestion = {...action.singleQuestion}
      return newState

    case DELETE_ONE_QUESTION:
      delete newState.allQuestions[action.questionId]
      // console.log("new state from delete question reducer", newState)
      newState.singleQuestion = {}
      // console.log("state from delete question reducer", newState)
      return newState

    case CREATE_QUESTION:
      // console.log("state from create question", state)
      newState.allQuestions[action.question.id] = action.question;
      return newState

    default:
      return state;
  }
}
