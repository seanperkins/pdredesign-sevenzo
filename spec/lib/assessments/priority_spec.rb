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
    end
  end

  before do
    # create_magic_assessments
    # create_struct
    # create_responses
    #
    # @cat1 = Category.find_by(name: 'Some cat1')
    # @cat2 = Category.find_by(name: 'Some cat2')
    # @cat3 = Category.find_by(name: 'Some cat3')
    #
    # @priority = Priority.create!(
    #     order: [@cat2.id, @cat1.id],
    #     tool: assessment)
  end

  let(:assessment) { @assessment_with_participants }

  before do
    @subject = Assessments::Priority.new(assessment)
  end

  context '#categories' do

    it 'returns correctly ordered categories' do
      first = @subject.categories[0]
      second = @subject.categories[1]

      expect(first[:name]).to eq('Some cat2')
      expect(first[:average]).to eq(3.0)

      expect(second[:name]).to eq('Some cat1')
    end

    it 'returns distinct categories' do
      @priority.delete
      @priority = Priority.create!(
          order: [@cat2.id, @cat2.id, @cat1.id],
          tool: assessment)

      expect(@subject.categories.count).to eq(4)
    end

    it 'returns cateogries not in order' do
      @priority.delete
      Priority.create!(order: [@cat3.id, @cat2.id], tool: assessment)

      first = @subject.categories[0]
      second = @subject.categories[1]
      third = @subject.categories[2]

      expect(first[:name]).to eq('Some cat3')
      expect(second[:name]).to eq('Some cat2')
      expect(third[:name]).not_to be_nil
    end
  end
end
