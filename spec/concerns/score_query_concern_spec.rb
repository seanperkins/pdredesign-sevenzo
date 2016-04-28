require 'spec_helper'

class ScoreQueryUtilizingController < ApplicationController
end

describe ScoreQueryUtilizingController do
  describe '#create_empty_scores' do
    context 'when no scores for the attached question exist' do
      let!(:questions) {
        create_list(:question, 5, category: category, rubrics: [rubric])
      }

      let(:rubric) {
        create(:rubric)
      }

      let(:category) {
        create(:category)
      }

      let(:response) {
        create(:response, rubric: rubric)
      }

      before(:each) do
        subject.create_empty_scores(response)
      end

      it 'creates new scores' do
        expect(response.scores.size).to eq 5
      end

      it 'associates the scores to the correct question' do
        response.scores.each do |score|
          expect(response.questions.where(id: score.question.id).exists?).to be true
        end
      end
    end

    context 'when some scores for the attached questions exist' do
      let!(:questions) {
        create_list(:question, 5, category: category, rubrics: [rubric])
      }

      let!(:scores) {
        usable_questions = questions.sample(2)
        usable_questions.each do |question|
          create(:score, response: response, question: question, evidence: 'I already existed!')
        end
      }

      let(:rubric) {
        create(:rubric)
      }

      let(:category) {
        create(:category)
      }

      let(:response) {
        create(:response, rubric: rubric)
      }

      before(:each) do
        subject.create_empty_scores(response)
      end

      it 'fills in the missing scores' do
        expect(response.scores.size).to eq 5
      end

      it 'still contains the originally created scores' do
        expect(response.scores.where(evidence: 'I already existed!').size).to eq 2
      end
    end

    context 'when scores for the attached question exist' do
      let!(:questions) {
        create_list(:question, 5, category: category, rubrics: [rubric])
      }

      let!(:scores) {
        questions.each do |question|
          create(:score, response: response, question: question, evidence: 'I already existed!')
        end
      }

      let(:rubric) {
        create(:rubric)
      }

      let(:category) {
        create(:category)
      }

      let(:response) {
        create(:response, rubric: rubric)
      }

      before(:each) do
        subject.create_empty_scores(response)
      end

      it 'does not create any new scores' do
        expect(response.scores.where(evidence: 'I already existed!').size).to eq 5
      end
    end
  end
end
