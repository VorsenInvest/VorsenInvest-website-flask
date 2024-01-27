from . import db
from flask_login import UserMixin
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    username = db.Column(db.String(100), unique=True)

    # One-to-One relationship with UserInfo
    user_info = db.relationship('UserInfo', backref='user', uselist=False, cascade="all, delete-orphan", lazy=True)
    
    # One-to-One relationship with UserImage
    user_profile_image = db.relationship('UserImage', backref='user', uselist=False, cascade="all, delete-orphan", lazy=True)
    
class UserInfo(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), nullable=False, unique=True)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    phone_number = db.Column(db.String(15))
    city = db.Column(db.String(100))
    country = db.Column(db.String(100))

class UserImage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), nullable=False, unique=True)
    profile_image = db.Column(db.LargeBinary)  # BLOB type to store binary image data

# Define the FundIndicator model
class StockListInfo(db.Model):
    __tablename__ = 'brapi_API_data_fund_ind_2023_Q3'  # Specify the custom table name

    #id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.String(10), nullable=False, primary_key=True)
    quickRatio = db.Column(db.Float)
    currentRatio = db.Column(db.Float)
    debtToEquity = db.Column(db.Float)
    revenuePerShare = db.Column(db.Float)
    returnOnAssets = db.Column(db.Float)
    returnOnEquity = db.Column(db.Float)
    earningsGrowth = db.Column(db.Float)
    revenueGrowth = db.Column(db.Float)
    grossMargins = db.Column(db.Float)
    ebitdaMargins = db.Column(db.Float)
    operatingMargins = db.Column(db.Float)
    profitMargins = db.Column(db.Float)
    heldPercentInsiders = db.Column(db.Float)
    heldPercentInstitutions = db.Column(db.Float)
    beta = db.Column(db.Float)
    bookValue = db.Column(db.Float)
    earningsQuarterlyGrowth = db.Column(db.Float)
    trailingEps = db.Column(db.Float)
    forwardEps = db.Column(db.Float)
    enterpriseToEbitda = db.Column(db.Float)
    enterpriseToEbit = db.Column(db.Float)
    dividendYield = db.Column(db.Float)
    economicSector = db.Column(db.String(255), nullable=False)
    subSector = db.Column(db.String(255), nullable=False)
    segment = db.Column(db.String(255), nullable=False)

class EconomicSectorInfoFund(db.Model):
    __tablename__ = 'weighted_economic_sector'  # Specify the custom table name

    # id is commented out as before
    #id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(10), nullable=False, primary_key=True)
    weighted_mean_quickRatio = db.Column(db.Float)
    weighted_mean_currentRatio = db.Column(db.Float)
    weighted_mean_debtToEquity = db.Column(db.Float)
    weighted_mean_revenuePerShare = db.Column(db.Float)
    weighted_mean_returnOnAssets = db.Column(db.Float)
    weighted_mean_returnOnEquity = db.Column(db.Float)
    weighted_mean_earningsGrowth = db.Column(db.Float)
    weighted_mean_revenueGrowth = db.Column(db.Float)
    weighted_mean_grossMargins = db.Column(db.Float)
    weighted_mean_ebitdaMargins = db.Column(db.Float)
    weighted_mean_operatingMargins = db.Column(db.Float)
    weighted_mean_profitMargins = db.Column(db.Float)
    weighted_mean_beta = db.Column(db.Float)
    weighted_mean_bookValue = db.Column(db.Float)
    weighted_mean_earningsQuarterlyGrowth = db.Column(db.Float)
    weighted_mean_trailingEps = db.Column(db.Float)
    weighted_mean_forwardEps = db.Column(db.Float)
    weighted_mean_enterpriseToEbitda = db.Column(db.Float)
    weighted_mean_enterpriseToEbit = db.Column(db.Float)
    weighted_mean_dividendYield = db.Column(db.Float)

class SubsectorInfoFund(db.Model):
    __tablename__ = 'weighted_subsector'  # Specify the custom table name

    # id is commented out as before
    #id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(10), nullable=False, primary_key=True)
    weighted_mean_quickRatio = db.Column(db.Float)
    weighted_mean_currentRatio = db.Column(db.Float)
    weighted_mean_debtToEquity = db.Column(db.Float)
    weighted_mean_revenuePerShare = db.Column(db.Float)
    weighted_mean_returnOnAssets = db.Column(db.Float)
    weighted_mean_returnOnEquity = db.Column(db.Float)
    weighted_mean_earningsGrowth = db.Column(db.Float)
    weighted_mean_revenueGrowth = db.Column(db.Float)
    weighted_mean_grossMargins = db.Column(db.Float)
    weighted_mean_ebitdaMargins = db.Column(db.Float)
    weighted_mean_operatingMargins = db.Column(db.Float)
    weighted_mean_profitMargins = db.Column(db.Float)
    weighted_mean_beta = db.Column(db.Float)
    weighted_mean_bookValue = db.Column(db.Float)
    weighted_mean_earningsQuarterlyGrowth = db.Column(db.Float)
    weighted_mean_trailingEps = db.Column(db.Float)
    weighted_mean_forwardEps = db.Column(db.Float)
    weighted_mean_enterpriseToEbitda = db.Column(db.Float)
    weighted_mean_enterpriseToEbit = db.Column(db.Float)
    weighted_mean_dividendYield = db.Column(db.Float)

class SegmentInfoFund(db.Model):
    __tablename__ = 'weighted_segment'  # Specify the custom table name

    # id is commented out as before
    #id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(10), nullable=False, primary_key=True)
    weighted_mean_quickRatio = db.Column(db.Float)
    weighted_mean_currentRatio = db.Column(db.Float)
    weighted_mean_debtToEquity = db.Column(db.Float)
    weighted_mean_revenuePerShare = db.Column(db.Float)
    weighted_mean_returnOnAssets = db.Column(db.Float)
    weighted_mean_returnOnEquity = db.Column(db.Float)
    weighted_mean_earningsGrowth = db.Column(db.Float)
    weighted_mean_revenueGrowth = db.Column(db.Float)
    weighted_mean_grossMargins = db.Column(db.Float)
    weighted_mean_ebitdaMargins = db.Column(db.Float)
    weighted_mean_operatingMargins = db.Column(db.Float)
    weighted_mean_profitMargins = db.Column(db.Float)
    weighted_mean_beta = db.Column(db.Float)
    weighted_mean_bookValue = db.Column(db.Float)
    weighted_mean_earningsQuarterlyGrowth = db.Column(db.Float)
    weighted_mean_trailingEps = db.Column(db.Float)
    weighted_mean_forwardEps = db.Column(db.Float)
    weighted_mean_enterpriseToEbitda = db.Column(db.Float)
    weighted_mean_enterpriseToEbit = db.Column(db.Float)
    weighted_mean_dividendYield = db.Column(db.Float)
    
class DeleteAccountForm(FlaskForm):
    password = PasswordField('Password', validators=[DataRequired()])
