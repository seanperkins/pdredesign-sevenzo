class TwitterAvatarWorker
  include ::Sidekiq::Worker

  def perform(user_id)
    user = find_user(user_id)
    Twitter::UpdateAvatar.new(user).execute
  end

  private
  def find_user(user_id)
    User.find(user_id)
  end
end
