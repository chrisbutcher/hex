require 'pp'

class GamesController < ApplicationController

  def move
    @game = Game.load(session)
    @game.move(params[:x], params[:y], params[:color])
  end

  def index
    @games = Game.all
  end

  def create
    @game = Game.new(params[:game])
    @game.board_width = params[:dimensions]
    @game.board_height = params[:dimensions]
    @game.start()

    #logger.debug "Dimensions: #{params[:dimensions]}"

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
    @game = Game.find(params[:id])
    
    respond_to do |format|
      format.html { redirect_to :action => "show", :id => @game.id }
    end
  end

  def show
    @game = Game.find(params[:id])
  end
end