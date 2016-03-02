# == Schema Information
#
# Table name: participants
#
#  id               :integer          not null, primary key
#  user_id          :integer
#  assessment_id    :integer
#  created_at       :datetime
#  updated_at       :datetime
#  invited_at       :datetime
#  reminded_at      :datetime
#  report_viewed_at :datetime
#

require 'spec_helper'

describe InventoryParticipant do
  it { is_expected.to validate_presence_of :inventory }
  it { is_expected.to validate_presence_of :user }
  it { is_expected.to belong_to(:inventory) }
  it { is_expected.to belong_to(:user) }
end
