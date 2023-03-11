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
            <Route exact path="/">
              <GetAllQuestions />
            </Route>
            <Route exact path="/questions/:questionId">
              <GetSingleQuestion />
            </Route>
            <Route path="/questions/:questionId/answers/:answerId">
              <EditAnswers />
            </Route>
            <Route  path='/users/:userId' >
              <UserProfilePage />
            </Route>
          </Switch>
          <Footer />
        </>

      )}
    </>
  );
}

export default App;
