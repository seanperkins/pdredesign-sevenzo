class V1::ToolkitsController < ApplicationController
  def index
    @toolkits = toolkit_hash
  end

  private
  def toolkit_hash
    [{ title: 'I. Strategic Planning',
      goal: 'To understand and analyze the current and future state of Professional Development within our district',
      categories: [
        'Current State Analysis' =>
        {
          'Key Information Gathering' =>
          [
            {title: 'Readiness Assesment', url: 'test', description: 'The PD Readiness Assessment consists of 28 questions that support team engagement in a candid cross-functional discussion about PD using a common language, and the development of a shared team view to identify the elements to be strengthened or leveraged to support a PD system redesign effort.'},
            {title: 'Initiative Inventory', url: nil}
          ],
          'Deep Dive Diagnostics' =>
          [
            {title: 'End User Survey', url: nil},
            {title: 'Technology Diagnostic Product Inventories', url: nil},
            {title: 'Time Diagnostic', url: nil},
            {title: 'Financial Systems & Budget', url: nil},
            {title: 'Allocation Diagnostic', url: nil},
          ],
        },
        'Future State Visioning' => {
          'Strategic Vision Articulation' =>
          [
            {title: 'Roadmap for first 100 days of PD redesign', url: nil},
          ],
        }
     ]
    },
    { title: 'II. Implementation Planning',
      goal: 'To identify and acquire all of the resources required to fill unmet capabilities',
      categories: [
        'Change Management Planning' =>
      {
        'Internal Hiring' => [],
        'Integration/Cohesion Plan' =>
        [
          {title: 'IT Deliverables Management Guide', url: nil}
        ],
        'Communication Management & Messaging' => [],
        'Scheduling' => [],
     },
      'Procurement Process' => {
        'RFP Development' =>
        [
          {title: 'RFP Guidelines', url: nil},
          {title: 'Demand-to-Supply Framework', url: nil},
        ],
        'Initial Vendor Review' =>
        [
          {title: 'Vendor Selection Criteria', url: nil},
          {title: 'Vendor Negotiation Guidelines', url: nil},
        ],
        'Final Vendor Selection' =>
        [
          {title: 'Vendor Integration Development', url: nil},
        ],

        }
      ]
    },
    { title: 'III. Implementation Execution',
      goal: 'To execute the system change while collection and analyzing feedback',
      categories: [
        'Implementation Pilot' =>
        {
          'Labor Management Plan' => [],
          'User Feedback' => [],
          'Success Metrics' => [],
          'Course Adjusting' => [],
        },
        'Full System Rollout' =>
        {
          'User Feedback' => [],
          'Success Metrics' => [],
        }

      ]
    }



    ]
  end
end
