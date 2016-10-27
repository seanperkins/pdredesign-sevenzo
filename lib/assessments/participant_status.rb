module Assessments
  class ParticipantStatus

    attr_reader :participant

    def initialize(participant)
      @participant = participant
    end

    def status
      return :pending if participant.invited_at.nil?
      return :invited if participant.response.nil?
      return :in_progress if participant.response.submitted_at.nil?
      :completed
    end

    def date
      return participant.tool.updated_at if pending?
      return participant.invited_at if invited?
      return participant.response.updated_at if in_progress?
      participant.response.submitted_at
    end

    def completed?
      is_status?(:completed)
    end

    def in_progress?
      is_status?(:in_progress)
    end

    def invited?
      is_status?(:invited)
    end

    def pending?
      is_status?(:pending)
    end

    def to_s
      status
          .to_s
          .humanize
          .titleize
    end

    private
    def is_status?(compare)
      status == compare
    end
  end
end
