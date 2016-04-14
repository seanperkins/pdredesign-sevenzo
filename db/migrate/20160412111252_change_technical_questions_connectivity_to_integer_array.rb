class ChangeTechnicalQuestionsConnectivityToIntegerArray < ActiveRecord::Migration
  def change
    change_column :technical_questions, :connectivity, 'integer[] USING CAST(connectivity AS integer[])', default: []
  end
end
