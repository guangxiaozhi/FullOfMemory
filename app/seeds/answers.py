from app.models import db, Answer, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_answers():
    answer1 = Answer(
        user_id=2, question_id=1, answer_body="You do realise the solution you give at the end is negative? You end up with ymax = -g*tair^2/8 < 0. Don't you see a contradiction there? It's not that I don't like your answer. Everything in your answer is correct, except the claim that y'(0) = c0 = 0 . And starting from this false claim, all the calculations that follow are false.")
    answer2 = Answer(
        user_id=3, question_id=2, answer_body="I was able to work this around by resizing the icons drawing a new Bitmap.")
    answer3 = Answer(
        user_id=4, question_id=3, answer_body="The fastest way is to write explicit code to create new objects of the class and assign the properties from the corresponding columns directly, that is specific to the class and DataTable and returning a List<T>.")
    answer4 = Answer(
        user_id=2, question_id=3, answer_body="Your approximation is that the human did not jump and stayed on the ground! This contradicts the information we have that the jump lasted exactly 6 seconds.")
    answer5 = Answer(
        user_id=3, question_id=1, answer_body="I disagree with y'(0) = c0 = 0. This is a human jumping. There is an initial velocity in the upwards direction when the human pushes off the ground, although its exact value is unknown. You have to deduce its value by using the fact that y' is 0 at t=3 seconds, or that y is 0 at t=6 seconds.")
    answer6 = Answer(
        user_id=4, question_id=2, answer_body="I reproduced your post where two embedded 48 x 48 images are part of the class that represents a row in the bound data set and are coerced into a 32 x 32 display area.")
    answer7 = Answer(
        user_id=5, question_id=2, answer_body="Normal: The image is centered and displayed in its original size. Stretch: The image stretches or shrinks to fit the width and height of the cell. Zoom: The image uniformly enlarges or shrinks until it fills the width or height of the cell.")
    answer8 = Answer(
        user_id=6, question_id=3, answer_body="A fairly slow way is to use Reflection to gather the public properties of the class and assign the corresponding column values to new objects created in that way. However, this is very generic in that it will work with any type without any specialization required.")

    answer9 = Answer(
        user_id=6, question_id=4, answer_body="By using Object.assign(), you are actually doing Shallow Copy of your object. Whenever we do an operation like assigning one object to other, we actually perform a shallow copy, i.e. if OBJ1 is an object, modifying it through another object which is OBJ2 will reflect changes in OBJ1 too.")
    answer10 = Answer(
        user_id=4, question_id=5, answer_body="Kotlin-JS (& Native) are kind of Kotlin's stepchilds -ambitiously but somehow neglected... Im working on a SPA / PWA project for almost 2 years using Kotlin-JS and really find it hot and absolut usable. Ok, there is Typescript that has an excellent infrastructure and bindings to all JS Frameworks. But, if you don't need many external frameworks (which always means external dependence!) you are perfect with Kotlin. It is so much more powerful than TS but the learning curve is quite steep. I would like to share my experiences with the community but due to scarce resources I can not do it allone. Maybe there will be a community to get things going...? Feel free to contact me for exchange experiences.")
    answer11 = Answer(
        user_id=11, question_id=4, answer_body="It creates a shallow copy, according to this paragraph from MDN: For deep cloning, we need to use other alternatives because Object.assign() copies property values. If the source value is a reference to an object, it only copies that reference value. For the purposes of redux, Object.assign() is sufficient because the state of a redux app only contains immutable values (JSON).")
    answer12 = Answer(
        user_id=11, question_id=6, answer_body="An API is an Application Programming Interface and it's a way for your software to interact with the software on a server. Google has an API called the 'Custom Search Engine' which you can use for 100 free queries per day. Other search engines may have more generous free APIs. With a search API you can write a code to download text that contain all the relevant data. You can read more about search engine APIs here.")
    answer13 = Answer(
        user_id=12, question_id=6, answer_body="The following web app https://www.resultstoexcel.com/ allows you to download Google search results to a CSV file, a Microsoft Excel readable format, for free. If you have any problem viewing the downloaded results correctly in MS Excel, please read the FAQs section where you will find how to open the file using the correct column separators.")


    answers_list = [answer1, answer2, answer3, answer4, answer5, answer6, answer7, answer8, answer9, answer10, answer11, answer12, answer13]
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
