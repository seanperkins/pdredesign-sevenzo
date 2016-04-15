module Inventories
  class ParticipantStatus
    attr_reader :participant
    def initialize(participant)
      @participant = participant
    end

    def status
      return :pending if participant.invited_at.nil?
      return :invited unless participant.invited_at.nil?
      # TODO:  In-progress state
      :completed
    end

    def date
      return participant.inventory.updated_at if pending?
      participant.invited_at if invited?
      # TODO:  In-progress state
    end

    def pending?
      status == :pending
    end

    def invited?
      status == :invited
    end

    def to_s
      status.to_s.titleize
    end
  end
end
