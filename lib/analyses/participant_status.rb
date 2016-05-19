module Analyses
  class ParticipantStatus
    attr_reader :participant
    def initialize(participant)
      @participant = participant
    end

    def status
      return :pending if participant.invited_at.nil?
      :invited
    end

    def date
      return participant.analysis.updated_at if pending?
      participant.invited_at
    end

    def pending?
      status == :pending
    end

    def invited?
      status == :invited
    end

    def in_progress?
      status == :in_progress
    end

    def to_s
      status.to_s.titleize
    end
  end
end
