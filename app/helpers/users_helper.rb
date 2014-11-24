module UsersHelper
  def avatar_image(url)
    return fallback_avatar_image if url.nil? || url.empty?
    image_url(url) 
  end

  def fallback_avatar_image
    image_url('fallback/default.png')
  end
end
