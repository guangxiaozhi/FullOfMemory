from app.models import db, Answer, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_answers():
    answer1 = Answer(
        user_id=2, question_id=1, answer_body="You do realise the solution you give at the end is negative? You end up with ymax = -g*tair^2/8 < 0. Don't you see a contradiction there? It's not that I don't like your answer. Everything in your answer is correct, except the claim that y'(0) = c0 = 0 . And starting from this false claim, all the calculations that follow are false")
    answer2 = Answer(
        user_id=3, question_id=2, answer_body="I was able to work this around by resizing the icons drawing a new Bitmap.")
    answer3 = Answer(
        user_id=4, question_id=3, answer_body="The fastest way is to write explicit code to create new objects of the class and assign the properties from the corresponding columns directly, that is specific to the class and DataTable and returning a List<T>.")
    answer4 = Answer(
        user_id=2, question_id=3, answer_body="Your approximation is that the human did not jump and stayed on the ground! This contradicts the information we have that the jump lasted exactly 6 seconds")
    answer5 = Answer(
        user_id=3, question_id=1, answer_body="I disagree with y'(0) = c0 = 0. This is a human jumping. There is an initial velocity in the upwards direction when the human pushes off the ground, although its exact value is unknown. You have to deduce its value by using the fact that y' is 0 at t=3 seconds, or that y is 0 at t=6 seconds")
    answer6 = Answer(
        user_id=4, question_id=2, answer_body="I reproduced your post where two embedded 48 x 48 images are part of the class that represents a row in the bound data set and are coerced into a 32 x 32 display area:")
    answer7 = Answer(
        user_id=5, question_id=2, answer_body="Normal: The image is centered and displayed in its original size. Stretch: The image stretches or shrinks to fit the width and height of the cell. Zoom: The image uniformly enlarges or shrinks until it fills the width or height of the cell.")
    answer8 = Answer(
        user_id=6, question_id=3, answer_body="A fairly slow way is to use Reflection to gather the public properties of the class and assign the corresponding column values to new objects created in that way. However, this is very generic in that it will work with any type without any specialization required.")


    answers_list = [answer1, answer2, answer3, answer4, answer5, answer6, answer7, answer8]
    added_answers = [db.session.add(answer) for answer in answers_list]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_answers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.answers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM answers")

    db.session.commit()
