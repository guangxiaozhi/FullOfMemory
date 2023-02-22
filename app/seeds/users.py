from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    tommy = User(username='Tommy Bahama', email="Tommy_Bahama@hotmail.com", password='password')
    eleanor = User(username="Eleanor Auker", email="Eleanor_Auker@hotmail.com", password='password')
    james = User(username="James Bacher", email="James_Bacher@hotmail.com", password='password')
    hazel = User(username="Hazel Zane", email="Hazel_Zane@hotmail.com", password='password')
    ellis = User(username="Ellis Wink", email="Ellis_Wink@hotmail.com", password='password')
    audrey = User(username="Audrey Wherry", email="Audrey_Wherry@hotmail.com", password='password')
    olive = User(username="Olive Tomson", email="Olive_Tomson@hotmail.com", password='password')
    william = User(username="William Tandy", email="William_Tandy@hotmail.com", password='password')
    charlie = User(username="Charlie Staple", email="Charlie_Staple@hotmail.com", password='password')
    ivy = User(username="Ivy Rosemond", email="Ivy_Rosemond@hotmail.com", password='password')

    user_list = [demo, marnie, bobbie, tommy, eleanor, james, hazel, ellis, audrey, olive, william, charlie, ivy]
    added_users = [db.session.add(user) for user in user_list]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
