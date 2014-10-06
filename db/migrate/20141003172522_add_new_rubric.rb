class AddNewRubric < ActiveRecord::Migration
  def create_first_question(rubric)
    category = Category.find_by(name: "PD Process")
    question = rubric.questions.create!(category: category,
      headline: "Use Student Feedback",
      content:  "To what extent does feedback from students about their educational experience inform teacher PD?") 
    answers = ["No feedback is collected from students about their educational experience.",
               "Some feedback is collected from students about their educational experience, but PD adjustments based on feedback are not occurring.",
               "Feedback is collected from students about their educational experience, and PD adjustments based on feedback are emerging.",
               "Feedback is collected from students about their educational experience, and PD adjustments based on feedback are responsive and intentional."]
    answers.each_with_index do |answer, index|
      Answer.create!(question: question, value: index+1, content: answer)
    end
  end


  def create_second_question(rubric)
    category = Category.find_by(name: "Leadership Capacity")
    question = rubric.questions.create!(category: category,
      headline: "Principal Input/Ownership",
      content:  "To what extent are principals involved in the development and design of district/school PD offerings?") 
    answers = ["Principals are not (or are seldom) engaged in the design and development of PD offerings at the school/district levels.",
               "Principals are inconsistently engaged in the design and development of PD offerings at the school/district levels.",
               "Principals are consistently engaged in the design and development of PD offerings at the school/district levels.",
               "Principals have formalized* roles in the design and development of PD offerings at the school/district levels.<br/><br/>*Formalized=Part of the way a school/district does business, ingrained in their policies and practices. Continues even if changes in leadership or management occur."]
    answers.each_with_index do |answer, index|
      Answer.create!(question: question, value: index+1, content: answer)
    end
  end

  def reorder_questions(rubric)
    order = [ "Teacher Input/Ownership",
      "Empowered Teachers",
      "Collective/Team Development",
      "Effective Teachers",
      "Identify PD Needs",
      "Personalized PD",
      "Access Multiple PD Models",
      "Use Continuous Feedback",
      "Use Student Feedback",
      "Vision",
      "Instructional Leadership",
      "Principal Input/Ownership",
      "Change Management",
      "Communication",
      "PD Amount",
      "PD Financial Management",
      "Resource Allocation System",
      "PD Resource Utilization",
      "Common Core State Standards",
      "Policy Support",
      "Ease of Access",
      "PD Digital Platform Capability",
      "Network Availability",
      "Data Capture",
      "Data Access",
      "CCSS Alignment",
      "CCSS Implementation",
      "Quality PD Content Availability",
      "PD Content Consumption",
      "PD Content Efficacy"]

    order.each_with_index do |headline, index|
      question = Question.find_by(headline: headline)
      if question
        question.update(order: index)
      else
        binding.pry
        puts "Cant find question #{headline}"
      end
    end
  end

  def up
    ActiveRecord::Base.transaction do
      return if Rails.env.test?
      
      rubric           = Rubric.create!(version: 4.0)
      rubric.questions = Rubric.find_by(version: 1.0).questions

      create_first_question(rubric)
      puts "created first question"

      create_second_question(rubric)
      puts "created second question"

      reorder_questions(rubric)
      puts "reordered questions"

    end
  end

  def down
    Rubric.find_by(version: 4.0).destroy
    Question.find_by(headline: "Use Student Feedback").destroy
    Question.find_by(headline: "Principal Input/Ownership").destroy
  end
end
