from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get('SCHEMA')


class Question(db.Model):
    __tablename__ = 'questions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    title = db.Column(db.String(255), nullable=False, unique=True)
    description = db.Column(db.String(1024), nullable=False, unique=True)
    tags = db.Column(db.String(255))
    createdAt = db.Column(db.DateTime, nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime, nullable=False, server_default=func.now())

    user = db.relationship("User", back_populates="questions")
    question_likes = db.relationship("QuestionLike", back_populates="question", cascade="all, delete")
    answers = db.relationship("Answer", back_populates="question", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'description': self.description,
            "tags":self.tags,
            "createdAt":self.createdAt,
            "updatedAt": self.updatedAt
        }
