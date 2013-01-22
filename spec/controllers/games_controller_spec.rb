require 'spec_helper'

describe GamesController do
  describe '#new' do
    it "creates a game object" do
      get :new, :dimensions => "11x11"
      assigns[:game].should be_an_instance_of Game
    end
  end
end
