class AddNewQuestionsForAnalysis < ActiveRecord::Migration
  def up
    axis = Axis.create!(name: 'Data & Tech Analysis')
    category = Category.create!(name: 'Data & Tech Analysis Category', axis: axis)
    build_questions(category)
  end

  def down
    headlines_and_content.each { |entry|
      question = Question.where(headline: entry[0], content: entry[1]).first
      question.try(:answers).try(:destroy_all)
      question.try(:destroy!)
    }
    Category.where(name: 'Data & Tech Analysis Category').first.try(:destroy!)
    Axis.where(name: 'Data & Tech Analysis').first.try(:destroy!)
    Rubric.where(name: 'Data & Tech Analysis Rubric').first.try(:destroy!)
  end

  private
  def build_questions(category)
    rubric = Rubric.create!(name: 'Data & Tech Analysis Rubric', version: 1, enabled: true, tool_type: Analysis.to_s)
    headlines_and_content.each_with_index { |entry, idx|
      question = Question.create!(headline: entry[0],
                                  order: idx,
                                  content: entry[1],
                                  category: category,
                                  rubrics: [rubric])
      build_blank_answers(question)
    }
  end

  def build_blank_answers(question)
    (1..4).each { |score_value|
      Answer.create!(value: score_value, question: question)
    }
  end

  def headlines_and_content
    headlines = [
        'Established a Shared Vision for PD',
        'Identify PD Needs',
        'Personalize PD Plan',
        'Access Multi-Modal PD Models',
        'Develop Teaching Practice',
        'Build Collective Capacity',
        'Build School Community',
        'Manage Talent',
        'Observe and Evaluate Teachers',
        'Evaluate PD Resources',
        'Improve PD Program'
    ]

    content = [
        'PD programs are developed based on a shared vision for teaching and learning.',
        'Teacher PD needs are identified based on a clear, common framework for effectiveness.',
        'Teacher PD plans are personalized in terms of prioritization, content, and timing to meet identified PD needs.',
        'Teachers easily access multiple delivery modes to meet identified PD needs, including: coaching, workshops, lectures, videos, peer collaboration, live, online, 1:1, small group, whole group',
        'Teachers engage in PD that helps them develop their practice by setting goals, collaborating with coaches and peers, and applying what they learn in the classroom.',
        'Teachers have opportunities to lead or engage in peer learning such as mentoring, coaching, PLCs or other networks.',
        'Teachers build relationships with students, colleagues, and families for support and informal collaboration.',
        'Teachers are hired, trained, and assigned based on school priorities and receive ongoing compensation and development.',
        'Teachers receive actionable instructional coaching and feedback on their performance.',
        'PD resources are continuously evaluated based on teacher satisfaction, usage data, and impact on effectiveness.',
        'PD programs are evaluated for effectiveness and fidelity of implementation, with support for improvements as needed.'
    ]

    headlines.zip content
  end
end
