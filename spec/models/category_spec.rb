# == Schema Information
#
# Table name: categories
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  created_at :datetime
#  updated_at :datetime
#  axis_id    :integer
#

require 'spec_helper'

describe Category do
  context ' rubric_questions' do
    it 'returns only questions that belong to a rubric' do
      category = Category.create!(name: 'some cat')  
      rubric1   = Rubric.create!
      rubric2   = Rubric.create!
      question1 = rubric1
        .questions
        .create!(headline: 'question1', content: 'some content', category: category)

      question2 = rubric2
        .questions
        .create!(headline: 'question2', content: 'some content', category: category)

      
      rubric1_questions = category.rubric_questions(rubric1)
      rubric2_questions = category.rubric_questions(rubric2)

      expect(rubric1_questions.count).to eq(1)
      expect(rubric2_questions.count).to eq(1)

      expect(rubric1_questions.first[:id]).to eq(question1.id)
      expect(rubric2_questions.first[:id]).to eq(question2.id)

    end

    it 'orders the questions correctly' do
      category = Category.create!(name: 'some cat')  
      rubric   = Rubric.create!

      question1 = rubric.questions
        .create!(headline: 'question1',
                 order: 1, 
                 content: 'some content',
                 category: category)

      question2 = rubric.questions
        .create!(headline: 'question2',
                 order: 0, 
                 content: 'some content',
                 category: category)     

      questions = category.rubric_questions(rubric)
      expect(questions[0]).to eq(question2)
      expect(questions[1]).to eq(question1)

    end
  end
end
