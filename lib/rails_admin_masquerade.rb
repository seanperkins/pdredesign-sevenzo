require 'rails_admin/config/actions'
require 'rails_admin/config/actions/base'
 
module RailsAdminMasquerade
end
 
module RailsAdmin
  module Config
    module Actions
      class Masquerade < RailsAdmin::Config::Actions::Base
        register_instance_option :bulkable? do
          true
        end
 
        register_instance_option :controller do
          Proc.new do
            @objects = list_entries(@model_config, :destroy)  
            flash[:success] = "#{@model_config.label}  successfully Masquerade."
            sign_in(@objects.first)
            redirect_to '/'
          end
        end
      end
    end
  end
end
