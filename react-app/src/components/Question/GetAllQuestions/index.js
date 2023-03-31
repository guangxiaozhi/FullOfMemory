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

  const allquestions = allQuestionsObj ? Object.values(allQuestionsObj):[];
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
  return (
    isLoaded && (
      <div className="all-question-container" >
        <div className="create-question-button-container">
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
                  <div className="description">{question.description.substring(0,200)}......</div>
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

    )
  )
}

export default GetAllQuestions
