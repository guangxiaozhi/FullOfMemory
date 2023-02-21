# User Stories

## Users

### Sign Up

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  * When I'm on the `/signup` page:
    * I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the sign-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the sign-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    * So that I can try again without needing to refill forms I entered valid data into.

### Log in

* As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  * When I'm on the `/login` page:
    * I would like to be able to enter my email and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the lob-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the log-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      * So that I can try again without needing to refill forms I entered valid data into.

### Demo User

* As an unregistered and unauthorized user, I would like an easy-to-find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
  * When I'm on either the `/signup` or `/login` pages:
    * I can click on a Demo User button to log me in and allow me access as a normal user.
      * So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

* As a logged-in user, I want to log out via an easy-to-find log-out button on the navigation bar.
  * While on any page of the site:
    * I can log out of my account and be redirected to a page displaying recent FauxTweets.
      * So that I can easily log out to keep my information secure.

## Questions

### Creating Questions

* As a logged-in user, I want to be able to post a new question.
  * When I'm on the `/home` page:
    * I can create and submit a new question, including the title, description, tags

### Viewing Question

* As a logged in _or_ logged out user, I want to be able to view a specific question and its title, tags, detail description, likes, etc.
  * When I'm on the `/questions/:id` page:
    * I can view the content of the question, as well as the associated title, tags, detail description, likes, etc.
      * So that I can gain a basic knowledge of the qestion.

### Updating Question

* As a logged-in user, I want to be able to edit my question by clicking an Edit button associated with the question.
  * When I'm on the `/questions/:id` pages:
    * I can click "Edit" to make permanent changes to the question I have posted/own.
      * So that I can fix any errors I make on my question page.

### Deleting Question

* As a logged-in user, I want to be able to delete my question by clicking a Delete button associated with the question.
  * When I'm on the `/questions/:id` pages:
    * I can click "Delete" to permanently delete a questionI have posted.


## Answer

### Creating Answer

* As a logged-in user, I want to be able to answer the question.
  * When I'm on the `/questions/:id/answer` page:
    * I can create and submit a new answer, including the answer.
      * So that I can share my experience with other users as a reference for their consideration.

### Viewing Answer

* As a logged in _or_ logged out user, I want to be able to view a specific question and its answers.
  * When I'm on the `/questions/:id` page:
    * I can view the content of the question, as well as the associated answers.
      * So that I can gain a general understanding of the question, based on other users' answers.

### Updating Answer

* As a logged-in user, I want to be able to edit my answer by clicking an Edit button associated with the answer.
  * When I'm on the `/questions/answer/:answerId` pages:
    * I can click "Edit" to make permanent changes to the answer that I have posted before.
      * So that I can fix any errors or add more details for my previous answers.

### Deleting Answer

* As a logged-in user, I want to be able to delete my answer by clicking a Delete button associated with the answer.
  * When I'm on the `/questions/answer/:answerId` pages:
    * I can click "Delete" to permanently delete the answer I have posted.
      * So that when I don't want the answer to be publicly seen, I can easily remove it.


## User profile

### Viewing profile

* As a logged in _or_ logged out user, I want to be able to view my own and other users' profile pages.
  * When I'm on the `/users/:id` page:
    * I can view the users' biography information, all the questions, and answers.

### Updating profile

* As a logged-in user, I want to be able to edit my user profile page by clicking an Edit button.
  * When I'm on the `/user/:id` pages:
    * I can click "Edit" to update my questions and answers information.
      * So that I can keep my user profile page up to date.


## Search/filters


### Viewing Search/filter

* As a logged in _or_ logged out user, I want to be able to narrow down my search results based on the filters applied.
  * When I'm on the `/home` page:
    * I can narrow down my search results by applying combined filters on title, tags, etc. The homepage will display the search results based on the conditions applied.
      * So that I can quickly find the questions that best suits my need.
