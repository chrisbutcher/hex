class Board

  def initialize width=1, height=1
    @width = width
    @height = height
    @board = []
  end

  def self.create width, height
    @width = width
    @height = height
  end

  def save session
    session[:board] = @board
    # Session.create(session)
  end

  def move x, y, color
    @board[y][x] = color
  end


end
