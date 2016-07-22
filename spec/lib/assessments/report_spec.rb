require 'spec_helper'

describe Assessments::Report do

  describe '#axes' do
    context 'when no axes for the assessment exist' do
      let(:assessment) {
        create(:assessment, :with_participants)
      }

      let(:assessments_report) {
        Assessments::Report.new(assessment)
      }

      it {
        expect(assessments_report.axes).to be_empty
      }
    end

    context 'when axes for the assessment exist' do
      let(:assessment) {
        response.responder
      }

      let(:response) {
        create(:response, :as_assessment_response, rubric: rubric_with_axes)
      }

      let!(:rubric_with_axes) {
        create(:rubric, :as_assessment_rubric, :with_questions_and_scores, question_count: 1)
      }

      let(:assessments_report) {
        Assessments::Report.new(assessment)
      }

      it {
        expect(assessments_report.axes).to_not be_empty
      }

    end
  end

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
      allow(instance).to receive(:response_id).and_return(99)
      expect(instance.average(axis)).to eq(1.0)
    end

  end

end
