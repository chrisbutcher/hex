class GameController < ApplicationController

  def new
    @game = Game.create(params[:width], params[:height])
    @game.save(session)
  end

  def move
    @game = Game.load(session)
    @game.move(params[:x], params[:y], params[:color])
  end

end
