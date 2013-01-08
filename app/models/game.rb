class Game

  def initialize width=1, height=1, board=[]
    @width = width
    @height = height
    @board = board
  end

  def self.create width, height
    board_array = []
    height.times do |row|
      width.times do |column|
        board_array << nil
      end
    end
    @game = new(:board => board_array)
  end

  def save session
    session[:board] = @board
  end

  def load session
    @game = session[:board]
  end

  def move x, y, color
    @board[y][x] = color
  end


end
