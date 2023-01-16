class AddAdminAndSuperAdminToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :admin, :boolean
    add_column :users, :super_admin, :boolean
    add_column :users, :employee, :boolean
    add_column :users, :consumer, :boolean
  end
end
