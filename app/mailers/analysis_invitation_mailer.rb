class AnalysisInvitationMailer < ApplicationMailer
  def invite(user_invitation)
    invite = AnalysisInvitation.find(user_invitation)
    user = invite.user
    @analysis = invite.analysis

    @first_name = user.first_name
    @facilitator = @analysis.inventory.owner
    @analysis_name = @analysis.name
    @district_name = @analysis.inventory.district.name
    @deadline = @analysis.deadline.strftime("%B %d, %Y")
    @analysis_link = invite_url(invite.token)
    @message = @analysis.message.try(:html_safe)

    mail(to: invite.email)
  end

  def reminder(analysis, message, participant)
    @first_name = participant.user.first_name
    @analysis_name = analysis.name
    @deadline = analysis.deadline.strftime("%B %d, %Y")
    @analysis_link = "#{ENV['BASE_URL']}/#/inventories/#{analysis.inventory_id}/analyses/#{analysis.id}/responses"
    @message = message.try(:html_safe)

    mail(subject: 'Analysis Reminder',
          to: participant.user.email)
  end

  private
  def invite_url(token)
    "#{ENV['BASE_URL']}/#/inventories/#{@analysis.inventory_id}/analyses/#{@analysis.id}/invitations/#{token}"
  end

  def default_avatar
    ActionController::Base.helpers.asset_path('fallback/default.png')
  end
end
