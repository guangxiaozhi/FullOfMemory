import { useState } from "react"
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { useModal } from '../../../context/Modal'
import { fetchAnswerOneQuestion, fetchAllAnswersByQuestionId } from '../../../store/answer'
import { fetchOneQuestion } from '../../../store/question'
import './answerQuestion.css'

export default function AnswerQuestion({singleQuestion}) {
  const dispatch = useDispatch()
  const history = useHistory()

  // console.log("answer question component", singleQuestion)
  const sessionUser = useSelector(state => state.session.user)

  const [answer_body, setAnser_body] = useState("")
  const [errors, setErrors] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newAnswer = {
      answer_body
    }
    // console.log("newAnswer before dispatch", newAnswer)
    const newAnswerThunkRes = await dispatch(fetchAnswerOneQuestion(newAnswer, singleQuestion.id))

    // console.log("newAnswerThunkRes", newAnswerThunkRes)
    if (typeof(newAnswerThunkRes) == "number"){
      dispatch(fetchOneQuestion(singleQuestion.id))
        .then( () => dispatch(fetchAllAnswersByQuestionId(singleQuestion.id)))
        .then(() => closeModal())
        .catch(async (res) => {
          if(res && res.errors) setErrors(res.errors)
        });

      if (errors.length === 0){
        history.push(`/questions/${singleQuestion.id}`)
      }
    }else{
      setErrors(newAnswerThunkRes)
    }
  }



  let sessionLinks

  if (sessionUser) {
    if (sessionUser.id === singleQuestion.user_id){
      sessionLinks = (
        <h2>
          You cannot answer your question, you can update your question.
        </h2>
      )
    }else{
      sessionLinks = (
        <div className="answer-question-container">
          <h2>Answer question</h2>
          <form className="answer-question-form" onSubmit={handleSubmit}>
            <ul className='answer-question-errors-container'>
              {errors.map((error, idx) => (
                  <li  className='answer-question-errors-item' key={idx}>{error}</li>
              ))}
            </ul>

            <label className='answer-question-body-item'>
              <span className="answer-question-body-item-span" >answer:</span>
              <input
                  type="text"
                  value={answer_body}
                  onChange={(e) => setAnser_body(e.target.value)}
              />
            </label>
            <button className="answer-question-button" type="submit"> Submit </button>
          </form>
        </div>
      )
    }

  }else {
    sessionLinks = (
      <h1>
         Please log in to answer the Question
      </h1>
    )
  }
  return (
    sessionLinks
  )
}
