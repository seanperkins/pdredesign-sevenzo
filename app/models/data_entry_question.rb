# == Schema Information
#
# Table name: data_entry_questions
#
#  id                   :integer          not null, primary key
#  who_enters_data      :string           not null
#  how_data_is_entered  :string           not null
#  when_data_is_entered :string           not null
#  created_at           :datetime
#  updated_at           :datetime
#

class DataEntryQuestion < ActiveRecord::Base

  enum data_entered_frequency: {
      yearly: 'Yearly',
      quarterly: 'Quarterly',
      monthly: 'Monthly',
      weekly: 'Weekly',
      daily: 'Daily',
      scheduled: 'Scheduled'
  }

end
