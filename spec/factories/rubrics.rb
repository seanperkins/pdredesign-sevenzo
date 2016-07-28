# == Schema Information
#
# Table name: rubrics
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  version    :decimal(, )
#  created_at :datetime
#  updated_at :datetime
#  enabled    :boolean
#  tool_type  :string
#

FactoryGirl.define do
  factory :rubric do
    name { Faker::Hacker.noun }
    sequence(:version)
    enabled true

    trait :as_assessment_rubric do
      tool_type Assessment.to_s
    end

    trait :as_analysis_rubric do
      tool_type Analysis.to_s
    end

    trait :with_questions_and_scores do
      transient do
        category_count 1
        question_count 1
        distinct_categories true
        scores Array.new
        answers Array.new
      end

      after(:create) do |rubric, evaluator|
        rubric.axis = create(:axis)
        if evaluator.distinct_categories
          categories = create_list(:category, evaluator.category_count, axis: rubric.axis)
        else
          categories = []
          category = create(:category, axis: rubric.axis)
          evaluator.category_count.times do
            categories.push(category)
          end
        end

        categories.each { |category|
          questions = create_list(:question, evaluator.question_count,
                                  rubrics: [rubric],
                                  headline: Faker::Lorem.word,
                                  category: category)
          evaluator.scores.each_with_index { |score_hash, idx|
            score_hash[:question] = questions[idx]
            create(:score, score_hash)

            evaluator.answers.each { |answer_hash|
              answer_hash[:question] = questions[idx]
              create(:answer, answer_hash)
            }
          }
        }
      end
    end
  end
end
