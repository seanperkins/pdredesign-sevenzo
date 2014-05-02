require 'spec_helper'

describe Score do
  context 'blank evidence' do
    it 'resets when evidence is blank and value is present' do
      Score.create.tap do |score|
        score.value = 1
        score.save
        expect(score.value).to eq(nil)
        expect(score.evidence).to eq(nil)
      end
    end

    it 'does not reset when evidence is present' do
      Score.create.tap do |score|
        score.value = 1
        score.evidence = "evidence"
        score.save

        expect(score.value).to eq(1)
        expect(score.evidence).to eq('evidence')
      end
    end
  end
end