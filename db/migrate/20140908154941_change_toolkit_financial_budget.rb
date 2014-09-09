class ChangeToolkitFinancialBudget < ActiveRecord::Migration
  def up
    tk = Tool.find_by(title: 'Financial Systems & Budget')
    if tk
      tk.update(title: "Financial Systems & Budget Allocation Diagnostic")
      Tool.find_by(title: 'Allocation Diagnostic').destroy
    end
  end
end
