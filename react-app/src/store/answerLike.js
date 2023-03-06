const GET_LIKES = 'answerLikes/GET_LIKES'
const getLikes = (answerLikes) => {
  return {
    type:GET_LIKES,
    answerLikes
  }
}

export const fetchGetAnswerLikes = (answerId) => async (dispath) => {
  const res = await fetch(`/api/answers/${answerId}`)
  if(res.ok){
    const answerLikes = res.json()
    dispath(getLikes(answerLikes))
    return answerLikes
  }
}


const ADD_LIKE = 'answerLikes/ADD_LIKE'
const addLike = (answerLike) => {
  return {
    type:ADD_LIKE,
    answerLike
  }
}

export const fetchAddAnswerLike = (newAnswerLike, answerId) => async (dispath) => {
  const res = await fetch(`/api/answers/${answerId}/likes`, {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(newAnswerLike)
  })
  // console.log("fetch add answer like res.ok", res.ok)
  if (res.ok){
    const answerLike = await res.json()
    dispath(addLike(answerLike))
    return answerLike.id
  }else if(res.status == 401){

    return {"error": ["please login first"]}
  }else{
    const data = await res.json()
    // console.log("add thunk res.eroor", await data)
    return data
  }
}

const DELETE_LIKE = 'answerLikes/DELETE_LIKE'
const deleteAnswerLike = (answerLike) => {
  return {
    type:DELETE_LIKE,
    answerLike
  }
}

export const fetchDeleteAnswerLike = (newAnswerLike, answerId) => async (dispath) => {
  const res = await fetch(`/api/answers/${answerId}/unlikes`, {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(newAnswerLike)
  })
  // console.log("delete answerLike thunk res.ok", res.ok)
  if (res.ok){
    const answerLike = await res.json()
    // console.log("deleted answerLike", answerLike)
    dispath(deleteAnswerLike(answerLike))
    return answerLike.id
  }else if(res.status == 401){
    return {"error": ["please login first"]}
  }else{
    const data = await res.json()
    // console.log("res.eroor", await data)
    return data
  }
}

const initialState = {}
export default function answerLikeReducer(state = initialState, action){
  const newState = {...state}
  switch (action.type) {
    case GET_LIKES:
      action.answerLikes.forEach(answerLike => {
        newState.answerLikes[answerLike.id] = answerLike
      });
      return newState

    case ADD_LIKE:
      // console.log("add likes answerLike reducer state", state)
      // console.log("add likes answerLike reducer action", action)
      // console.log("add likes answerLike reducer action.questionLike", action.answerLike)
      // console.log("add likes answerLike reducer action.questionLike.id", action.answerLike.id)
      newState[`${action.answerLike.id}`] = action.answerLike
      return newState

    case DELETE_LIKE:
      // console.log("delete likes answerLike reducer state", state)
      // console.log("delete likes reducer action", action)
      // console.log("delete likes reducer action.questionLike", action.answerLike)
      // console.log("delete likes reducer action.questionLike.id", action.answerLike.id)
      newState[`${action.answerLike.id}`] = action.answerLike
      return newState

    default:
      return state
  }
}
