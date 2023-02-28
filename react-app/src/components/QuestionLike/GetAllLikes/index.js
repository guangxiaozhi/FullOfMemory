import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAddQuestionLike, fetchDeleteQuestionLike } from '../../../store/questionLike'
import { fetchOneQuestion } from '../../../store/question'
import './getAllLikes.css'
import OpenModalButton from "../../OpenModalButton"
import { useModal } from "../../../context/Modal"

export default function GetAllLikes({questionId}){
  const dispatch = useDispatch()
  const like_count = useSelector(state => state.question.singleQuestion.like_count)

  const [errors, setErrors] = useState([])
  const sessionUser = useSelector(state => state.session.user)
  const { closeModal } = useModal();

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
    console.log("deleteLikeThunkRes", deleteLikeThunkRes.errors)
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
      <ul className='answer-question-errors-container' >
        {errors.map((error, idx) => (
            <div  className='answer-question-errors-item' onClick ={() => setErrors([])} key={idx}>{error}</div>
        ))}
      </ul>
      <div className="like-tooltip">
        <img src="https://emojis.wiki/thumbs/emojis/eject-button.webp" alt="" className="single-question-upside" onClick={ () => handleAddLike(questionId)} />
        <span className="like-tooltiptext">like?</span>
      </div>
      <div> {like_count} likes</div>
      <div className="unlike-tooltip">
        <img src="https://emojis.wiki/thumbs/emojis/eject-button.webp" alt="" className="single-question-upside-down" onClick={ () => handleDeleteLike(questionId)} />
        <span className="unlike-tooltiptext">unlike?</span>
      </div>
    </div>
  )
}
