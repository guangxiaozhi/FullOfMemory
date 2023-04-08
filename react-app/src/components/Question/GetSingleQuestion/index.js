import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { fetchOneQuestion, fetchAllQuestions, deleteOneQuestionThunk } from '../../../store/question';
import GetAllAnswers from '../../Answer/GetAllAnswers'
import GetAllLikes from '../../QuestionLike/GetAllLikes'

// import { StacksEditor } from "@stackoverflow/stacks-editor";
// // don't forget to include the styles as well
// import "@stackoverflow/stacks-editor/dist/styles.css";
// // include the Stacks js and css as they're not included in the bundle
// import "@stackoverflow/stacks";
// import "@stackoverflow/stacks/dist/css/stacks.css";
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

import './singleQuestion.css'

function GetSingleQuestion() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { questionId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);


  const sessionUser = useSelector(state => state.session.user)


  const singleQuestion = useSelector(state => {
    // console.log("state from get single question component", state)
    return state.question.singleQuestion
  })


  const question = singleQuestion ? singleQuestion : []
  const answerAccount = question ? question.answer_count : 0
  // console.log("???????? question", question)
  // console.log("???????? sessionUser", sessionUser)


  useEffect(async () => {
    // console.log("%%%%%% start fetchONeQuestion")
    const result = await dispatch(fetchOneQuestion(+questionId))
    // console.log("result form fetchOneQuestion", result, typeof (result))
    if (Array.isArray(result)) {
      // console.log("result[1]", result[1])
      setIsLoaded(true)
    } else {
      // console.log("result form fetchOneQuestion 222222", result, typeof(result))
      history.push('questions/*')
    }
  }, [dispatch, questionId])

  const handleDelete = (questionId) => async (e) => {
    // console.log("handle delete ")
    // console.log("delete question 1")
    await dispatch(deleteOneQuestionThunk(questionId))
      .then(() => dispatch(fetchAllQuestions()))
      .then(history.push('/'))
  }


  let answerQuestionSession

  // if(!sessionUser ){
  //   answerQuestionSession = (
  //     <div className="answer-question-model"><OpenModalButton buttonText = "Answer Question" modalComponent={<AnswerQuestion singleQuestion={question}/>}/></div>
  //   )
  // }else {
  //   if (question.user_id !== sessionUser.id && !hasAnswer){
  //     answerQuestionSession = (<div className="answer-question-model"><OpenModalButton buttonText = "Answer Question" modalComponent={<AnswerQuestion singleQuestion={question}/>}/></div>)
  //   }
  // }


  const jumpingToUpdateQuestion = (e) => {
    e.preventDefault()
    history.push(`/questions/${question.id}/edit`)
  }

  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

  const penSVG = (<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M8.071 21.586l-7.071 1.414 1.414-7.071 14.929-14.929 5.657 5.657-14.929 14.929zm-.493-.921l-4.243-4.243-1.06 5.303 5.303-1.06zm9.765-18.251l-13.3 13.301 4.242 4.242 13.301-13.3-4.243-4.243z" /></svg>)
  const exchangeSVG = (<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M17.7 332.3h412.7v22c0 37.7-29.3 68-65.3 68h-19L259.3 512v-89.7H83c-36 0-65.3-30.3-65.3-68v-22zm0-23.6h412.7v-85H17.7v85zm0-109.4h412.7v-85H17.7v85zM365 0H83C47 0 17.7 30.3 17.7 67.7V90h412.7V67.7C430.3 30.3 401 0 365 0z" /></svg>)
  const stackoverflowSVG = (<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M290.7 311L95 269.7 86.8 309l195.7 41zm51-87L188.2 95.7l-25.5 30.8 153.5 128.3zm-31.2 39.7L129.2 179l-16.7 36.5L293.7 300zM262 32l-32 24 119.3 160.3 32-24zm20.5 328h-200v39.7h200zm39.7 80H42.7V320h-40v160h359.5V320h-40z" /></svg>)

  return (
    isLoaded && (
      <div key={question.id} className="single-question-root-container">
        <div className='single-title'>{question.title}</div>
        <div className='single-time'>
          <p className='time'>Asked {new Date(question.createdAt).toLocaleDateString("en-US", options)}</p>
          <p className='time'>Modified {new Date(question.updatedAt).toLocaleDateString("en-US", options)}</p>
        </div>
        <div className='except-title-time'>
          <div className='single-question-related-answers'>
            <div className="single-question-container">
              <div className="single-like-answer">
                <div className='get-question-like'> <GetAllLikes questionId={question.id} /> </div>
              </div>
              <div className='single-question-body'>

                <ReactMarkdown plugins={[gfm]}>{question.description}</ReactMarkdown>
                <div className="single-tags">{question.tags}</div>
                {/* {answerQuestionSession} */}
              </div>
            </div>
            <div className='update-delete-button-container'>
              <div className='update-delete-button'>
                {sessionUser && question.user_id === sessionUser.id ? <div className="delete-update-question"><button onClick={jumpingToUpdateQuestion}>Edit</button></div> : ""}
                {sessionUser && question.user_id === sessionUser.id ? <div className="delete-update-question"><button onClick={handleDelete(question.id)}>Delete</button></div> : ""}
                {/* {sessionUser && question.user_id === sessionUser.id ? <div className="delete-update-question"><OpenModalButton buttonText = "Update Question" modalComponent={<UpdateQuestion singleQuestion={question}/>}/></div> : ""} */}

              </div>
              <div className="single-tag-username">
                <Link className='single-user-profile' to={`/users/${question.user.id}`}>
                  <img src={`${question.user.portrait}`} alt="" />
                  <div className="single-username">{question.user.username}</div>
                </Link>
              </div>
            </div>
            <div className='single-question-related-answers-container'>
              <div className='all-answers-owned-by-current-question'>
                {question.answer_count ? <GetAllAnswers questionId={questionId} answerAccount={answerAccount} /> : ""}
              </div>

            </div>
          </div>


          <ul className='single-question-side-bar'>
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

export default GetSingleQuestion
