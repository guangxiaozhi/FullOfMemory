import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllAnswersByQuestinId } from '../../../store/answer'
import './getAllAnswer.css'

export default function GetAllAnswers({questionId}) {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false);
  console.log("GetAllAnswers component questionId", questionId)

  const allAnswers = useSelector(state => {
    console.log("state from GetAllAnswers Component", state)
      return state.answer})

  useEffect(() => {
    dispatch(fetchAllAnswersByQuestinId(questionId)).then(() => setIsLoaded(true));
  }, [dispatch])

  console.log("allAnswers", allAnswers)
  const answers = allAnswers? Object.values(allAnswers): []
  console.log("answers", answers)

  const options = { year: 'numeric', month: 'numeric', day:'numeric' };
  return (
    isLoaded && (
      <>
        <h2>All Answers</h2>
        {
          answers.map(answer => (
            <div className="single-answer-container">
              <div className="single-answer-likes">
                {answer.like_count} likes
              </div>
              <div className="single-answer-body-container">
                <div className="single-answer-body">
                  {answer.answer_body}
                </div>
                <div className="single-answer-time-user">
                  <div className="single-answer-time">edited: {new Date(answer.createdAt).toLocaleDateString("en-US", options)}</div>
                  <div className="single-answer-user">
                    <div>{answer.user.username}</div>
                  </div>

                </div>
              </div>
            </div>
          ))
        }
      </>

    )

  )
}
