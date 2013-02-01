class Game < ActiveRecord::Base
  def self.start(width, height)
    Game.create do |game|
      game.board_state = Hex::Board.create(width, height).state
    end
  end

  def width
    board.width
  end

  def height
    board.height
  end

  def board
    Hex::Board.new(board_state)
  end
end
