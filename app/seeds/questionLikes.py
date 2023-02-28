from app.models import db, QuestionLike, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_question_likes():
    ques_like1 = QuestionLike(user_id=1, question_id=2, like_unlike=1)
    ques_like2 = QuestionLike(user_id=2, question_id=3, like_unlike=1)
    ques_like3 = QuestionLike(user_id=3, question_id=1, like_unlike=1)
    ques_like4 = QuestionLike(user_id=4, question_id=2, like_unlike=1)
    ques_like5 = QuestionLike(user_id=4, question_id=3, like_unlike=1)
    ques_like6 = QuestionLike(user_id=5, question_id=1, like_unlike=1)
    ques_like7 = QuestionLike(user_id=6, question_id=1, like_unlike=1)
    ques_like8 = QuestionLike(user_id=7, question_id=2, like_unlike=1)
    ques_like9 = QuestionLike(user_id=8, question_id=1, like_unlike=1)

    ques_like_lists = [ques_like1, ques_like2, ques_like3, ques_like4, ques_like5, ques_like6, ques_like7, ques_like8, ques_like9]
    added_ques_like = [db.session.add(like) for like in ques_like_lists]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_question_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.question_likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM question_likes")

    db.session.commit()
