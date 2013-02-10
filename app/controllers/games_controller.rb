require 'pp'

class GamesController < ApplicationController

  def update
    @game = Game.find(session[:game_id])
    if @game.current_played_id == @game.horiz_user_id
      render :text => "1" # Return who's turn it is to whos_turn() Ajax function
    else
      render :text => "2"
    end
  end

  def move
    @game = Game.find(session[:game_id])
    @game.move(params[:x], params[:y], params[:color])

    if @game.current_played_id == @game.horiz_user_id
      @game.current_played_id = @game.vert_user_id
    else
      @game.current_played_id = @game.horiz_user_id
    end
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
    session[:user_id] = user.id
    
    @game.horiz_user_id = user.id
    @game.current_played_id = user.id # Note typo in database migration
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

    if current_user.nil?
      redirect_to(root_path, :error => 'Could not join game.')
      return
    end    

    if @game.vert_user_id.nil? && @game.horiz_user_id != current_user.id
      @game.vert_user_id = current_user.id
    end

    @game.save

    respond_to do |format|
      format.html { redirect_to :action => "show", :id => @game.id }
    end
  end

  def show
    @game = Game.find(params[:id])
  end
end
