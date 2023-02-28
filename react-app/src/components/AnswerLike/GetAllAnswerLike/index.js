import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { fetchAddAnswerLike, fetchDeleteAnswerLike} from '../../../store/answerLike'
import { fetchOneQuestion } from '../../../store/question'
import { fetchAllAnswersByQuestionId } from '../../../store/answer'
import './getAllAnswerLike.css'

export default function GetAllAnswerLikes({answer, questionId}){
  const dispatch = useDispatch()
  // const history = useHistory()
  const sessionUser = useSelector(state => state.session.user)
  const answerId = answer.id

  const [errors, setErrors] = useState([])


  const handleAddLike = async (answerId) => {
    // need complish
    const newAnswerLike = {
      like_unlike:1
    }
    const addLikeThunkRes = await dispatch(fetchAddAnswerLike(newAnswerLike, answerId))
    console.log("addLikeThunkRes", addLikeThunkRes.errors)
    if(typeof(addLikeThunkRes) == "number"){
      console.log("dispatch fetch one queation", questionId);
      dispatch(fetchOneQuestion(questionId))
        .then(() => dispatch(fetchAllAnswersByQuestionId(questionId)))
        .catch(async (res) => {
          console.log("catch errors")
          if(res && res.errors) setErrors(res.errors)
        });
    }else {
      setErrors([addLikeThunkRes.errors])
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
      console.log("dispatch fetch one queation", questionId);
      dispatch(fetchOneQuestion(questionId))
        .then(() => dispatch(fetchAllAnswersByQuestionId(questionId)))
        .catch(async (res) => {
          console.log("catch errors")
          if(res && res.errors) setErrors(res.errors)
        });
    }else {
      setErrors([deleteLikeThunkRes.errors])
    }

  }
  return (
    <div className="all-answer-likes-container">
      <ul className='answer-question-errors-container'>
        {errors.map((error, idx) => (
            <li  className='answer-question-errors-item' key={idx}>{error}</li>
        ))}
      </ul>
      <div>
        <img src="https://emojis.wiki/thumbs/emojis/eject-button.webp" alt="" className="single-answer-upside" onClick={ () => handleAddLike(answerId)} />
      </div>
      <div className="single-answer-likes">
        {answer.like_count} likes
      </div>
      <div>
        <img src="https://emojis.wiki/thumbs/emojis/eject-button.webp" alt="" className="single-answer-upside-down" onClick={ () => handleDeleteLike(answerId)} />
      </div>
    </div>

  )
}
