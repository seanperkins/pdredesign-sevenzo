require 'spec_helper'
require_relative './learning_questions_controller_concern'

describe V1::LearningQuestionsController, 'supporting assessments' do
  render_views

  it_behaves_like 'a learning controller', :assessment
end

describe V1::LearningQuestionsController, 'supporting inventories' do
  render_views

  it_behaves_like 'a learning controller', :inventory
end

