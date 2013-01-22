class Game < ActiveRecord::Base
  attr_protected

  # def initialize width=1, height=1, board=[]
  #   @width = width
  #   @height = height
  #   @board = board
  # end

  # def self.create width, height
  #   board_array = [[nil] * width] * height

  #   @game = new(width, height, board_array)
  # end

  # def save session
  #   session[:board] = @board
  # end

  def load session
    @game = session[:board]
  end

  def move x, y, color
    @board[y][x] = color
  end

  def getDimensions
    return @width, @height
  end

end
