import { useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateQuestionThunk, fetchOneQuestion} from '../../../store/question';
import { useModal } from '../../../context/Modal';
import './updateQuestion.css'

function UpdateQuestion({singleQuestion}) {
  // console.log("update question ", singleQuestion)
  // console.log("update question ", singleQuestion.id)
  const dispatch = useDispatch();

  const [title, setTitle] = useState(singleQuestion.title);
  const [description, setDescription] = useState(singleQuestion.description);
  const [tags, setTags] = useState(singleQuestion.tags)

  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const sessionUser = useSelector(state => state.session.user);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const questionId = singleQuestion.id;
    // const userId = sessionUser.id
    const updatedQuestion = {
      title,
      description,
      tags,
    }

    const updatedQuestionRes = await dispatch(updateQuestionThunk(updatedQuestion,questionId))

    if(typeof(updatedQuestionRes) == "number"){
      dispatch(fetchOneQuestion(questionId))
        .then(closeModal())
        .catch(
          async (res) => {
              // const data = await res.json();
              // console.log("data", data.errors)
              if (res && res.errors) setErrors(res.errors);
          }
        )
    }else{
      setErrors(updatedQuestionRes)
    }

  }

  let sessionLinks;

  if(sessionUser){
    const questionUserId = singleQuestion.user_id;
    const userId = sessionUser.id

    if(questionUserId === userId){
      sessionLinks = (
        <div className='update-question-container'>
          <form
            className='update-question-form'
            onSubmit={handleUpdate}
          >
            <ul className='errors-container'>
              {errors.map((error, idx) => (
                  <li  className='question-errors-item' key={idx}>{error}</li>
              ))}
            </ul>

            <label className='question-body-item'>
              <span >Title:</span>
              <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
              />
            </label>

            <label className='question-body-item'>
              <span>Description:</span>
              <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
              />
            </label>

            <label className='question-body-item'>
              <span>Tags:</span>
              <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
              />
            </label>

            <button className="update-question-button" type="submit"> Submit </button>

          </form>
        </div>
      )
    } else {
      sessionLinks = (
        <div>
          You are not the owner
        </div>
      )
    }

  } else {
    sessionLinks = (
      <div>
        Please log in to update the Question
      </div>
    )
  }


  return (
    <div className = "container">
      <h2 className='update-question-text'>Update Question</h2>
      {sessionLinks}
    </div>
  )
}

export default UpdateQuestion
