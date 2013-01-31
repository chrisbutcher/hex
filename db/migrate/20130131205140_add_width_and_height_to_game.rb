class AddWidthAndHeightToGame < ActiveRecord::Migration
  def change
  	add_column :games, :board_width, :integer
  	add_column :games, :board_height, :integer  	
  end
end
