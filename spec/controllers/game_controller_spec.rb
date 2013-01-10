require 'spec_helper'
require 'pry'

describe GameController do

  before(:each) do
    controller.params[:dimensions] = "11x11"
  end

  describe '#new' do
    it "creates a game object" do
      get :new
      assigns[:game].should be_an_instance_of Game
    end
  end


end