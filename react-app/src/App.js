import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import SignupFormPage from "./components/SignupFormPage";
// import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import GetAllQuestions from "./components/Question/GetAllQuestions";
import GetSingleQuestion from "./components/Question/GetSingleQuestion";
import EditAnswers from "./components/Answer/EditAnswer";
import UserProfilePage from "./components/UserProfile/GetUserProfilePage";
import Footer from "./components/Footer";
import SearchPage from "./components/SearchPage";
import CreateQuestionPackage from "./components/Question/CreateQuestionPackage";
import UpdateQuestionPackage from "./components/Question/UpdateQuestionPackage";
import UpdateAnswerPackage from "./components/Answer/EditAnswerPackage"

import NotFound from "./components/NotFound";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <>
          <Switch>
            {/* <Route path="/login" >
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route> */}
            <Route exact path='/questions/:questionId/edit'>
              <UpdateQuestionPackage />
            </Route>
            <Route exact path='/questions/ask'>
              <CreateQuestionPackage />
            </Route>
            <Route exact path="/">
              <GetAllQuestions />
            </Route>
            <Route exact path="/questions/:questionId">
              <GetSingleQuestion />
            </Route>
            {/* <Route exact path="/questions/:questionId/answers/:answerId">
              <EditAnswers />
            </Route> */}
            <Route exact path="/questions/:questionId/answers/:answerId/edit">
              <UpdateAnswerPackage />
            </Route>
            <Route exact  path='/users/:userId' >
              <UserProfilePage />
            </Route>
            <Route exact path='/tags/:keyword'>
              <SearchPage />
            </Route>

            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
          <Footer />
        </>

      )}
    </>
  );
}

export default App;
