from flask import Blueprint,render_template,request,redirect,url_for,flash, jsonify, Response, current_app, session, send_from_directory
from flask_login import login_user,logout_user,login_required, current_user
from pyrfc3339 import generate
from .models import User, UserInfo, UserImage, StockListInfo, DeleteAccountForm
from werkzeug.security import generate_password_hash,check_password_hash
from . import db
import os, logging


pages = Blueprint('pages',__name__,template_folder='templates',
    static_folder='static',)
    
def fetch_data_from_database():
    try:
        # Query the database to retrieve unique subSector, segment, and economicSector values
        subsectors = db.session.query(StockListInfo.subSector.distinct()).all()
        segments = db.session.query(StockListInfo.segment.distinct()).all()
        economicSectors = db.session.query(StockListInfo.economicSector.distinct()).all()

        # Extract and sort values, excluding rows where any field is None
        subsector_values = sorted([subsector[0] for subsector in subsectors if all(subsector)])
        segment_values = sorted([segment[0] for segment in segments if all(segment)])
        economicSector_values = sorted([economicSector[0] for economicSector in economicSectors if all(economicSector)])

        # Query the database to retrieve other columns, excluding rows with None in any column
        data = db.session.query(
            StockListInfo.symbol, 
            StockListInfo.economicSector, 
            StockListInfo.subSector, 
            StockListInfo.segment
        ).filter(StockListInfo.symbol != None, StockListInfo.economicSector != None, StockListInfo.subSector != None, StockListInfo.segment != None).all()

        # Process the data and populate the unique sets
        formatted_data = []
        unique_symbols = set()
        unique_economicSectors = set()
        unique_subsectors = set()
        unique_segments = set()

        for d in data:
            formatted_data.append({'symbol': d[0], 'economicSector': d[1], 'subSector': d[2], 'segment': d[3]})
            unique_symbols.add(d[0])
            unique_economicSectors.add(d[1])
            unique_subsectors.add(d[2])
            unique_segments.add(d[3])

        # Convert sets to sorted lists
        unique_symbols = sorted(unique_symbols)
        unique_economicSectors = sorted(unique_economicSectors)
        unique_subsectors = sorted(unique_subsectors)
        unique_segments = sorted(unique_segments)

        return formatted_data, subsector_values, segment_values, economicSector_values, unique_symbols, unique_economicSectors, unique_subsectors, unique_segments
    except Exception as e:
        print("Error fetching data from database:", e)
        return [], [], [], [], [], [], [], []




    
#Pages page
@pages.route('/pages/starter')
@login_required
def starter():
    return render_template('pages/pages/pages-starter.html')

@pages.route('/pages/profile')
@login_required
def profile():
    return render_template('pages/pages/pages-profile.html')    

@pages.route('/pages/settings')
@login_required
def profile_settings():
    user_info = UserInfo.query.filter_by(user_id=current_user.id).first()

    if not user_info:
        # Handle the case where no user_info is found. 
        # This could involve redirecting to a different page, showing a message,
        # or creating a default UserInfo object.
        # For now, let's just create an empty UserInfo for demonstration:
        user_info = UserInfo()

    # Calculate the percentage based on non-empty fields
    non_empty_fields = sum(bool(getattr(user_info, field)) for field in ['first_name', 'last_name', 'phone_number', 'city', 'country'])
    total_fields = 5  # Assuming you have 5 fields in total
    percentage = int((non_empty_fields / total_fields) * 100)
    
    form = DeleteAccountForm()
    if form.validate_on_submit():
        # Handle form submission
        pass

    return render_template('pages/pages/pages-profile-settings.html', user_info=user_info, email=current_user.email, percentage=percentage, form=form)

 

@pages.route('/pages/team')
@login_required
def team():
    return render_template('pages/pages/pages-team.html')  

@pages.route('/pages/timeline')
@login_required
def timeline():
    return render_template('pages/pages/pages-timeline.html')   

@pages.route('/pages/faqs')
@login_required
def faqs():
    return render_template('pages/pages/pages-faqs.html') 

@pages.route('/pages/pricing')
@login_required
def pricing():
    return render_template('pages/pages/pages-pricing.html')   

@pages.route('/pages/gallery')
@login_required
def gallery():
    return render_template('pages/pages/pages-gallery.html')  

@pages.route('/pages/maintenance')
@login_required
def maintenance():
    return render_template('pages/pages/pages-maintenance.html')           

@pages.route('/pages/comingsoon')
@login_required
def comingsoon():
    return render_template('pages/pages/pages-comingsoon.html')      

@pages.route('/pages/sitemap')
@login_required
def sitemap():
    return render_template('pages/pages/pages-sitemap.html')   

@pages.route('/pages/search_results')
@login_required
def search_results():
    return render_template('pages/pages/pages-search-results.html')

@pages.route('/pages/privacy_policy')
@login_required
def privacy_policy():
    return render_template('pages/pages/pages-privacy-policy.html')

@pages.route('/pages/term_conditions')
@login_required
def term_conditions():
    return render_template('pages/pages/pages-term-conditions.html')                    

