class V1::ToolkitsController < ApplicationController
  def index
    @toolkits = toolkit_hash
  end

  private
  def toolkit_hash
  [
    {
      title: 'I. Strategic Planning',
      goal: 'To understand and analyze the current and future state of Professional Development within our district',
      categories: [
        {
          title: 'Current State Analysis',
          categories: [
            {
              title: 'Key Information Gathering' ,
              categories: [
                {title: 'Readiness Assesment', url: 'test', description: 'The PD Readiness Assessment consists of 28 questions that support team engagement in a candid cross-functional discussion about PD using a common language, and the development of a shared team view to identify the elements to be strengthened or leveraged to support a PD system redesign effort.'},
                {title: 'Initiative Inventory', url: nil}
              ]
            },
            {
              title: 'Deep Dive Diagnostics' ,
              categories: [
                {title: 'End User Survey', url: nil},
                {title: 'Technology Diagnostic Product Inventories', url: nil},
                {title: 'Time Diagnostic', url: nil},
                {title: 'Financial Systems & Budget', url: nil},
                {title: 'Allocation Diagnostic', url: nil},
              ]
            },
          ]
        },
        {
          title: 'Future State Visioning',
          categories: [
            {
              title: 'Strategic Vision Articulation' ,
              categories: [
                {title: 'Roadmap for first 100 days of PD redesign', url: nil},
              ]
            },
          ]
        },
      ]
    },
    {
      title: 'II. Implementation Planning',
      goal: 'To identify and acquire all of the resources required to fill unmet capabilities',
      categories: [
        {
          title: 'Change Management Planning',
          categories: [
           {
              title: 'Internal Hiring',
              categories: []
           },
           {
              title:'Integration/Cohesion Plan',
              categories: [
                {title: 'IT Deliverables Management Guide', url: nil}
              ]
           },
           {
              title:'Communication Management & Messaging' ,
              categories: []
           },
           {
              title:'Scheduling' ,
              categories: []
           },
          ]
        },
        {
          title: 'Procurement Process',
          categories: [
            {
              title: 'RFP Development',
              categories: [
                {title: 'RFP Guidelines', url: nil},
                {title: 'Demand-to-Supply Framework', url: nil},
              ]
            },
            {
              title: 'Initial Vendor Review',
              categories: [
                {title: 'Vendor Selection Criteria', url: nil},
                {title: 'Vendor Negotiation Guidelines', url: nil},
              ]
            },
            {
              title: 'Final Vendor Selection',
              categories: [
                {title: 'Vendor Integration Development', url: nil},
              ]
            },
          ]
        },
      ]
    },
    {
      title: 'III. Implementation Execution',
      goal: 'To execute the system change while collection and analyzing feedback',
      categories: [
        {
          title: 'Implementation Pilot',
          categories: [
            {
              title:'Labor Management Plan',
              categories: []
            },
            {
              title:'User Feedback',
              categories: []
            },
            {
              title:'Success Metrics',
              categories: []
            },
            {
              title:'Course Adjusting',
              categories: []
            }
          ]

        }
      ]
    }

  ]
  end
end
