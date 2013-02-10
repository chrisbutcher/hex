class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = params[:user] ? User.new(params[:user]) : User.new_guest

    if @user.save
      session[:user_id] = @user.id
      redirect_to root_url, notice: "Thank you for signing up!"
    else
      render "new"
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy

    respond_to do |format|
      format.html { redirect_to users_url }
      format.json { head :no_content }
    end
  end
end