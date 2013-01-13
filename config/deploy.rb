require 'bundler/capistrano'
load 'deploy/assets'

set :rvm_ruby_string, '1.9.3@hex'
require 'rvm/capistrano'

set :application, "hex"
set :repository,  "git@github.com:pbevin/hex"
set :scm, "git"
set :user, "pete"
set :use_sudo, false
set :deploy_to, "/home/www/playhex"


set :branch, "deploy"
set :deploy_via, :remote_cache

# set :scm, :git # You can set :scm explicitly or Capistrano will make an intelligent guess based on known version control directory names
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`

role :web, "playhex.ca"                          # Your HTTP server, Apache/etc
role :app, "playhex.ca"                          # This may be the same as your `Web` server
role :db,  "playhex.ca", :primary => true # This is where Rails migrations will run

# if you want to clean up old releases on each deploy uncomment this:
# after "deploy:restart", "deploy:cleanup"

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts

# If you are using Passenger mod_rails uncomment this:
# namespace :deploy do
#   task :start do ; end
#   task :stop do ; end
#   task :restart, :roles => :app, :except => { :no_release => true } do
#     run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
#   end
# end
