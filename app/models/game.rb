class Game < ActiveRecord::Base
  attr_accessible :horiz_user_id, :vert_user_id

  belongs_to :horiz_user, :class_name => 'User'
  belongs_to :vert_user,  :class_name => 'User'

  def start()
    self.board_state = Hex::Board.create(self.board_width, self.board_height).state

    #@board = Hex::Board.new(board_state)
  end

  def players
    [horiz_user, vert_user]
  end

  # def width
  #   board.width
  # end

  # def height
  #   board.height
  # end
end
