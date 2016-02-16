# == Schema Information
#
# Table name: learning_questions
#
#  assessment_id :integer          primary key
#  user_id       :integer          primary key
#  body          :text
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

require 'spec_helper'

describe LearningQuestion do
  it {is_expected.to belong_to(:assessment)}
  it {is_expected.to belong_to(:user)}
  it {is_expected.to validate_presence_of(:body)}
  it {is_expected.to validate_length_of(:body).is_at_most(255)}
end
