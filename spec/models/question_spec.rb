require 'spec_helper'

describe Question do
  let(:subject) { Question }

  it 'sorts by the :order field' do
    Question.create(order: 1, headline: 'second')
    Question.create(order: 0, headline: 'first')
    Question.create(order: 2, headline: 'third')

    question = Question.ordered
    expect(question[0].headline).to eq('first')
    expect(question[1].headline).to eq('second')
    expect(question[2].headline).to eq('third')
  end
  
end
