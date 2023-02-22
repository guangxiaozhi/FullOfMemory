from app.models import db, Question, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_questions():
    ques1 = Question(
        user_id=1, title="Calculate jump height only with 'time in air' ", description = "Time starts when my shoes/feets lose contact to floor and stop when touch it again (approximately). Half of all time my body will rise up and half of time fall down. It is correct? Both movements accelerations will be earth acceleration ~9,8 m/s^2? Is my thinking ok? So after half of time my body will be in top point and my velocity will be 0 m/s.", tags = "math")
    ques2 = Question(
        user_id=2, title="how do i autosize a resource image into a datagridview column", description = "My Resources has Status_Active and Status_Inactive which are two 48x48 buttons colored green and red, supposed to display the user status. The datagridview has 2 columns, one textbox and one image column.", tags = "c#-winforms")
    ques3 = Question(
        user_id=3, title="How can I convert a Datable to a List<T> when class properties match table columns without using a for loop?", description = "What's the fastest way to convert a DataTable with matching class properties to a List?", tags = "c#-datatable")

    db.session.add(ques1)
    db.session.add(ques2)
    db.session.add(ques3)
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
