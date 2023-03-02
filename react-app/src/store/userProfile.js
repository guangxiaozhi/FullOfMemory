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
    default:
      return state
  }
}
