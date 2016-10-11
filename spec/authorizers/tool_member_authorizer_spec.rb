require 'spec_helper'
require_relative './tool_member_authorizer_concern.rb'

describe ToolMemberAuthorizer do
  context 'when the tool is an inventory' do
    it_behaves_like 'an authorizer for a tool', :inventory
  end

  context 'when the tool is an analysis' do
    it_behaves_like 'an authorizer for a tool', :analysis
  end

  context 'when the tool is an assessment' do
    it_behaves_like 'an authorizer for a tool', :assessment
  end
end
