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