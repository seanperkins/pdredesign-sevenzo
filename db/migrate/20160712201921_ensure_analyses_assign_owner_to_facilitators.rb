class EnsureAnalysesAssignOwnerToFacilitators < ActiveRecord::Migration
  def change
    Analysis.reset_column_information
    Analysis.all.each { |analysis|
      unless analysis.facilitators.map(&:user).include?(analysis.owner)
        analysis.facilitators.create(user: analysis.owner)
      end
    }
  end
end
