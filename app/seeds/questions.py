from app.models import db, Question, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_questions():
    ques1 = Question(
        user_id=1, title="Calculate jump height only with 'time in air' ", description = "Time starts when my shoes/feets lose contact to floor and stop when touch it again (approximately). Half of all time my body will rise up and half of time fall down. It is correct? Both movements accelerations will be earth acceleration ~9,8 m/s^2? Is my thinking ok? So after half of time my body will be in top point and my velocity will be 0 m/s.", tags = "math")
    ques2 = Question(
        user_id=2, title="how do i autosize a resource image into a datagridview column", description = "My Resources has Status_Active and Status_Inactive which are two 48x48 buttons colored green and red, supposed to display the user status. The datagridview has 2 columns, one textbox and one image column.", tags = "c#-winforms")
    ques3 = Question(
        user_id=3, title="How can I convert a Datable to a List<T> when class properties match table columns without using a for loop?", description = "What's the fastest way to convert a DataTable with matching class properties to a List?", tags = "c#-datatable")

    ques4 = Question(
        user_id=4,
        title="Does Object.assign() create a deep copy or a shallow copy?",
        description = "61 I just came across this concept of var copy = Object.assign({}, originalObject); which creates a copy of original object into the 'copy' object. However, my question is, does this way of cloning object create a deep copy or a shallow copy?",
        tags = "Javascript object deep-copy")

    ques5 = Question(
        user_id=6,
        title="Kotlin JS: Search complete course",
        description = "after a lot of research on the internet I do not find a lot of tutorials on kotlin JS, and the few that there are are incomplete. Someone would have the link of a full stack course in Kotlin JS? Design pattern, front end, back end",
        tags = "kotlin")

    ques6 = Question(
        user_id=1,
        title="Export google search to a spreadsheet",
        description = "Is it possible for me to create a list of google search results from a specific query and export it into excel? For example, I'd like to google orthodontists in Florida and be able to export the business name, phone number and address to an excel spreadsheet. I've done a lot of searching but I can't find any solutions. I'm looking for someone to point me in the right direction. Any help is appreciated, thanks",
        tags = "excel google-search")
    ques7 = Question(
        user_id=8,
        title="How to make a GET (REST API) from xray Jira Cloud with Postman",
        description = "My organization has a Jira Cloud Xray environment, I want to get test steps of a particular Test issue (or many) in Postman. I managed to authenticate performing a POST request with Bearer token Auth that links to the body of request with 2 codes: client_id and client_secret The output of this request is one token, so I stored it in a variable. I think I have to use this token to perform a GET request but I get this output: 'error': Authentication request has expired. Try reloading the page.",
        tags = "api testing postman jira jira-xray")

    db.session.add(ques1)
    db.session.add(ques2)
    db.session.add(ques3)
    db.session.add(ques4)
    db.session.add(ques5)
    db.session.add(ques6)
    db.session.add(ques7)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_questions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM questions")

    db.session.commit()
