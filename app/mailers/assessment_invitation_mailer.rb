class AssessmentInvitationMailer < ApplicationMailer
  def invite(user_invitation)
    invite = UserInvitation.find(user_invitation.id)
    user = invite.user

    @first_name = user.first_name
    @facilitator_name = invite.assessment.user.full_name
    @assessment_name = invite.assessment.name
    @district_name = invite.assessment.district.name
    @message = invite.assessment.message.html_safe
    @due_date = invite.assessment.due_date.strftime("%B %d, %Y")
    @assessment_link = invite_url(invite.token)

    mail(to: invite.email)
  end

  private
  def invite_url(token)
    "#{ENV['BASE_URL']}/#/invitations/#{token}"
  end
end
