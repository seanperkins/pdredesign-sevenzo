class InitialToolMembersDataMigration < ActiveRecord::Migration
  def change
    # Migrate over Analyses
    AnalysisMember.all.each do |analysis_member|
      member = ToolMember.create(tool: analysis_member.analysis,
                                 role: ToolMember.member_roles[analysis_member.role.downcase.to_sym],
                                 user: analysis_member.user,
                                 invited_at: analysis_member.invited_at,
                                 reminded_at: analysis_member.reminded_at,
                                 created_at: analysis_member.created_at,
                                 updated_at: Time.now)
      member.save
    end

    # Migrate over Inventories
    InventoryMember.all.each do |inventory_member|
      member = ToolMember.create(tool: inventory_member.inventory,
                                 role: ToolMember.member_roles[inventory_member.role.downcase.to_sym],
                                 user: inventory_member.user,
                                 invited_at: inventory_member.invited_at,
                                 reminded_at: inventory_member.reminded_at,
                                 created_at: inventory_member.created_at,
                                 updated_at: Time.now)

      member.save
    end

    Assessment.all.each do |assessment|
      # Migrate over Assessment Facilitators
      assessment.facilitators.each do |facilitator|
        member = ToolMember.create(tool: assessment,
                                   role: ToolMember.member_roles[:facilitator],
                                   user: facilitator,
                                   # No context exists as to when a facilitator is invited in an assessment.
                                   # We will assume that the time was when the assessment was created.
                                   invited_at: assessment.created_at,
                                   # No context exists as to when a facilitator is ever reminded of anything.
                                   # We will assume nil for this instance.
                                   reminded_at: nil,
                                   created_at: assessment.created_at,
                                   updated_at: Time.now)
        member.save
      end

      assessment.participants.each do |participant|
        member = ToolMember.create(tool: assessment,
                                   role: ToolMember.member_roles[:participant],
                                   user: participant.user,
                                   invited_at: participant.created_at,
                                   reminded_at: participant.reminded_at,
                                   created_at: participant.created_at,
                                   updated_at: Time.now)

        member.save
      end
    end
  end
end
