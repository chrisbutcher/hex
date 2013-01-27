require 'bundler/capistrano'
load 'deploy/assets'

set :rvm_ruby_string, '1.9.3'
set :rvm_type, :system
require 'rvm/capistrano'

set :application, "hex"
set :repository,  "git@github.com:pbevin/hex"
set :scm, "git"
set :user, "pete"
set :use_sudo, false
set :deploy_to, "/home/www/playhex"

set :branch, "master"
set :deploy_via, :remote_cache

role :web, "playhex.ca"                          # Your HTTP server, Apache/etc
role :app, "playhex.ca"                          # This may be the same as your `Web` server
role :db,  "playhex.ca", :primary => true # This is where Rails migrations will run

after "deploy:restart", "deploy:cleanup"

namespace :deploy do
  task :start do ; end
  task :stop do ; end
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
  end
end

namespace :db do
  task :db_config, :role => :app do
    run "cp -f #{File.join(shared_path, "database.yml")} #{File.join(release_path, "/config/database.yml"}"
  end
end

after "deploy:finalize_update", "db:db_config"
