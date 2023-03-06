import { useState } from "react"
import { useDispatch } from "react-redux"
import { fetchAddAnswerLike, fetchDeleteAnswerLike} from '../../../store/answerLike'
import { fetchOneQuestion } from '../../../store/question'
import { fetchAllAnswersByQuestionId } from '../../../store/answer'
import './getAllAnswerLike.css'

export default function GetAllAnswerLikes({answer, questionId}){
  const dispatch = useDispatch()
  const answerId = answer.id

  const [errors, setErrors] = useState([])


  const handleAddLike = async (answerId) => {
    // need complish
    const newAnswerLike = {
      like_unlike:1
    }
    const addLikeThunkRes = await dispatch(fetchAddAnswerLike(newAnswerLike, answerId))
    // console.log("addLikeThunkRes", addLikeThunkRes.errors)
    if(typeof(addLikeThunkRes) == "number"){
      // console.log("dispatch fetch one queation", questionId);
      dispatch(fetchOneQuestion(questionId))
        .then(() => dispatch(fetchAllAnswersByQuestionId(questionId)))
        .catch(async (res) => {
          // console.log("catch errors")
          if(res && res.errors) setErrors(res.errors)
        });
    }else {
      alert(Object.values(addLikeThunkRes))
    }

  }

  const handleDeleteLike = async (answerId) => {
    // need complish
    // history.push(`/questions/${questionId}`)
    const newAnswerLike = {
      like_unlike:-1
    }
    const deleteLikeThunkRes = await dispatch(fetchDeleteAnswerLike(newAnswerLike, answerId))

    if(typeof(deleteLikeThunkRes) == "number"){
      // console.log("dispatch fetch one queation", questionId);
      dispatch(fetchOneQuestion(questionId))
        .then(() => dispatch(fetchAllAnswersByQuestionId(questionId)))
        .catch(async (res) => {
          // console.log("catch errors")
          if(res && res.errors) setErrors(res.errors)
        });
    }else {
      // setErrors([deleteLikeThunkRes.errors])
      alert(Object.values(deleteLikeThunkRes))
    }

  }
  return (
    <div className="all-answer-likes-container">
      <ul className='answer-question-errors-container'>
        {errors.map((error, idx) => (
          <div>
            <div  className='answer-question-errors-item' key={idx}>{error}</div>
            <button onClick ={() => setErrors([])}>X</button>
          </div>

        ))}
      </ul>
      <div className="answer-like-tooltip">
        <img src="https://emojis.wiki/thumbs/emojis/eject-button.webp" alt="" className="single-answer-upside" onClick={ () => handleAddLike(answerId)} />
        <span className="answer-like-tooltiptext">like?</span>
      </div>
      <div className="single-answer-likes">
        {answer.like_count} likes
      </div>
      <div className="answer-unlike-tooltip">
        <img src="https://emojis.wiki/thumbs/emojis/eject-button.webp" alt="" className="single-answer-upside-down" onClick={ () => handleDeleteLike(answerId)} />
        <span className="answer-unlike-tooltiptext">unlike?</span>
      </div>
    </div>

  )
}
