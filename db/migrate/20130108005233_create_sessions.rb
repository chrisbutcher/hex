class CreateSessions < ActiveRecord::Migration
  def change
    create_table :sessions do |t|
      t.integer :game_id

      t.timestamps
    end
  end
end
