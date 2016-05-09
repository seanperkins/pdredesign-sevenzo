# == Schema Information
#
# Table name: learning_questions
#
#  id         :integer          not null, primary key
#  tool_id    :integer
#  user_id    :integer
#  body       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  tool_type  :string
#

require 'spec_helper'

describe LearningQuestion do
  it {is_expected.to belong_to(:tool)}
  it {is_expected.to belong_to(:user)}
  it {is_expected.to validate_presence_of(:body)}
  it {is_expected.to validate_length_of(:body).is_at_most(255)}
  it {is_expected.to validate_presence_of(:user)}
  it {is_expected.to validate_presence_of(:tool)}
end
