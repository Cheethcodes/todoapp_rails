class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.string :name
      t.string :description
      t.string :schedule
      t.references :user, index: true, foreign_key: true
      t.boolean :is_finished,     default: false
      
      t.timestamps
    end
  end
end
