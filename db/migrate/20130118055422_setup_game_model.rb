class SetupGameModel < ActiveRecord::Migration
  def change
    add_column :games, :password, :string
    add_column :games, :board_state, :string
    add_column :games, :move_list, :string
    add_column :games, :current_player_id, :integer
    add_column :games, :horiz_user_id, :integer
    add_column :games, :vert_user_id, :integer
    add_column :games, :game_time_limit, :integer
    add_column :games, :move_time_limit, :integer
    add_column :games, :last_move_at, :datetime
    add_column :games, :win_state, :string
  end
end
