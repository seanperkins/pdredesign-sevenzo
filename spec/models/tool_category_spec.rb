require 'spec_helper'

describe ToolCategory do
  it '#tools returns all tools for this category' do
    phase    = ToolPhase.create(title: 'test', description: 'description') 
    category = ToolCategory.create(title: 'category', tool_phase: phase)

    5.times {
      Tool.create!(tool_category_id: category.id, title: 'Some title', description:'', url:'')
    }

    expect(category.tools.count).to eq(5)
  end
end
