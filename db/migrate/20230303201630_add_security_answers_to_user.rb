class AddSecurityAnswersToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :security_answer_one, :string
    add_column :users, :security_answer_two, :string
    add_column :users, :security_answer_three, :string
  end
end
