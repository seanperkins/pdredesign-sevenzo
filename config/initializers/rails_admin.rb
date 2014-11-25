require Rails.root.join('lib', 'rails_admin_masquerade.rb')


RailsAdmin.config do |config|
module RailsAdmin
  module Config
    module Actions
      class Masquerade < RailsAdmin::Config::Actions::Base
        RailsAdmin::Config::Actions.register(self)
      end
    end
  end
end


  ################  Global configuration  ################

  # Set the admin name here (optional second array element will appear in red). For example:
  config.main_app_name = ['Readiness Assessment', 'Admin']
  # or for a more dynamic name:
  # config.main_app_name = Proc.new { |controller| [Rails.application.engine_name.titleize, controller.params['action'].titleize] }

  # RailsAdmin may need a way to know who the current user is]
  config.current_user_method { current_user } # auto-generated

  ## == Cancan ==
  config.authorize_with do |controller|
    unless current_user.try(:admin?)
      flash[:danger] = "Sorry, you're not authorized to access that page."
      redirect_to '/'
    end
  end

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory

    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app

    masquerade do
      visible do
        bindings[:abstract_model].model.to_s == "User"
      end
    end

  end
end
