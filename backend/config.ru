# This file is used by Rack-based servers to start the application.

require_relative "config/environment"

run Rails.application
Rails.application.load_server

config.middleware.use ActionDispatch::Cookies
config.middleware.use ActionDispatch::Session::CookieStore, key: '_authentication_app'
