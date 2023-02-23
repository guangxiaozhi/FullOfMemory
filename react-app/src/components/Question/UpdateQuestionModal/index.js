import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateQuestionThunk, fetchOneQuestion} from '../../../store/question';
import { useModal } from '../../../context/Modal';


function UpdateQuestion({singleQuestion}) {
  console.log("update question ", singleQuestion)
  console.log("update question ", singleQuestion.id)
  const dispatch = useDispatch();

  const [title, setTitle] = useState(singleQuestion.title);
  const [description, setDescription] = useState(singleQuestion.description);
  const [tags, setTags] = useState(singleQuestion.tags)

  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const sessionUser = useSelector(state => state.session.user);

  const handleUpdate = (e) => {
    e.preventDefault();
    const questionId = singleQuestion.id;
    const userId = sessionUser.id
    const updatedQuestion = {
      title,
      description,
      tags,
    }

    dispatch(updateQuestionThunk(updatedQuestion,questionId))
      .then(() => dispatch(fetchOneQuestion(questionId)))
      .then(closeModal())
      .catch(
        async (res) => {
            const data = await res.json();
            console.log("data", data.errors)
            if (data && data.errors) setErrors(data.errors);
        }
    )
  }

  let sessionLinks;

  if(sessionUser){
    const questionUserId = singleQuestion.user_id;
    const userId = sessionUser.id

    if(questionUserId === userId){
      sessionLinks = (
        <>
          <form
            className='update-question-form'
            onSubmit={handleUpdate}
          >
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
    <>
      <h2 className='update-question-text'>Update Question</h2>
      {sessionLinks}
    </>
  )
}

export default UpdateQuestion
