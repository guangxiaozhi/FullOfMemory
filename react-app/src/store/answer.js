// load all answers on single question page
const LOAD_ALL_ANSWERS = 'answers/LOAD_ALL_ANSWERS'

const loadAllAnswers = (answers) => {
  return {
    type:LOAD_ALL_ANSWERS,
    answers
  }
}

export const fetchAllAnswersByQuestinId = (questionId) => async (dispatch) => {
  console.log("start fetch answers")
  const res = await fetch(`/api/questions/${questionId}/answers`)
  console.log(res.ok)
  if (res.ok){
    const answers = await res.json();
    console.log("answers form backend", answers)
    dispatch(loadAllAnswers(answers))
    return answers
  }
}


const initialState = {}
export default function answerReducer(state = initialState, action){
  let newState
  switch (action.type) {
    case LOAD_ALL_ANSWERS:
      console.log("start reducer")
      console.log("action.answers", action.answers)
      newState = {}
      const allAnswers = action.answers
      allAnswers.forEach(answer => {
        newState[answer["id"]] = answer
      });
      console.log("newState", newState)
      return newState

    default:
      return state
  }
}
