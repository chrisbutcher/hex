class User < ActiveRecord::Base
  has_many :games, :through => :matches

  attr_accessible :email, :guest, :last_signed_in, :password_digest, :username, :password, :password_confirmation

  validates_presence_of :username, :email, :password_digest, unless: :guest?
  validates_uniqueness_of :username, allow_blank: true
  validates_confirmation_of :password, unless: :guest?

  # override has_secure_password to customize validation until Rails 4.
  require 'bcrypt'
  attr_reader :password
  include ActiveModel::SecurePassword::InstanceMethodsOnActivation

  def self.new_guest
    new { |u| u.guest = true }
  end

  def name
    guest ? "Guest#{id}" : username
  end

end
