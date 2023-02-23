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
    console.log("questions from thunk", questions)
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
  console.log("start thunk", questionId)
  const res = await fetch(`/api/questions/${questionId}`);
  console.log(res.ok)
  // console.log("res.ok", await res.json())
  if(res.ok){
    const singleQuestion = await res.json();
    console.log("singleQuestion from thunk", singleQuestion)
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
  const res = await fetch(`/api/questions/${questionId}`, {
    method:"DELETE"
  })
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
  console.log("updated question", updatedQuestion)
  const res = await fetch(`/api/questions/${questionId}`,  {
    method: "PUT",
    headers: {"Content-Type":"application/json"},
    body:JSON.stringify(updatedQuestion)
  })
  if(res.ok){
    const data = await res.json()
    dispath(updateOneQuestion(data))
    return data
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
      console.log("?????? state ????????", state)
      // newState.singleQuestion
      console.log("action.singleQuestion", action.singleQuestion)
      console.log("newState in reducer", newState)
      newState.singleQuestion = {...action.singleQuestion}
      // newState.singleQuestion["answer_count"] = action.singleQuestion["answer_count"]
      // newState.singleQuestion["like_count"] = action.singleQuestion["like_count"]
      // newState.singleQuestion["question"] = {... action.singleQuestion.question}
      return newState

    case DELETE_ONE_QUESTION:
      delete newState.allQuestions[action.questionId]
      newState.singleQuestion = {}
      return newState

    default:
      return state;
  }
}
