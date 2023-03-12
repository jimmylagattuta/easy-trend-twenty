class AddSecurityQuestions < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :security_question_one, :string
    add_column :users, :security_question_two, :string
    add_column :users, :security_question_three, :string
  end
end
