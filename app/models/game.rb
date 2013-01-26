class Game < ActiveRecord::Base
  def self.start(width, height)
    Game.create do |game|
      game.board_state = Board.new(width, height).state
    end
  end


  class Board
    def initialize(width, height)
      @tiles = [['.'] * width] * height
    end

    def state
      rows = @tiles.map do |row|
        row.join + "\n"
      end

      rows.join
    end
  end
end
