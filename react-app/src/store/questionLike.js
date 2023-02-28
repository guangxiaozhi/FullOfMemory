const GET_LIKES = 'questionLikes/GET_LIKES'
const getLikes = (questionLikes) => {
  return {
    type:GET_LIKES,
    questionLikes
  }
}

export const fetchGetLikes = (questionId) => async (dispath) => {
  const res = await fetch(`/api/questions/${questionId}`)
  if(res.ok){
    const questionLikes = res.json()
    dispath(getLikes(questionLikes))
    return questionLikes
  }
}


const ADD_LIKE = 'questionLikes/ADD_LIKE'
const addLike = (questionLike) => {
  return {
    type:ADD_LIKE,
    questionLike
  }
}

export const fetchAddQuestionLike = (newQuestionLike,questionId) => async (dispath) => {
  const res = await fetch(`/api/questions/${questionId}/likes`, {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(newQuestionLike)
  })
  console.log("res.ok", res.ok)
  if (res.ok){
    const questionLike = await res.json()
    dispath(addLike(questionLike))
    return questionLike.id
  }else{
    const data = await res.json()
    console.log("add question like res.eroor", data)
    return data
  }
}

const DELETE_LIKE = 'questionLikes/DELETE_LIKE'
const deleteLike = (questionLike) => {
  return {
    type:DELETE_LIKE,
    questionLike
  }
}

export const fetchDeleteQuestionLike = (newQuestionLike,questionId) => async (dispath) => {
  const res = await fetch(`/api/questions/${questionId}/unlikes`, {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(newQuestionLike)
  })
  console.log("delete question like thunk res.ok", res.ok)
  if (res.ok){
    const questionLike = await res.json()
    dispath(deleteLike(questionLike))
    return questionLike.id
  }else{
    console.log("delete meet error", res)
    const data = await res.json()
    console.log("delete question like res.eroor", data)
    return data
  }
}


const initialState = {}
export default function questionLikeReducer(state = initialState, action){
  const newState = {...state}
  switch (action.type) {
    case GET_LIKES:
      action.questionLikes.forEach(quesLike => {
        newState.questionLike[quesLike.id] = quesLike
      });
      return newState
    case ADD_LIKE:
      console.log("add likes reducer state", state)
      console.log("add likes reducer action", action)
      console.log("add likes reducer action.questionLike", action.questionLike)
      console.log("add likes reducer action.questionLike.id", action.questionLike.id)
      newState[`${action.questionLike.id}`] = action.questionLike
      return newState

    case DELETE_LIKE:
      console.log("delete likes question reducer state", state)
      newState[`${action.questionLike.id}`] = action.questionLike
      return newState

    default:
      return state
  }
}
