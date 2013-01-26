require 'pp'

class GamesController < ApplicationController

  def new
    # width, height = params[:dimensions].split(/x/).map { |d| d.to_i }
    # @game = Game.new(width, height)
    # @game.save(session)
    @games = Game.all
    @game = Game.new
  end

  def move
    @game = Game.load(session)
    @game.move(params[:x], params[:y], params[:color])
  end

  def game
  end

  def index
    @games = Game.all

  end

  def create
    @game = Game.new(params[:game])

    respond_to do |format|
      if @game.save
        format.html  { redirect_to(@game,
                      :notice => 'Game was successfully created.') }
        format.json  { render :json => @post,
                      :status => :created, :location => @game }
      else
        format.html  { render :action => "new" }
        format.json  { render :json => @game.errors,
                      :status => :unprocessable_entity }
      end
      format.js
    end
  end

  def destroy
    @game = Game.find(params[:id])
    @game.destroy

    respond_to do |format|
      format.html { redirect_to games_url }
      format.js
    end

  end

  def join

  end

  def show
    width, height = params[:dimensions].split(/x/).map { |d| d.to_i }
    @game = Game.start(width, height)
    @game.save(session)
  end

end
