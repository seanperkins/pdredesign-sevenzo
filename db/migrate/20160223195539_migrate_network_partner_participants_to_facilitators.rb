class MigrateNetworkPartnerParticipantsToFacilitators < ActiveRecord::Migration
  def up
    Participant.includes(:user, :assessment).where(users: {role:'network_partner'}).all.each do |participant|
      assessment = participant.assessment
      user = participant.user
      assessment_permission = Assessments::Permission.new(assessment)
      assessment_permission.update_level(user, 'facilitator')
    end
  end

  def down;end
end
