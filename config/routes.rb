Rails.application.routes.draw do

  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)

  resources :users
  resources :notes
  resource :sessions
  root 'notes#index'

end
