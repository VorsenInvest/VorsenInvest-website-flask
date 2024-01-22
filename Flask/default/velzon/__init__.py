from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, current_user
from flask_migrate import Migrate


db = SQLAlchemy()
migrate = Migrate()  # Initialize Flask-Migrate

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] =b'_5#y2L"F4Q8z\n\xec]/'
    app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://admin:G78u75s61T91!@brapi-api-db.cx0ko2c0yzso.us-east-2.rds.amazonaws.com:3306/brapi_API_DB'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

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