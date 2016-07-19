def create_struct
  Response.find_by(id: 99).tap { |r| r.destroy if r }

  responder = Participant.create!(user: @user)
  rubric = @rubric
  response = Response.find_or_create_by!(
      responder_type: 'Assessment',
      responder: responder,
      rubric: rubric,
      id: 99)

  axis = Axis.create!(name: 'something')
  category1 = Category.create!(name: "first", axis: axis)
  category2 = Category.create!(name: "second", axis: axis)
  category3 = Category.create!(name: "third")

  3.times do |i|
    question = rubric
                   .questions
                   .create!(category: category1, headline: "headline #{i}")
    4.times do |value|
      Answer.create!(question: question, value: value+1, content: 'some content')
    end
    Score.create!(question: question, response: response, evidence: "expected", value: 1)
  end

  3.times { rubric.questions.create!(category: category2) }
  3.times { rubric.questions.create!(category: category3) }
end


def create_responses
  response1 = Response.create(
      responder_type: 'Participant',
      responder_id: @participant.id,
      submitted_at: Time.now)

  response2 = Response.create(
      responder_type: 'Participant',
      responder_id: @participant2.id,
      submitted_at: Time.now)

  category1 = Category.create(name: "Some cat1")
  category2 = Category.create(name: "Some cat2")
  category3 = Category.create(name: "Some cat3")

  question1 = @rubric.questions.create(category: category1, headline: "question1")
  question2 = @rubric.questions.create(category: category2, headline: "question2")
  question3 = @rubric.questions.create(category: category3, headline: "question3")

  Score.create(value: 1,
               response_id: response1.id,
               question: question1)

  Score.create(value: 3,
               response_id: response2.id,
               question: question2)

  Score.create(value: nil,
               response_id: response2.id,
               question: question3)
end

def create_magic_assessments
  @district = create(:district)
  @facilitator = create(:user, districts: [@district])
  @facilitator2 = create(:user, districts: [@district])
  @user = create(:user, districts: [@district])
  @user2 = create(:user, districts: [@district])
  @user3 = create(:user, districts: [@district])
  @participant = create(:participant, user: @user)
  @participant2 = create(:participant, user: @user2)
  @rubric = create(:rubric, :as_assessment_rubric, version: 98)

  3.times do |i|
    Assessment.create!(
        name: "Assessment #{i}",
        rubric: @rubric,
        participants: [],
        district: @district,
        user: @facilitator,
    )
  end

  @district2 = create(:district)
  @facilitator3 = create(:user, districts: [@district2])
  @user.update(district_ids: @user.district_ids + [@district2.id])

  @assessment_with_participants = Assessment.create!(
      name: "Assessment other",
      rubric: @rubric,
      participants: [@participant, @participant2],
      district: @district2,
      user: @facilitator2,
      facilitators: [@facilitator2],
      due_date: Time.now,
      message: 'some message',
  )
end

def expect_flush_cached_assessment
  expect_any_instance_of(Assessment).to receive(:flush_cached_version)
end
