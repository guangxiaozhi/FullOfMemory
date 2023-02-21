## FullOfMemory Store Shape:

```js
store = {
    session: {
      user:{}
    },
    questions: {
      allQuestions: {
        [questionId]: {
            questionData,
        },
      },
      singleQuestion: {
        questionData,
        User: {
            userData,
        },
      },
    },

    answers: {
      answerId: {
        answerData,
        User: {
          userData,
        },
      },
    },

    userProfile:{
      user:{
        userData,
      }
      questions:{
        [questionId]: {
            questionData,
        },
      }
      answers:{
        [answerId]: {
            answerData,
        },
      }
    }

};

```
