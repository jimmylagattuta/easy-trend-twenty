class CreateCartItems < ActiveRecord::Migration[7.0]
  def change
    create_table :cart_items do |t|
      t.integer :user_id
      t.integer :cart_id
      t.integer :shop_item_id
      t.integer :quantity
      t.string :status

      t.timestamps
    end
  end
end
