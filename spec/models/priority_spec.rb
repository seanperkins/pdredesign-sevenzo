require 'spec_helper'

describe Priority do
  let(:subject) { Priority }

  it 'can store the sort order' do
    priorities = Priority.create!(assessment_id: 1, order: [3,2,1])
    expect(Priority.find(priorities.id).order).to eq([3,2,1])
  end

  it 'requires order' do
    priorities = Priority.new(assessment_id: 1)
    expect(priorities.valid?).to eq(false)
  end

  it 'cant create more than one order for an assessment' do
    Priority.create!(assessment_id: 1, order: [3,2,1])

    expect {
      Priority.create!(assessment_id: 1, order: [3,2,1])
    }.to raise_error
  end

end
