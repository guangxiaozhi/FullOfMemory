import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllAnswersByQuestionId, fetchDeleteAnswer } from '../../../store/answer'
import { fetchOneQuestion } from "../../../store/question"
import { useHistory } from "react-router-dom"
import {Link} from 'react-router-dom'
import GetAllAnswerLikes from "../../AnswerLike/GetAllAnswerLike"
import './getAllAnswer.css'

export default function GetAllAnswers({questionId}) {
  const dispatch = useDispatch()
  const history = useHistory()
  const [isLoaded, setIsLoaded] = useState(false);
  // console.log("GetAllAnswers component questionId", questionId)

  const sessionUser = useSelector(state => state.session.user)

  const allAnswers = useSelector(state => {
    // console.log("state from GetAllAnswers Component", state)
      return state.answer})

  useEffect(() => {
    dispatch(fetchAllAnswersByQuestionId(questionId)).then(() => setIsLoaded(true));
  }, [dispatch])

  // console.log("allAnswers", allAnswers)
  const answers = allAnswers? Object.values(allAnswers): []
  // console.log("answers", answers)

  const options = { year: 'numeric', month: 'numeric', day:'numeric' };

  const handleDelete = (answerId) => async (e) => {
    // console.log("handle delete ")
    await dispatch(fetchDeleteAnswer(answerId))
      .then(() => dispatch(fetchOneQuestion(questionId)))
    history.push(`/questions/${questionId}`)
  }



  return (
    isLoaded && (
      <>
        <h2>All Answers</h2>
        {
          answers.map(answer => (
            <div key={answer.id} className="single-answer-container">
              {/* <div className="single-answer-likes">
                {answer.like_count} likes
              </div> */}
              <div> <GetAllAnswerLikes answer={answer} questionId={questionId}/></div>
              <div className="single-answer-body-container">
                <div className="single-answer-body">
                  {answer.answer_body}
                </div>
                <div>
                  <div className="delete-update-answer-container">
                    {sessionUser && sessionUser.id == answer.user_id ? <Link  className="delete-update-answer" to={`/questions/${questionId}/answers/${answer.id}`}>Edit Answer</Link>:""}
                    {sessionUser && sessionUser.id == answer.user_id ? <Link className="delete-update-answer" to={`/questions/${questionId}`} onClick ={handleDelete(answer.id)}>Delete Answer</Link>:""}
                  </div>
                  <div className="single-answer-time-user">
                    <div className="single-answer-time">edited: {new Date(answer.updatedAt).toLocaleDateString("en-US", options)}</div>
                    <Link className="single-answer-user-profile" to={`/users/${answer.user.id}`}>
                      <img src="https://www.gravatar.com/avatar/b4ef3ecedbeb1da0e39d12175ffe87a7?s=256&d=identicon&r=PG" alt="" />
                      <div className="single-answer-user"> {answer.user.username} </div>
                    </Link>
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
