require 'spec_helper'

describe Response do
  context '#completed?' do
    it 'returns true when response is submitted' do
      response = Response.new(submitted_at: Time.now)
      expect(response.completed?).to eq(true)
    end

    it 'returns false when response is not submitted' do
      response = Response.new
      expect(response.completed?).to eq(false)
    end
  end

  context 'scope: categories' do
    it 'returns all the categories for questions ' do 
      responder = Participant.create!(user_id: 1)
      rubric    = Rubric.create!
      response  = Response.create!(
        responder_type: 'Assessment', 
        responder: responder,
        rubric: rubric)

      category1 = Category.create!(name: "first")
      category2 = Category.create!(name: "second")
      category3 = Category.create!(name: "third")

      3.times { rubric.questions.create!(category: category1) }
      3.times { rubric.questions.create!(category: category2) }
      3.times { rubric.questions.create!(category: category3) }

      names = response.categories.pluck(:id, :name).map(&:last)
      %w(first second third).each do |name|
        expect(names).to include(name)
      end
    end

  end

  context 'filters' do
    it 'updates the meeting date to now when response type is Assessment' do
      responder = Participant.create!(user_id: 1)
      response  = Response.create!(responder_type: 'Assessment', responder: responder)
      3.times { Score.create(response: response, value: 1, evidence: "test") }
      expect(response.send(:entered_scores_count)).to eq(3)
    end
  end

  context '#percent_completed' do
    it 'returns the count of questions' do
      response = Response.new
      allow(response).to receive(:questions).and_return([1,2,3])
      expect(response.send(:questions_count)).to eq(3)
    end

    it 'returns the count of entered_scores' do
      response = Response.create!

      allow(response).to receive(:questions).and_return([1,2,3])
      expect(response.send(:questions_count)).to eq(3)
    end

    it 'returns 50% percent completed' do
      response = Response.new

      allow(response).to receive(:questions_count).and_return(10.00)
      allow(response).to receive(:entered_scores_count).and_return(5.00)

      expect(response.percent_completed).to eq(50)
    end

    it 'returns 100% percent completed' do
      response = Response.new

      allow(response).to receive(:questions_count).and_return(10.00)
      allow(response).to receive(:entered_scores_count).and_return(10.00)

      expect(response.percent_completed).to eq(100)
    end

  end
end
