require 'spec_helper'

describe Game do

  subject(:game) { Game.create(11, 10) }
  let(:session) { Hash.new }

  it "should initialize" do
    session = Hash.new
    game.save(session)

    session[:board].length.should == 10
  end
end