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

require 'spec_helper'

describe Rubric do
  context '#enabled' do
    before do
      Rubric.create(name: 'enabled rubric', enabled: true)
      Rubric.create(name: 'disabled rubric', enabled: false)
    end

    it 'only returns enabled rubrics' do 
      rubrics = Rubric.enabled
      expect(rubrics.count).to eq(1)
      expect(rubrics.first[:name]).to eq('enabled rubric')
    end

  end
end
