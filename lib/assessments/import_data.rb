module Assessments
  class ImportData
    include ScoreQuery
    include ImportDataHelper

    attr_accessor :assessments, :owner

    def initialize(data)
      data = HashWithIndifferentAccess.new(data)
      @assessments = data[:user][:assessments]
      @owner = User.find_by(email: data[:user][:email])
    end

    def to_db!
      place_data_in_database
    end

    protected

    def place_data_in_database
      @assessments.each do |assessment_data|
        district   = District.find_by(name: assessment_data[:district_name])
        rubric     = Rubric.find_by(version: BigDecimal.new(assessment_data[:rubric_version]))
        
        assessment = create_assessment(assessment_data, district, rubric)

        # Working with Participants
        create_participants(assessment, assessment_data[:participants])
        # Assign Assessment
        assign_assessment(assessment, assessment_data[:assigned_at])
        # Creating Consensus and respective responses
        prepare_consensus(assessment, assessment_data[:consensus])
      end
    end

  end
end