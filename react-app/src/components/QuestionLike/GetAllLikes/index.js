import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAddQuestionLike, fetchDeleteQuestionLike } from '../../../store/questionLike'
import { fetchOneQuestion } from '../../../store/question'
import './getAllLikes.css'

export default function GetAllLikes({questionId}){
  const dispatch = useDispatch()
  const like_count = useSelector(state => state.question.singleQuestion.like_count)

  const [errors, setErrors] = useState([])
  const sessionUser = useSelector(state => state.session.user)

  const handleAddLike = async (questionId) => {
    const newQuestionLike = {
      like_unlike:1
    }
    const addLikeThunkRes = await dispatch(fetchAddQuestionLike(newQuestionLike, questionId))
    console.log("addLikeThunkRes", addLikeThunkRes.errors)
    if(typeof(addLikeThunkRes) == "number"){
      dispatch(fetchOneQuestion(questionId))
        .catch(async (res) => {
          console.log("catch errors")
          if(res && res.errors) setErrors(res.errors)
        });
    }else {
      setErrors([addLikeThunkRes.errors])
    }


  }

  const handleDeleteLike = async (questionId) => {
    const newQuestionLike = {
      like_unlike:-1
    }
    const deleteLikeThunkRes = await dispatch(fetchDeleteQuestionLike(newQuestionLike, questionId))

    if(typeof(deleteLikeThunkRes) == "number"){
      dispatch(fetchOneQuestion(questionId))
        .catch(async (res) => {
          console.log("catch errors")
          if(res && res.errors) setErrors(res.errors)
        });
    }else {
      setErrors([deleteLikeThunkRes.errors])
    }

  }
  console.log("errors", errors)

  return (
    <div className="all-question-likes-container">
      <ul className='answer-question-errors-container'>
        {errors.map((error, idx) => (
            <li  className='answer-question-errors-item' key={idx}>{error}</li>
        ))}
      </ul>
      <div className="tooltip">
        <img src="https://emojis.wiki/thumbs/emojis/eject-button.webp" alt="" className="single-question-upside" onClick={ () => handleAddLike(questionId)} />
        <span className="tooltiptext">like this question?</span>
      </div>
      <div> {like_count} likes</div>
      <div>
        <img src="https://emojis.wiki/thumbs/emojis/eject-button.webp" alt="" className="single-question-upside-down" onClick={ () => handleDeleteLike(questionId)} />
      </div>
    </div>
  )
}
