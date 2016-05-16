require 'spec_helper'

describe Assessments::Priority do
  before do
    create_magic_assessments
    create_struct
    create_responses

    @cat1 = Category.find_by(name: 'Some cat1')
    @cat2 = Category.find_by(name: 'Some cat2')
    @cat3 = Category.find_by(name: 'Some cat3')

    @priority = Priority.create!(
      order: [@cat2.id, @cat1.id],
      tool: assessment)
  end 

  let(:assessment) { @assessment_with_participants }  

  before do 
    @subject = Assessments::Priority.new(assessment)
  end

  context '#categories' do
    it 'returns all the categories' do
      expect(@subject.categories.count).to eq(4);
    end

    it 'returns 0 for unaveraged categories' do
      expect(@subject.categories.last[:average]).to eq(0);
    end

    it 'returns correctly ordered categories' do
      first  = @subject.categories[0]
      second = @subject.categories[1]

      expect(first[:name]).to eq('Some cat2')
      expect(first[:average]).to eq(3.0)

      expect(second[:name]).to eq('Some cat1')
    end

    it 'returns distinct categories' do
      @priority.delete
      @priority = Priority.create!(
        order: [@cat2.id, @cat2.id, @cat1.id],
        tool: assessment)

      expect(@subject.categories.count).to eq(4)
    end

    it 'returns cateogries not in order' do
      @priority.delete
      Priority.create!(order: [@cat3.id, @cat2.id], tool: assessment)

      first  = @subject.categories[0]
      second = @subject.categories[1]
      third  = @subject.categories[2]

      expect(first[:name]).to  eq('Some cat3')
      expect(second[:name]).to eq('Some cat2')
      expect(third[:name]).not_to be_nil
    end
  end
end
