require 'spec_helper'

describe District do 
  it 'searches with a given query' do
    District.create!(name: 'first')
    District.create!(name: 'first2')

    District.create!(name: 'two')
    District.create!(name: 'three')

    expect(District.search('first').count).to eq(2)
    expect(District.search('two').count).to eq(1)
    expect(District.search('three').count).to eq(1)
  end

  it 'only returns results limited to 10' do
    20.times {|i| District.create!(name: "district #{i}") }
    expect(District.search('').count).to eq(10)
    expect(District.search.count).to eq(10)
  end

end
