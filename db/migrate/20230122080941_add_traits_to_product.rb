class AddTraitsToProduct < ActiveRecord::Migration[7.0]
  def change
    add_column :products, :image, :string
    add_column :products, :rate, :decimal
    add_column :products, :count, :integer
  end
end
