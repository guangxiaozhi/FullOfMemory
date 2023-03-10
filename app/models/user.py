from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func


import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get('SCHEMA')

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    is_deleted = db.Column(db.Integer, default=0)
    createdAt = db.Column(db.DateTime, nullable=False, server_default=func.now())
    portrait = db.Column(db.String(255),  nullable=False, default="https://www.gravatar.com/avatar/b4ef3ecedbeb1da0e39d12175ffe87a7?s=256&d=identicon&r=PG")

    questions = db.relationship("Question", back_populates="user")
    answers = db.relationship("Answer", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'createdAt': self.createdAt,
            'portrait':self.portrait,
            'is_deleted':self.is_deleted,
        }
