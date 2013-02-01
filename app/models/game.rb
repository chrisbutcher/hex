class Game < ActiveRecord::Base
  def start()
    self.board_state = Hex::Board.create(self.board_width, self.board_height).state

    #@board = Hex::Board.new(board_state)
  end

  # def width
  #   board.width
  # end

  # def height
  #   board.height
  # end
end
