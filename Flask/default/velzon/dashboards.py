from flask import Blueprint,render_template, request
from flask_login import login_required
from .pages import fetch_data_from_database_fund, fetch_data_weighted

dashboards = Blueprint('dashboards',__name__,template_folder='templates',
    static_folder='static',)
    

#@dashboards.route('/')
#@login_required
#def index():
#    return render_template('dashboards/index.html')

@dashboards.route('/dashboard-analytics/')
@login_required
def dashboard_analytics():
    return render_template('dashboards/dashboard-analytics.html')

@dashboards.route('/dashboard-crm/')
@login_required
def dashboard_crm():
    return render_template('dashboards/dashboard-crm.html')

@dashboards.route('/dashboard-crypto/')
@login_required
def dashboard_crypto():
    return render_template('dashboards/dashboard-crypto.html')   

@dashboards.route('/dashboard-projects/')
@login_required
def dashboard_projects():
    return render_template('dashboards/dashboard-projects.html')   

@dashboards.route('/dashboard-nft/')
@login_required
def dashboard_nft():
    return render_template('dashboards/dashboard-nft.html')

@dashboards.route('/dashboard-job/')
@login_required
def dashboard_job():
    return render_template('dashboards/dashboard-job.html')  

@dashboards.route('/dashboard-stocks-sectors/')
@login_required
def dashboard_stocks_sectors():
    print("stocks_indicators route called")

    # Fetch weighted data for all three types
    weighted_data_economic_sector = fetch_data_weighted('economic_sector')
    weighted_data_segment = fetch_data_weighted('segment')
    weighted_data_subsector = fetch_data_weighted('subsector')
    print("Weighted data fetched from database for all types")
    
    # Fetch data directly, not storing in session
    table_data_fund, subsectors, segments, economicSectors, _, _, _, _ = fetch_data_from_database_fund()
    print("Data fetched from database")
    
    # Extract symbols from table_data_fund and count unique symbols
    symbols = [item['symbol'] for item in table_data_fund]
    print(weighted_data_segment)

    # Pass all data, including weighted data for all types, to the template
    return render_template('dashboards/dashboard-stocks-sectors-info.html',
                           symbols=symbols,
                           table_data_fund=table_data_fund, 
                           subsectors=subsectors,
                           segments=segments,
                           economicSectors=economicSectors,
                           weighted_data_economic_sector=weighted_data_economic_sector,
                           weighted_data_segment=weighted_data_segment,
                           weighted_data_subsector=weighted_data_subsector)