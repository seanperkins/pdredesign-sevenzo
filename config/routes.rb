PdrServer::Application.routes.draw do
  mount PdrClient::Engine, at: "/", as: :pdr_client

  devise_for :users, path: 'v1/users', controllers: { 
    sessions: 'v1/sessions', 
    registrations: 'devise/registrations', 
    invitations: 'devise/invitations' },
    defaults: { format: :json} 

  namespace :v1, defaults: { format: :json } do
    resources  :toolkits, only: :index
    resources  :prospective_users, only: :create
    resources  :assessments

    get  'user', to: 'user#show'
    post 'user', to: 'user#update'

    get 'districts/search', to: 'districts#search'
  end
end
