class ResaveAllAnalysesSoTheyGetAShareToken < ActiveRecord::Migration
  def change
    Analysis.all.each{ |analysis| analysis.save }
  end
end
