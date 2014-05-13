require 'spec_helper'

describe Assessments::Report::Overview do
  let(:subject) { Assessments::Report::Overview }

  context '#stengths' do
    before do
      create_magic_assessments
      @report_hash = double("ReportObject")
      response1    = Response.create(
        responder_type: 'Participant',
        responder_id:   @participant.id,
        submitted_at: Time.now)

      response2    = Response.create(
        responder_type: 'Participant',
        responder_id:   @participant2.id,
        submitted_at: Time.now)

      category1  = Category.create(name: "Some cat1")
      category2  = Category.create(name: "Some cat2")
      category3  = Category.create(name: "Some cat3")
      question1  = Question.create(category: category1)
      question2  = Question.create(category: category2)
      question3  = Question.create(category: category3)

      Score.create(value: 1, 
        response_id: response1.id, 
        question: question1)

      Score.create(value: 3, 
        response_id: response2.id, 
        question: question2)

      Score.create(value: nil, 
        response_id: response2.id, 
        question: question3)
    end

    it 'returns the sorted strengths' do
      strengths = subject
        .new(@assessment_with_participants)
        .strengths

      expect(strengths.first).to eq('Some cat2')
      expect(strengths.second).to eq('Some cat1')
    end

    it 'returns the sorted limitations' do
      limitations = subject
        .new(@assessment_with_participants)
        .limitations

      expect(limitations.second).to eq('Some cat2')
      expect(limitations.first).to eq('Some cat1')
    end

  end
end
 
