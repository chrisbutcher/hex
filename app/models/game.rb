class Game < ActiveRecord::Base
  attr_accessible :horiz_user_id, :vert_user_id

  belongs_to :horiz_user, :class_name => 'User'
  belongs_to :vert_user,  :class_name => 'User'

  def start()
    self.board_state = Hex::Board.create(self.board_width, self.board_height).state
  end

  def players
    [horiz_user, vert_user]
  end

  def move(x, y, color)
    position = (((self.board_width + 1) * Integer(y)) + Integer(x))
    board_copy = self.board_state.clone # Can't seem to edit self.board_state directly.
    board_copy[position] = color        # Making a copy, changing it, and replacing works.
    self.board_state = board_copy
  end

  # def width
  #   board.width
  # end

  # def height
  #   board.height
  # end
end
