class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :title
      t.string :brand
      t.integer :quantity
      t.decimal :price
      t.string :photo_file
      t.string :category
      t.string :sub_categry
      t.string :sub_category_two
      t.string :description

      t.timestamps
    end
  end
end
