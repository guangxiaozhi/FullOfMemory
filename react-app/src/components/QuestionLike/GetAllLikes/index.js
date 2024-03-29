import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAddQuestionLike, fetchDeleteQuestionLike } from '../../../store/questionLike'
import { fetchOneQuestion } from '../../../store/question'
import './getAllLikes.css'

export default function GetAllLikes({questionId}){
  const dispatch = useDispatch()
  const like_count = useSelector(state => state.question.singleQuestion.like_count)

  const [errors, setErrors] = useState([])

  const handleAddLike = async (questionId) => {
    const newQuestionLike = {
      like_unlike:1
    }
    const addLikeThunkRes = await dispatch(fetchAddQuestionLike(newQuestionLike, questionId))
    // console.log("addLikeThunkRes", addLikeThunkRes.errors)
    if(typeof(addLikeThunkRes) == "number"){
      dispatch(fetchOneQuestion(questionId))
        .catch(async (res) => {
          // console.log("catch errors")
          if(res && res.errors) setErrors(res.errors)
        });
    }else {
      // setErrors(Object.values(addLikeThunkRes))
      // console.log("addLikeThunkRes", Object.values(addLikeThunkRes))
      alert(Object.values(addLikeThunkRes))
    }
  }

  const handleDeleteLike = async (questionId) => {
    const newQuestionLike = {
      like_unlike:-1
    }
    const deleteLikeThunkRes = await dispatch(fetchDeleteQuestionLike(newQuestionLike, questionId))
    // console.log("deleteLikeThunkRes", deleteLikeThunkRes.errors)
    if(typeof(deleteLikeThunkRes) == "number"){
      dispatch(fetchOneQuestion(questionId))
        .catch(async (res) => {
          // console.log("catch errors")
          if(res && res.errors) setErrors(res.errors)
        });
    }else {
      // setErrors([deleteLikeThunkRes.errors])
      alert(Object.values(deleteLikeThunkRes))
    }

  }
  // console.log("errors", errors)


  return (
    <div className="all-question-likes-container">
      <ul className='answer-question-errors-container' >
        {errors.map((error, idx) => (
          <div  className='answer-question-errors-item'>
            <div key={idx}>{error}</div>
            <button onClick ={() => setErrors([])} > X </button>
          </div>
        ))}
      </ul>
      <div className="like-tooltip">
        <img src="https://emojis.wiki/thumbs/emojis/eject-button.webp" alt="" className="single-question-upside" onClick={ () => handleAddLike(questionId)} />
        <span className="like-tooltiptext">like?</span>
      </div>
      <div className="question-like-account"> {like_count} likes</div>
      <div className="unlike-tooltip">
        <img src="https://emojis.wiki/thumbs/emojis/eject-button.webp" alt="" className="single-question-upside-down" onClick={ () => handleDeleteLike(questionId)} />
        <span className="unlike-tooltiptext">unlike?</span>
      </div>
    </div>
  )
}
