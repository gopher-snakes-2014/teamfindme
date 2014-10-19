Rails.application.routes.draw do

  get "/notes/find_all", to: 'notes#find_all'
  get '/notes/radius_search', to: 'notes#radius_search'

  resources :users
  resources :notes
  resource :sessions
  root 'home#index'

end
