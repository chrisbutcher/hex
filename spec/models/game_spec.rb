require 'spec_helper'

describe Game do
  context "A new game" do
    let(:game) { Game.start(5, 7) }

    it "has the width and height given" do
      [game.width, game.height].should == [5, 7]
    end

    it "has the right board state" do
      game.board_state.should == ".....\n" * 7
    end
  end
end

