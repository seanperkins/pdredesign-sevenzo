require 'spec_helper'
require_relative './tool_specific_permission_concern'

describe ToolMembers::Permission do
  context 'when the tool is an inventory' do
    it_behaves_like 'permissions for a specific tool', :inventory, InventoryAccessGrantedNotificationWorker
  end

  context 'when the tool is an analysis' do
    it_behaves_like 'permissions for a specific tool', :analysis, AnalysisAccessGrantedNotificationWorker
  end
end
