from app.models import db, AnswerLike, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_answer_likes():
    answer_like1 = AnswerLike(user_id=1, answer_id=2)
    answer_like2 = AnswerLike(user_id=2, answer_id=3)
    answer_like3 = AnswerLike(user_id=3, answer_id=1)
    answer_like4 = AnswerLike(user_id=4, answer_id=2)
    answer_like5 = AnswerLike(user_id=5, answer_id=3)
    answer_like6 = AnswerLike(user_id=5, answer_id=1)
    answer_like7 = AnswerLike(user_id=6, answer_id=1)
    answer_like8 = AnswerLike(user_id=7, answer_id=2)
    answer_like9 = AnswerLike(user_id=8, answer_id=1)

    answer_like_lists = [answer_like1, answer_like2, answer_like3, answer_like4, answer_like5, answer_like6, answer_like7, answer_like8, answer_like9]
    added_answer_like = [db.session.add(like) for like in answer_like_lists]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_answer_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.answer_likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM answer_likes")

    db.session.commit()
