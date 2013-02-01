class Users < ActiveRecord::Base
  attr_accessible :email, :guest, :last_signed_in, :password_digest, :username

  def self.new_guest
    new(guest: true)
  end
end
