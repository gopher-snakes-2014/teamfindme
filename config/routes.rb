Rails.application.routes.draw do

  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)

  get "/notes/find_all", to: 'notes#find_all'
  get '/vote/add', to: 'notes#add_vote'
  get '/vote/remove', to: 'notes#remove_vote'

  resources :users
  resources :notes
  resource :sessions
  root 'notes#index'

end
