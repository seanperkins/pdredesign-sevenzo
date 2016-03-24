class RenameTechnicalQuestionsPlatformToPlatforms < ActiveRecord::Migration
  def change
    rename_column :technical_questions, :platform, :platforms
  end
end
