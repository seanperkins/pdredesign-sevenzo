module SimpleSearch
  extend ActiveSupport::Concern

  module ClassMethods
    def search(search = '')
      return limit(10) if search.empty?

      limit(10).where('LOWER(name) LIKE ?', "%#{search.downcase}%")
    end
  end
end