#Landing page
@pages.route('/landing')
@login_required
def landing():
    return render_template('pages/pages/pages-landing.html') 

@pages.route('/nft-landing')
@login_required
def nft_landing():
    return render_template('pages/pages/pages-nft-landing.html')    

@pages.route('/job-landing')
@login_required
def job_landing():
    return render_template('pages/pages/pages-job-landing.html')   

#Authentication Pages
@pages.route('/authentication/auth-signin-basic')
@login_required
def auth_signin_basic():
    return render_template('pages/authentication/auth-signin-basic.html') 

@pages.route('/authentication/auth-signin-cover')
@login_required
def auth_signin_cover():
    return render_template('pages/authentication/auth-signin-cover.html')     

@pages.route('/authentication/auth-signup-basic')
@login_required
def auth_signup_basic():
    return render_template('pages/authentication/auth-signup-basic.html') 

@pages.route('/authentication/auth-signup-cover')
@login_required
def auth_signup_cover():
    return render_template('pages/authentication/auth-signup-cover.html')  

@pages.route('/authentication/auth-pass-reset-basic')
@login_required
def auth_pass_reset_basic():
    return render_template('pages/authentication/auth-pass-reset-basic.html')    

@pages.route('/authentication/auth-pass-reset-cover')
@login_required
def auth_pass_reset_cover():
    return render_template('pages/authentication/auth-pass-reset-cover.html')       
    
@pages.route('/authentication/auth-pass-change-basic')
@login_required
def auth_pass_change_basic():
    return render_template('pages/authentication/auth-pass-change-basic.html')     

@pages.route('/authentication/auth-pass-change-cover')
@login_required
def auth_pass_change_cover():
    return render_template('pages/authentication/auth-pass-change-cover.html')    

@pages.route('/authentication/auth-lockscreen-basic')
@login_required
def auth_lockscreen_basic():
    return render_template('pages/authentication/auth-lockscreen-basic.html') 

@pages.route('/authentication/auth-lockscreen-cover')
@login_required
def auth_lockscreen_cover():
    return render_template('pages/authentication/auth-lockscreen-cover.html')  

@pages.route('/authentication/auth-logout-basic')
@login_required
def auth_logout_basic():
    return render_template('pages/authentication/auth-logout-basic.html')  

@pages.route('/authentication/auth-logout-cover')
@login_required
def auth_logout_cover():
    return render_template('pages/authentication/auth-logout-cover.html')  

@pages.route('/authentication/auth-success-msg-basic')
@login_required
def auth_success_msg_basic():
    return render_template('pages/authentication/auth-success-msg-basic.html') 

@pages.route('/authentication/auth-success-msg-cover')
@login_required
def auth_success_msg_cover():
    return render_template('pages/authentication/auth-success-msg-cover.html') 

@pages.route('/authentication/auth-twostep-basic')
@login_required
def auth_twostep_basic():
    return render_template('pages/authentication/auth-twostep-basic.html')      

@pages.route('/authentication/auth-twostep-cover')
@login_required
def auth_twostep_cover():
    return render_template('pages/authentication/auth-twostep-cover.html')    

@pages.route('/authentication/auth-404-basic')
@login_required
def auth_404_basic():
    return render_template('pages/authentication/auth-404-basic.html')       

@pages.route('/authentication/auth-404-cover')
@login_required
def auth_404_cover():
    return render_template('pages/authentication/auth-404-cover.html')     

@pages.route('/authentication/auth-404-alt')
@login_required
def auth_404_alt():
    return render_template('pages/authentication/auth-404-alt.html')

@pages.route('/authentication/auth-500')
@login_required
def auth_500():
    return render_template('pages/authentication/auth-500.html')    

@pages.route('/authentication/auth-offline')
@login_required
def auth_offline():
    return render_template('pages/authentication/auth-offline.html')

#Actual Auth pages(working)  
#Actual Auth pages(working)  
@pages.route('/account/login')  
def login():
    return render_template('pages/account/login.html')

@pages.route('/account/login',methods=['POST'])  
def login_post():
    if request.method == 'POST':
        email = request.form.get('email') 
        password = request.form.get('password')
        remember = True if request.form.get('remember') else False

        user = User.query.filter_by(email=email).first()

        if not user or not check_password_hash(user.password,password):
            flash("Invalid Credentials", "error")
            return redirect(url_for('pages.login'))

        data = fetch_data_from_database()
        # Print to verify what's being stored in the session
        print("Data being stored in session:", data)
        session['table_data'] = data

        login_user(user, remember=remember)
        flash("Login successful!", "success")  # Add a success message
        return redirect(url_for('dashboards.index'))

@pages.route('/account/signup')  
def signup(): 
    return render_template('pages/account/signup.html')

