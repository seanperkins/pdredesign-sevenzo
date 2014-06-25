require 'spec_helper'

describe Assessments::Report do 
  let(:subject) { Assessments::Report }

  before { create_magic_assessments }
  before { create_struct }

  let(:assessment) { @assessment_with_participants }
  let(:instance)   { subject.new(assessment) }

  it 'returns a new response if none are avail' do
    expect(instance.response.new_record?).to eq(true)
  end

  it 'returns a response of the assessment' do
    response = Response.create!(
      responder_type: 'Assessment', 
      responder: @participant,
      rubric: @rubric,
      id: 11)

    assessment.update(response: response)
    expect(instance.response[:id]).to eq(11)
  end

  it 'returns all questions axes' do
    Axis.create!(id: 9, name: 'some_axis', description: 'none')
    allow(instance).to receive(:axes_ids).and_return([9])

    expect(instance.axes.first[:id]).to eq(9)
  end

  context 'with response' do
    before do
      response = Response.create!(
        responder_type: 'Assessment', 
        responder: @participant,
        rubric: @rubric,
        id: 11)
      assessment.update(response: response)
    end

    it 'returns the questions for an axis' do
      axis = Axis.find_by_name('something')
      expect(instance.axis_questions(axis).count).to eq(6)
    end

    it 'returns the average for an axis' do
      axis = Axis.find_by_name('something')
      allow(instance).to receive(:response_ids).and_return([99])
      expect(instance.average(axis)).to eq(1.0)
    end

  end

end
