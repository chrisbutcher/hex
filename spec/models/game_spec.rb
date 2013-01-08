require 'spec_helper'

describe Game do

  subject(:game) { Game.create(11, 10) }
  let(:session) { Hash.new }

  it "should have the specified height" do
    game.save(session)

    session[:board].length.should == 10
  end

  it "should have the specified length" do
    game.save(session)

    session[:board][0].length.should == 11
  end


end