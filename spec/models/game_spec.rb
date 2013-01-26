require 'spec_helper'

describe Game do
  describe '#start' do
    it "creates a Game with a width and height" do
      game = Game.start(11, 11)
      game.should be_an_instance_of(Game)
      game.should_not be_a_new_record

      game.reload

      game.board_state.should == "...........\n" * 11
    end
  end
end

