class GameController < ApplicationController
  require 'pp'

  def new
    width, height = params[:dimensions].split(/x/).map { |d| d.to_i }
    @game = Game.create(width, height)
    @game.save(session)
  end

  def move
    @game = Game.load(session)
    @game.move(params[:x], params[:y], params[:color])
  end

  def game
  end

end
