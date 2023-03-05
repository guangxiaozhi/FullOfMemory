const GET_USER_PROFILE = "users/GET_USER_PROFILE"

const loadUserInfo = (userProfileInfo) => {
  return {
    type:GET_USER_PROFILE,
    userProfileInfo
  }
}

export const fetchUserProfileInfo = (userId)=> async (dispatch) => {
  const user = await fetch(`/api/users/${userId}`)
  const questions = await fetch(`/api/users/${userId}/questions`)
  const answers = await fetch(`/api/users/${userId}/answers`)
  if (user.ok && questions.ok && answers.ok){
    const userInfo = await user.json()
    const quesInfo = await questions.json()
    const answInfo = await answers.json()
    // console.log("userInfo",userInfo )
    // console.log("quesInfo",quesInfo )
    // console.log("answInfo",answInfo )
    let res = {}
    res["user"] = userInfo
    res["questions"] = quesInfo
    res["answers"] = answInfo
    // console.log("res from userProfile reducer", res)
    dispatch(loadUserInfo(res))
    return res
  }
}

const  UPDATE_USER = 'users/UPDATE_USER'
const updateUserInfo = (user) => {
  return {
    type:UPDATE_USER,
    user
  }
}

export const fetchUpdateUser = (newUser, userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}`, {
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(newUser)
  })
  if (res.ok){
    const user = await res.json()
    dispatch(updateUserInfo(user))
    return userId
  }else{
    return [" Username is already in use."]
  }
}

const DELETE_USER = 'users/DELETE_USER'
const deleteUser = (user) =>{
  return {
    type:DELETE_USER,
    user
  }
}
export const deleteUserThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/delete`, {
    method:"PUT"
  })
  if (res.ok) {
    const user = await res.json()
    dispatch(deleteUser(user))
    return user.id
  }
}

const initialState = {}
export default function userProfileReducer(state = initialState, action){
  let newState
  switch(action.type) {
    case GET_USER_PROFILE:
      // console.log("old state", state)
      // console.log("action", action)
      // console.log("action.userProfileInfo.user", action.userProfileInfo.user)
      // console.log("...action.userProfileInfo.user", {...action.userProfileInfo.user})
      // console.log("action.userProfileInfo.questions", action.userProfileInfo.questions)
      // console.log("action.userProfileInfo.answers", action.userProfileInfo.answers)
      newState = {...state}
      newState.user = {...action.userProfileInfo.user}
      newState.answers = {...action.userProfileInfo.answers}
      newState.questions = {...action.userProfileInfo.questions}
      return newState

    case UPDATE_USER:
      newState = {...state}
      newState.user[`${action.user.id}`] = action.user
      return newState

    case DELETE_USER:
      newState = {...state}
      newState.user[`${action.user.id}`] = action.user
      return newState
      
    default:
      return state
  }
}
