import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useModal } from '../../../context/Modal'

import {createQuestionThunk, fetchAllQuestions} from '../../../store/question'

function CreateQuestion(){

  const dispatch = useDispatch()
  const history = useHistory()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("")

  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const sessionUser = useSelector(state => state.session.user);
  // console.log("sessionUser", sessionUser)

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = {
      title,
      description,
      tags
    }
    // console.log("handle submit newQuestion", newQuestion)
    dispatch(createQuestionThunk(newQuestion))
      .then(() => dispatch(fetchAllQuestions()) )
      .then(closeModal())
      .catch(
        async (res) => {
            // console.log("data",res.errors)
            if (res && res.errors) setErrors(res.errors);
        }
      )
  }

  return (
    <>
      <h2 className='create-question-text'>Create New Question</h2>
      <form className='create-question-form' onSubmit={handleSubmit}>
        <ul>
            {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
            ))}
        </ul>

        <label>
              <span>Title</span>
              <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
              />
            </label>

            <label>
              <span>Description</span>
              <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
              />
            </label>

            <label>
              <span>Tags</span>
              <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
              />
            </label>

            <button type="submit"> Submit </button>

      </form>
    </>
  )
}
export default CreateQuestion
