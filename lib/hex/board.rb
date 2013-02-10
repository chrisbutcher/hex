module Hex
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