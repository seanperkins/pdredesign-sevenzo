# == Schema Information
#
# Table name: scores
#
#  id          :integer          not null, primary key
#  value       :integer
#  evidence    :text
#  response_id :integer
#  question_id :integer
#  created_at  :datetime
#  updated_at  :datetime
#

require 'spec_helper'

describe Score do
  describe 'Skipped answer' do
    it 'allows a skipped answer' do
      Score.create.tap do |score|
        score.value = nil
        score.evidence = 'Some evidence'

        expect(score.save).to eq(true)
        expect(score.errors_on(:value)).to be_empty
      end
    end

    it 'allows for an initial state score' do
      Score.create(value: nil, evidence: nil)
    end

    it 'allows for skipped questions' do
      score = Score.create!(value: nil, evidence: nil)
      score.value = 1

      expect(score.save).to eq(true)
    end
  end

  describe 'when response is an Analysis' do
    before(:each) do
      subject.response = create(:response, :as_analysis_response)
    end

    it { is_expected.to validate_presence_of(:supporting_inventory_response) }
  end
end
