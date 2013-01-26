class Game < ActiveRecord::Base
  def self.start(width, height)
    Game.create do |game|
      game.board_state = Board.create(width, height).state
    end
  end

  def width
    board.width
  end

  def height
    board.height
  end

  def board
    Board.new(board_state)
  end


  class Board
    def initialize(tiles)
      @tiles = tiles
    end

    def self.create(width, height)
      row = "." * width + "\n"
      tiles = row * height
      Board.new(tiles)
    end

    def state
      @tiles
    end

    def width
      @tiles.split.first.strip.length
    end

    def height
      @tiles.split.length
    end
  end
end
