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

  describe '#response' do
    context 'when no response is attached to the assessment' do
      let(:assessment) {
        create(:assessment, :with_participants)
      }

      let(:assessments_report) {
        Assessments::Report.new(assessment)
      }

      it {
        expect(assessments_report.response.new_record?).to be true
      }
    end

    context 'when a response is attached to the assessment' do
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
        expect(assessments_report.response).to eq response
      }
    end
  end

  describe '#axis_questions' do
    context 'when questions are attached to a given axis' do
      let(:assessment) {
        response.responder
      }

      let(:response) {
        create(:response, :as_assessment_response, rubric: rubric_with_axes)
      }

      let!(:rubric_with_axes) {
        create(:rubric, :as_assessment_rubric, :with_questions_and_scores, question_count: 6)
      }

      let(:assessments_report) {
        Assessments::Report.new(assessment)
      }

      let(:axis) {
        rubric_with_axes.axis
      }

      it {
        expect(assessments_report.axis_questions(axis).size).to eq 6
      }
    end

    context 'when no questions are attached to a given axis' do
      let(:assessment) {
        response.responder
      }

      let(:response) {
        create(:response, :as_assessment_response, rubric: rubric_with_axes)
      }

      let!(:rubric_with_axes) {
        create(:rubric, :as_assessment_rubric, :with_questions_and_scores, question_count: 0)
      }

      let(:assessments_report) {
        Assessments::Report.new(assessment)
      }

      let(:axis) {
        rubric_with_axes.axis
      }

      it {
        expect(assessments_report.axis_questions(axis)).to be_empty
      }
    end
  end

  describe '#average' do
    context 'when the response has scores' do
      let(:assessment) {
        response.responder
      }

      let(:response) {
        create(:response, :as_assessment_response)
      }

      let!(:rubric_with_axes) {
        create(:rubric, :as_assessment_rubric, :with_questions_and_scores, question_count: 5,
               scores: [
                   {
                       response: response,
                       value: 1,
                       evidence: 'evidence'
                   },
                   {
                       response: response,
                       value: 2,
                       evidence: 'evidence'
                   },
                   {
                       response: response,
                       value: 3,
                       evidence: 'evidence'
                   },
                   {
                       response: response,
                       value: 4,
                       evidence: 'evidence'
                   },
                   {
                       response: response,
                       value: 5,
                       evidence: 'evidence'
                   }
               ]
        )
      }

      let(:assessments_report) {
        Assessments::Report.new(assessment)
      }

      let(:axis) {
        rubric_with_axes.axis
      }

      before(:each) do
        response.update(rubric: rubric_with_axes)
      end

      it {
        expect(assessments_report.average(axis)).to be_within(0.01).of 3.0
      }
    end
  end
end
