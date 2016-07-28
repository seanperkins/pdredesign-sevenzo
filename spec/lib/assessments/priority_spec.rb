require 'spec_helper'

describe Assessments::Priority do

  describe '#categories' do
    context 'when no categories with scores for an assessment exist' do
      let(:assessment) {
        create(:assessment, :with_participants)
      }

      let(:assessments_priority) {
        Assessments::Priority.new(assessment)
      }

      it {
        expect(assessments_priority.categories).to be_empty
      }
    end

    context 'when categories with scores for an assessment exist' do
      context 'when an average is present' do

        let(:response) {
          create(:response, :as_assessment_response, :submitted)
        }

        let(:rubric) {
          create(:rubric, :as_assessment_rubric, :with_questions_and_scores, question_count: 3, category_count: 1, scores: [
              {
                  response: response,
                  value: 1,
                  evidence: 'First evidence'
              },
              {
                  response: response,
                  value: 2,
                  evidence: 'Second evidence'
              },
              {
                  response: response,
                  value: 3,
                  evidence: 'Third evidence'
              },
          ])
        }

        let(:assessment) {
          a = response.responder
          a.rubric = rubric
          a
        }

        let(:assessments_priority) {
          Assessments::Priority.new(assessment)
        }

        before(:each) do
          response.rubric = rubric
          response.save!
        end

        it {
          expect(assessments_priority.categories.size).to eq 1
        }

        it {
          expect(assessments_priority.categories.first[:average]).to be_within(0.01).of 2.0
        }
      end

      context 'when no average is present' do
        let(:response) {
          create(:response, :as_assessment_response, :submitted)
        }

        let(:rubric) {
          create(:rubric, :as_assessment_rubric, :with_questions_and_scores, question_count: 3, category_count: 1, scores: [
              {
                  response: response,
                  evidence: 'First skipped evidence'
              },
              {
                  response: response,
                  evidence: 'Second skipped evidence'
              },
              {
                  response: response,
                  evidence: 'Third skipped evidence'
              },
          ])
        }

        let(:assessment) {
          a = response.responder
          a.rubric = rubric
          a
        }

        let(:assessments_priority) {
          Assessments::Priority.new(assessment)
        }

        before(:each) do
          response.rubric = rubric
          response.save!
        end

        it {
          expect(assessments_priority.categories.first[:average]).to be_within(0.01).of 0.0
        }
      end

      context 'when categories have a defined order' do
        let(:response) {
          create(:response, :as_assessment_response, :submitted)
        }

        let(:rubric) {
          create(:rubric, :as_assessment_rubric, :with_questions_and_scores, question_count: 3, category_count: 3, scores: [
              {
                  response: response,
                  value: 12,
                  evidence: 'First evidence'
              },
              {
                  response: response,
                  value: 71,
                  evidence: 'Second evidence'
              },
              {
                  response: response,
                  value: 100,
                  evidence: 'Third evidence'
              },
          ])
        }

        let(:original_order) {
          rubric.categories.pluck(:id)
        }

        let!(:priority) {
          create(:priority, tool: assessment, order: original_order.reverse)
        }

        let(:assessment) {
          a = response.responder
          a.rubric = rubric
          a
        }

        let(:assessments_priority) {
          Assessments::Priority.new(assessment)
        }

        before(:each) do
          response.rubric = rubric
          response.save!
        end

        it {
          expect(assessments_priority.categories.map { |cat| cat[:id] }.first).to eq original_order.last
        }

        it {
          expect(assessments_priority.categories.map { |cat| cat[:id] }.second).to eq original_order.second
        }

        it {
          expect(assessments_priority.categories.map { |cat| cat[:id] }.last).to eq original_order.first
        }
      end

      context 'when the defined categories for a result are the same' do
        let(:response) {
          create(:response, :as_assessment_response, :submitted)
        }

        let(:rubric) {
          create(:rubric, :as_assessment_rubric, :with_questions_and_scores, question_count: 1, category_count: 10, distinct_categories: false, scores: [
              {
                  response: response,
                  value: 12,
                  evidence: 'First evidence'
              }
          ])
        }

        let(:assessment) {
          a = response.responder
          a.rubric = rubric
          a
        }

        let(:assessments_priority) {
          Assessments::Priority.new(assessment)
        }

        before(:each) do
          response.rubric = rubric
          response.save!
        end

        it {
          expect(assessments_priority.categories.length).to eq 1
        }
      end
    end
  end
end
