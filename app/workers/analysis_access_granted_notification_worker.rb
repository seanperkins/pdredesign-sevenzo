class AnalysisAccessGrantedNotificationWorker
  include ::Sidekiq::Worker

  def perform(analysis_id, user_id, role)
    analysis = Analysis.find(analysis_id)
    user = User.find(user_id)
    AnalysisAccessGrantedMailer.notify(analysis, user, role).deliver_now
  end
end