@pages.route('/account/signup', methods=['POST'])
def signup_post():
    email = request.form.get('email')
    username = request.form.get('username')
    password = request.form.get('password')

    user_email = User.query.filter_by(email=email).first()
    user_username = User.query.filter_by(username=username).first()

    if user_email:
        flash("User email already exists")
        return redirect(url_for('pages.signup'))
    if user_username:
        flash("Username already exists")
        return redirect(url_for('pages.signup'))

    new_user = User(email=email, username=username, password=generate_password_hash(password))

    # Set the path to the default profile image
    image_path = os.path.join(current_app.root_path, 'static', 'images', 'logo-sm-light.png')
    with open(image_path, 'rb') as image_file:
        default_image_data = image_file.read()

    # Create a new UserImage record with the default image
    new_user_image = UserImage(user=new_user, profile_image=default_image_data)

    # Create a new UserInfo record (if needed) with default values
    new_user_info = UserInfo(
        user=new_user,
        first_name="Investor",
        last_name="",  # Replace with your default last name
        phone_number="",  # Keep as an empty string or set a default
        city="",  # Replace with your default city
        country=""  # Replace with your default country
    )

    db.session.add(new_user)
    db.session.add(new_user_image)
    db.session.add(new_user_info)
    db.session.commit()

    return redirect(url_for('pages.login'))


@pages.route('/account/logout')
@login_required
def logout():
    logout_user()
    session.clear()
    return redirect(url_for('pages.login'))

@pages.route('/pages/update_user_info', methods=['POST'])
@login_required
def update_user_info():
    print("Form Data Received:", request.form)  # Print form data received

    user_info = UserInfo.query.filter_by(user_id=current_user.id).first()
    print("Existing User Info:", user_info)  # Print existing user info from the database

    if not user_info:
        user_info = UserInfo(user_id=current_user.id)
        db.session.add(user_info)

    # Validate phone number format
    phone_number = request.form.get('phone_number')
    if phone_number and (not phone_number.isdigit() or len(phone_number) != 11):
        flash("Invalid phone number format. Please enter 11 digits.")
        return redirect(url_for('pages.profile_settings'))

    # Update user_info fields based on form data
    user_info.first_name = request.form.get('first_name')
    user_info.last_name = request.form.get('last_name')
    user_info.phone_number = phone_number
    user_info.city = request.form.get('city')
    user_info.country = request.form.get('country')

    print("Updated User Info (Pre-Commit):", user_info)  # Print updated user info

    db.session.commit()
    print("Database commit executed")

    flash("Profile updated successfully")
    return redirect(url_for('pages.profile_settings'))

@pages.route('/pages/upload_image', methods=['POST'])
@login_required
def upload_image():
    # Check if the 'profile_image' file is in the request
    if 'profile_image' not in request.files:
        flash('No file part', 'error')
        return jsonify({"message": "No file part", "status": "error"})

    file = request.files['profile_image']

    # Check if the file has a filename
    if file.filename == '':
        flash('No selected file', 'error')
        return jsonify({"message": "No selected file", "status": "error"})

    try:
        # Retrieve or create the UserImage instance for the current user
        user_image = UserImage.query.filter_by(user_id=current_user.id).first()
        if user_image is None:
            # If no existing image, create a new instance
            user_image = UserImage(user_id=current_user.id)

        # Update the profile_image column with the new file data
        user_image.profile_image = file.read()

        # Add and commit the changes to the database
        db.session.add(user_image)
        db.session.commit()

        flash('Image updated successfully', 'success')
        return redirect(url_for('pages.profile_settings'))

    except Exception as e:
        # Handle any exceptions
        flash(f'Error: {str(e)}', 'error')
        return jsonify({"message": f"Error: {str(e)}", "status": "error"})

@pages.route('/pages/user_profile_image/<int:user_id>')
@login_required
def user_profile_image(user_id):
    user_image = UserImage.query.filter_by(user_id=user_id).first()
    if user_image and user_image.profile_image:
        return Response(user_image.profile_image, mimetype='image/png')  # Adjust MIME type based on your image format
    else:
        return 'Image not found', 404

@pages.route('/clear_session')
def clear_session():
    session.clear()
    return 'Session cleared!'

@pages.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(current_app.root_path, 'static', 'images'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')
    

@pages.route('/account/delete', methods=['POST'])
@login_required
def delete_account():
    try:
        user_id = current_user.id

        # Retrieve the User record
        user = User.query.get(user_id)

        # Retrieve related UserInfo record
        user_info = UserInfo.query.filter_by(user_id=user_id).first()

        # Delete the UserInfo record
        if user_info:
            db.session.delete(user_info)

        # Retrieve related UserImage records
        user_images = UserImage.query.filter_by(user_id=user_id).all()

        # Delete the UserImage records
        for user_image in user_images:
            db.session.delete(user_image)

        # Now, delete the User record
        db.session.delete(user)
        db.session.commit()

        logout_user()
        flash('Your account has been successfully deleted.', 'success')
        session.clear()
        return redirect(url_for('pages.login'))
    except Exception as e:
        logging.error(f'Error deleting account: {e}')
        db.session.rollback()
        flash(f'Error deleting account: {e}', 'error')
        return redirect(url_for('pages.profile_settings'))
