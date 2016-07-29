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