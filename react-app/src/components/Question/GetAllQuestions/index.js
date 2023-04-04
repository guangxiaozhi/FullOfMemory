import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import { fetchAllQuestions, } from '../../../store/question'
import { Link } from "react-router-dom";
import OpenModalButton from '../../OpenModalButton'
import CreateQuestion from "../CreateQuestionModal";
import CreateQuestionPackage from '../CreateQuestionPackage'
import './getAllQuestions.css'

function GetAllQuestions() {
  // console.log("delete question 4")
  // const sessionUser = useSelector(state => state.session.user)
  const allQuestionsObj = useSelector(state => {
    // console.log("state from useSelector", state)
    return state.question.allQuestions
  })

  const allquestions = allQuestionsObj ? Object.values(allQuestionsObj) : [];
  const [isLoaded, setIsLoaded] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    dispatch(fetchAllQuestions())
      .then(() => setIsLoaded(true))
    // .then(() => history.push('/'))
  }, [dispatch])

  const jumpingToCreateQuestion = (e) => {
    e.preventDefault()
    history.push('/questions/ask')
  }

  const penSVG = (<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M8.071 21.586l-7.071 1.414 1.414-7.071 14.929-14.929 5.657 5.657-14.929 14.929zm-.493-.921l-4.243-4.243-1.06 5.303 5.303-1.06zm9.765-18.251l-13.3 13.301 4.242 4.242 13.301-13.3-4.243-4.243z"/></svg>)
  const exchangeSVG = (<svg width="24" height="24"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M17.7 332.3h412.7v22c0 37.7-29.3 68-65.3 68h-19L259.3 512v-89.7H83c-36 0-65.3-30.3-65.3-68v-22zm0-23.6h412.7v-85H17.7v85zm0-109.4h412.7v-85H17.7v85zM365 0H83C47 0 17.7 30.3 17.7 67.7V90h412.7V67.7C430.3 30.3 401 0 365 0z"/></svg>)
  const stackoverflowSVG = (<svg width="24" height="24"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M290.7 311L95 269.7 86.8 309l195.7 41zm51-87L188.2 95.7l-25.5 30.8 153.5 128.3zm-31.2 39.7L129.2 179l-16.7 36.5L293.7 300zM262 32l-32 24 119.3 160.3 32-24zm20.5 328h-200v39.7h200zm39.7 80H42.7V320h-40v160h359.5V320h-40z"/></svg>)

  return (
    isLoaded && (
      <div className="all-question-container" >
        <div className="all-question-contianer-questions">

          <div className="create-question-button-container">
            <h1>All Questions</h1>
            {
              <div className="create-question-model-button">
                {/* <OpenModalButton
                buttonText="Ask Question"
                modalComponent={< CreateQuestion />}
              /> */}
                <button onClick={jumpingToCreateQuestion}>Ask Question</button>
              </div>
            }
          </div>

          <div className="allQuestionsList">
            {
              allquestions.map(question => (
                <div key={question.id} className="question">
                  <div className="like-answer">

                    <div>{question.like_count} likes</div>

                    <div className="answer">{question.answer_count} answers</div>
                  </div>
                  <div className="question-body">
                    <Link className="title" to={`/questions/${question.id}`} >{question.title}</Link>
                    <div className="description">{question.description.substring(0, 200)}......</div>
                    <div className="tag-username">
                      <div className="tags">{question.tags}</div>
                      <Link className="user-profile" to={`/users/${question.user.id}`}>
                        <img src={`${question.user.portrait}`} alt="" />
                        <div className="username">{question.user.username}</div>
                      </Link>

                    </div>

                  </div>
                </div>
              ))
            }
          </div>

        </div>


        <div className="fixed-context-on-home-page">
        <ul className='single-question-side-bar-on-home-page'>
            <li className='side-basr-title '>The FullOfMemory Blog</li>
            <li className='has-two-items'>
              <div className='svg'>{penSVG}</div>
              <div>"Data driven" decisions aren't innovative decisions</div>
            </li>
            <li className='side-basr-title'>Featured on Meta</li>
            <li className='has-two-items'>
              <div className='svg'>{exchangeSVG}</div>
              <div>Improving the copy in the close modal and post notices - 2023 editon</div>
            </li>
            <li className='has-two-items'>
              <div className='svg'>{stackoverflowSVG}</div>
              <div>Plagiarism flag and moderator tooling has launched to FullOfMemory!</div>
            </li>
            <li className='has-two-items'>
              <div className='svg'>{stackoverflowSVG}</div>
              <div>Do you observe increased relevance of Related Questions with our Machine...</div>
            </li>
            <li className='has-two-items'>
              <div className='svg'>{stackoverflowSVG}</div>
              <div>Temporary policy: ChatGPT is banned</div>
            </li>
          </ul>
        </div>
      </div>

    )
  )
}

export default GetAllQuestions
