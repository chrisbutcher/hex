class ApplicationController < ActionController::Base
  protect_from_forgery

  private

    def current_user
      @current_user ||= User.find(session[:user_id]) if session[:user_id]
    end
    helper_method :current_user

  # after_filter :flash_to_headers

  # def flash_to_headers
  #   return unless request.xhr?
  #   response.headers['X-Message-Type'] = flash_type
  #   response.headers['X-Message'] = flash[:error]  unless flash[:error].blank?
  #   response.headers['X-Message'] = flash[:success]  unless flash[:success].blank?
  #   # repeat for other flash types...

  #   flash.discard  # don't want the flash to appear when you reload page
  # end
end