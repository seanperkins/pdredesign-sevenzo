module Assessments
  class ImportData

    attr_accessor :assessments, :owner

    def initialize(data)
      @assessments = HashWithIndifferentAccess.new(data["user"]["assessments"])
      @owner = User.find_by(email: data["user"]["email"])
    end

    def to_db!
      @assessments.each do |assessment|
        #rubric_id, :name, :due_date, :district_id
      end
    end

    
  end
end