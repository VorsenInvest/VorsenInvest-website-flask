"""empty message

Revision ID: 9412efa5a4d0
Revises: 
Create Date: 2024-01-22 15:13:45.784654

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '9412efa5a4d0'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    # Assuming 'user_info' and 'user_images' are the correct table names
    # Drop and recreate the foreign keys to include ON DELETE CASCADE
    
    # For UserInfo
    op.drop_constraint('user_info_user_id_fkey', 'user_info', type_='foreignkey')
    op.create_foreign_key(
        'user_info_user_id_fkey', 'user_info', 'user', ['user_id'], ['id'], ondelete='CASCADE'
    )

    # For UserImage
    op.drop_constraint('user_image_user_id_fkey', 'user_images', type_='foreignkey')
    op.create_foreign_key(
        'user_image_user_id_fkey', 'user_images', 'user', ['user_id'], ['id'], ondelete='CASCADE'
    )
    
def downgrade():
    pass  # No downgrade path provided
