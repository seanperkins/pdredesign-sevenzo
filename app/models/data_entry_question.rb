# == Schema Information
#
# Table name: data_entry_questions
#
#  id                   :integer          not null, primary key
#  who_enters_data      :string
#  how_data_is_entered  :string
#  when_data_is_entered :string
#  created_at           :datetime
#  updated_at           :datetime
#  data_entry_id        :integer
#

class DataEntryQuestion < ActiveRecord::Base

  belongs_to :data_entry

  enum data_entered_frequency: {
      yearly: 'Yearly',
      quarterly: 'Quarterly',
      monthly: 'Monthly',
      weekly: 'Weekly',
      daily: 'Daily',
      scheduled: 'Scheduled'
  }

  validates :when_data_is_entered, inclusion: {in: DataEntryQuestion.data_entered_frequencies.values}, allow_blank: true
end
