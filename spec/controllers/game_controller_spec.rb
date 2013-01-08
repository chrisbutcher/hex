require 'spec_helper'
require 'pry'

describe GameController do

  before(:each) do
    controller.params[:dimensions] = "11x11"
  end

  describe "GET new" do
    it "creates a Game object" do
      # visit 'game/new/11x11'
      # get :new
      binding.pry
    end


  end



end