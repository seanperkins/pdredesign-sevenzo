require 'spec_helper'

describe Assessments::Report::Overview do
  let(:subject) { Assessments::Report::Overview }
  before do
    create_magic_assessments
    create_responses
    @report_hash = double("ReportObject")
  end


  context '#categories_by_average' do
    it 'returns a list of categories with id' do
       categories = subject
        .new(@assessment_with_participants)
        .categories_by_average

       expect(categories.first[:name]).to eq('Some cat3')
       expect(categories.first[:id]).not_to be_nil
    end
  end

end
 
