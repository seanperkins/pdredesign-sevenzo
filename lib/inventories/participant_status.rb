module Inventories
  class ParticipantStatus
    attr_reader :participant
    def initialize(participant)
      @participant = participant
    end

    def status
      return :pending if participant.invited_at.nil?
      return :invited if participant.inventory_response.nil?
      return :in_progress if participant.inventory_response.submitted_at.nil?
      :completed
    end

    def date
      return participant.inventory.updated_at if pending?
      return participant.invited_at if invited?
      return participant.inventory_response.updated_at if in_progress?
      participant.inventory_response.submitted_at
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
