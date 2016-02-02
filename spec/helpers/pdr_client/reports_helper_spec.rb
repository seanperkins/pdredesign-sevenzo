require 'spec_helper'

describe PdrClient::ReportsHelper do
  include PdrClient::ReportsHelper

  it 'has answer titles' do
    expect(answer_titles).not_to be_nil
  end

  it 'returns the report headers' do
    participants = [
      {"name" => "John"}, 
      {"name" => "Jane"}, 
    ]

    expect(headers(participants)).to eq(
      ["Question Number", "Question Text", "Type", "John", "Jane"]  
    )
  end

  describe '#score_for_participant' do
    it 'returns the score for a participant and question' do
      scores = [
        { "question_id" => 2,
          "value" => 1,
          "evidence" => "test",
          "participant" => { "participant_id" => 5}},
        { "question_id" => 2, "participant" => { "participant_id" => 3}},
        { "question_id" => 3, "participant" => { "participant_id" => 4}}
      ] 
      expect(score_for_participant(scores, 2, 5)["value"]).to eq(1)
      expect(score_for_participant(scores, 2, 5)["evidence"]).to eq("test")
    end

    it 'returns an empty answer when scores is not present' do
      expect(score_for_participant(nil, 2, 5)["value"]).to eq(nil)
      expect(score_for_participant(nil, 2, 5)["evidence"]).to eq(nil)
    end
  end

  describe '#answer_count' do
    it 'returns 0 when scores is missing' do
      expect(answer_count(nil, 1, 1)).to eq(0)
    end

    it 'counts each answer' do
      scores = [
        { question_id: 1, value: 1},
        { question_id: 1, value: 1},
        { question_id: 1, value: 2},
        { question_id: 1, value: 1},
        { question_id: 2, value: 1}
      ]

      expect(answer_count(scores, 1, 1)).to eq(3)
      expect(answer_count(scores, 1, 2)).to eq(1)
      expect(answer_count(scores, 2, 1)).to eq(1)
    end

  end

  describe '#question_score_value' do
    it 'returns 5 when evidence is empty and value is set' do
      question = { score: {value: nil, evidence: 'something'} }
      expect(question_score_value(question)).to eq(5)
    end

    it 'returns the value' do
      question = { score: {value: 1, evidence: 'something'} }
      expect(question_score_value(question)).to eq(1)
    end
  end

  
end

 
