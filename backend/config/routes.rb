Rails.application.routes.draw do
  devise_for :users, path: 'api/v1/', path_names: {
    sign_in: 'login',
    registration: 'signup'
  },
  controllers: {
    sessions: 'api/v1/sessions',
    registrations: 'api/v1/registrations'
  }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
