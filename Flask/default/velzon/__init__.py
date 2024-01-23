from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, current_user
from flask_migrate import Migrate
from flask_session import Session  # Import Flask-Session
from dotenv import load_dotenv
import os


# Load environment variables from .env file
load_dotenv()

db = SQLAlchemy()
migrate = Migrate()  # Initialize Flask-Migrate

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = os.getenv('SQLALCHEMY_TRACK_MODIFICATIONS')
    app.config["SESSION_TYPE"] = os.getenv('SESSION_TYPE')
    app.secret_key = os.getenv('SECRET_KEY')  # Keep this line in your Python script

    # Initialize Flask-Session
    sess = Session(app)
    sess.init_app(app, db)  # Ensure Flask-Session uses the SQLAlchemy instance for storage


    login_manager = LoginManager(app)
    login_manager.login_view= 'pages.login'
    db.init_app(app)
    migrate.init_app(app, db)  # Initialize Flask-Migrate with your app and database



    from .models import User, UserInfo
    with app.app_context():
        db.create_all()


    @login_manager.user_loader
    def load_user(user_id):
        from .models import User  # Import User model here
        return User.query.get(int(user_id)) 

    @app.context_processor
    def inject_user_info():
        from .models import UserInfo  # Import User model here
        if current_user.is_authenticated:
            user_info = UserInfo.query.filter_by(user_id=current_user.id).first()
            return dict(user_info=user_info)
        return dict(user_info=None)

    @app.context_processor
    def inject_user_image():
        from .models import UserImage  # Import User model here
        if current_user.is_authenticated:
            user_image = UserImage.query.filter_by(user_id=current_user.id).first()
            return dict(user_image=user_image)
        return dict(user_image=None)
    
    from .dashboards import dashboards
    from .apps import apps
    from .layouts import layouts    
    from .pages import pages
    from .components import components

    app.register_blueprint(dashboards ,url_prefix="/")
    app.register_blueprint(apps ,url_prefix="/")
    app.register_blueprint(layouts ,url_prefix="/")
    app.register_blueprint(pages ,url_prefix="/")
    app.register_blueprint(components ,url_prefix="/")

    return app  