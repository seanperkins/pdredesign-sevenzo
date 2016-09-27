class ConvertParticpantResponsesToToolMemberResponses < ActiveRecord::Migration
  def up
    Response.where(responder_type: 'Participant').each { |response|
      Participant.where(id: response.responder_id).each { |participant|
        ToolMember.where(user: participant.user, tool: participant.assessment, role: ToolMember.member_roles[:participant]).each {|tool_member|
          Response.create!(responder: tool_member,
                           rubric: response.rubric,
                           scores: response.scores,
                           feedbacks: response.feedbacks,
                           submitted_at: response.submitted_at,
                           created_at: response.created_at,
                           updated_at: Time.now,
                           notification_sent_at: response.notification_sent_at)
        }
      }
    }
  end

  def down
    Response.where(responder_type: 'ToolMember').delete_all
  end
end
