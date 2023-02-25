import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchEditAnswer, fetchAllAnswersByQuestionId } from '../../../store/answer'
import { useModal } from '../../../context/Modal';
import { useHistory } from "react-router-dom";
import './editAnswer.css'

export default function EditAnswers() {
  const dispatch = useDispatch()
  const history = useHistory()
  const {questionId, answerId} = useParams()
  // console.log("questionId from EditAnswers component", questionId)
  // console.log("answerId from EditAnswers component", answerId)

  const oldAnswer = useSelector(state => {
    // console.log("state from EditAnswer component", state)
    return state.answer[`${answerId}`]})

  // console.log("oldAnswer", oldAnswer)

  const [answer_body, setAnser_body] = useState("")
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState([])
  const { closeModal } = useModal();

  useEffect( () => {
    dispatch (fetchAllAnswersByQuestionId(questionId)).then(() => setIsLoaded(true))
  }, [dispatch])

  const handleSubmit = async (e) => {
    // console.log("start handleSumit")
    e.preventDefault()
    const newAnswer = {
      answer_body
    }
    // console.log("new answer", newAnswer)
    const editAnswerRes = await dispatch(fetchEditAnswer(newAnswer, answerId))
    // console.log("editAnswerRes", editAnswerRes)
    if(typeof(editAnswerRes) == "number"){
      history.push(`/questions/${questionId}`)
    }else{
      setErrors(editAnswerRes)
    }
  }

  return (
    isLoaded && (
    <div className="update-answer-container">
      <h2>Edit Answer</h2>
      <form className='update-answer-form'
            onSubmit={handleSubmit}>
        <ul className='update-answer-errors-container'>
          {errors.map((error, idx) => (
              <li  className='update-answer-errors-item' key={idx}>{error}</li>
          ))}
        </ul>

        <label className='update-answer-body-item'>
          <span className="update-answer-body-item-span" >answer:</span>
          <input
              type="text"
              value={oldAnswer.answer_body}
              onChange={(e) => setAnser_body(e.target.value)}
          />
        </label>
        <button className="update-answer-button" type="submit"> Submit </button>
      </form>
    </div>
    )
  )
}
