import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../../context/Modal'

import {createQuestionThunk, fetchAllQuestions} from '../../../store/question'
import './createQuestion.css'

function CreateQuestion(){

  const dispatch = useDispatch()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("")

  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const sessionUser = useSelector(state => state.session.user);
  // console.log("sessionUser", sessionUser)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newQuestion = {
      title,
      description,
      tags
    }
    // console.log("handle submit newQuestion", newQuestion)
    const createdQuestionRes = await dispatch(createQuestionThunk(newQuestion))
    // console.log("createdQuestionRes", createdQuestionRes)
    if (typeof(createdQuestionRes) == "number"){
      dispatch(fetchAllQuestions())
        .then(closeModal())
        .catch(
          async (res) => {
              if (res && res.errors) setErrors(res.errors);
          })
    }else{
      setErrors(createdQuestionRes)
    }

  }

  let sessionLinks
  if(sessionUser){
    sessionLinks = (
      <div className='create-question-container'>
        <h2 className='create-question-text'>Create New Question</h2>
        <form className='create-question-form' onSubmit={handleSubmit}>
          <ul>
              {errors.map((error, idx) => (
                  <li  className='question-errors-item' key={idx}>{error}</li>
              ))}
          </ul>

          <label className='create-question-body-item'>
            <span>Title:</span>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label className='create-question-body-item'>
            <span>Description:</span>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <label className='create-question-body-item'>
            <span>Tags:</span>
            <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />
          </label>

          <button className="create-question-button" type="submit"> Submit </button>

        </form>
      </div>
    )
  }else {
    sessionLinks = (
      <h1>
         Please log in to Ask Question
      </h1>
    )
  }

  return (
    <div>
      {sessionLinks}
    </div>
  )
}
export default CreateQuestion
