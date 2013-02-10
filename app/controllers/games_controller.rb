require 'pp'

class GamesController < ApplicationController

  def move
    @game = Game.find(session[:game_id])
    @game.move(params[:x], params[:y], params[:color])
    @game.save

    render :text => "OK"
  end

  def index
    @games = Game.all
  end

  def create
    @game = Game.new(params[:game])
    @game.board_width = params[:dimensions]
    @game.board_height = params[:dimensions]

    user = current_user || User.new_guest
    user.save if user.guest?

    @game.horiz_user_id = user.id
    @game.start()

    #logger.debug "Dimensions: #{params[:dimensions]}"

    respond_to do |format|
      if @game.save
        # flash[:success] = "Game was successfully created."
        format.html  { redirect_to(@game,
                      :notice => 'Game was successfully created.') }
        format.json  { render :json => @game,
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
    session[:game_id] = @game.id

    respond_to do |format|
      format.html { redirect_to :action => "show", :id => @game.id }
    end
  end

  def show
    @game = Game.find(params[:id])
  end
end
