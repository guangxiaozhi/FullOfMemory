import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useModal } from '../../../context/Modal'

function CreateQuestionModal(){
  const dispatch = useDispatch()
  const history = useHistory()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("")

  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const sessionUser = useSelector(state => state.session.user);

  const handleSubmit = () => {

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

      </form>
    </>
  )
}
export default CreateQuestionModal
