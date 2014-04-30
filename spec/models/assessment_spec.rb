require 'spec_helper'

describe Assessment do
  context 'validations' do
    it { should validate_presence_of :name }
    it { should validate_presence_of :rubric_id }
    it { should validate_presence_of :district_id }

    context ':assigned_at' do
      before do
        @assessment = Assessment.new(assigned_at: Time.now)
      end

      it 'requires :due_date when assigned_at is present' do
        expect(@assessment.valid?).to eq(false) 
        expect(@assessment.errors[:due_date])
          .to include("can\'t be blank")

        @assessment.assigned_at = nil
        @assessment.valid?
        expect(@assessment.errors[:due_date])
          .to eq([])
      end

      it 'requires :due_date when assigned_at is present' do
        expect(@assessment.valid?).to eq(false) 
        expect(@assessment.errors[:message])
          .to include("can\'t be blank")

        @assessment.assigned_at = nil
        @assessment.valid?
        expect(@assessment.errors[:message])
          .to eq([])
      end

      context '#assignable?' do
        it 'requires participants when assigned' do
          participant = Participant.new(user_id: 1)

          expect(@assessment.valid?).to eq(false) 
          expect(@assessment.errors[:participant_ids])
            .to include("You must assign participants to this assessment.")

          @assessment.participants = [participant]
          @assessment.valid?
          expect(@assessment.errors[:participant_ids])
            .to eq([])

        end
      end
    end
  end

  context '#completed?' do
    before { @assessment = Assessment.new }
    it 'is completed' do
      allow(@assessment).to receive(:percent_completed)
        .and_return(100)
      expect(@assessment.completed?).to eq(true)
    end

    it 'is not completed' do 
      allow(@assessment).to receive(:percent_completed)
        .and_return(99)
      expect(@assessment.completed?).to eq(false)
    end
  end

  context 'status' do
    before { @assessment = Assessment.new }

    it 'is draft when not assigned' do
      allow(@assessment).to receive(:assigned_at).and_return(nil) 
      expect(@assessment.status).to eq(:draft)
    end

    it 'is consensus when response is present' do
      allow(@assessment).to receive(:assigned_at)
        .and_return(true) 

      allow(@assessment).to receive(:response)
        .and_return(true) 

      expect(@assessment.status).to eq(:consensus)
    end

    it 'is assessment when response is not present' do
      allow(@assessment).to receive(:assigned_at)
        .and_return(true) 

      allow(@assessment).to receive(:response)
        .and_return(false) 

      expect(@assessment.status).to eq(:assessment)
    end
  end

  context 'with data' do
    before { create_magic_assessments }

    context '#assessments_for_user' do
      it 'returns a facilitator users assessments' do
        records = Assessment.assessments_for_user(@user)
        expect(records.count).to eq(4)
      end

      it 'returns only assigned assessments for member' do
        @user.update(role: :member)
        records = Assessment.assessments_for_user(@user)

        expect(records.count).to eq(1)
        expect(records.first.name).to eq('Assessment other')
      end
    end

    context 'with response' do
      before do 
        @response = Response
          .create(responder_type: 'Participant', 
        responder: @participant)
      end

      context '#participant_response' do
        it 'returns the participants submitted responses' do
          expect(@assessment_with_participants
            .participant_responses
            .count).to eq(0)

          @response.update(submitted_at: Time.now)

          expect(@assessment_with_participants
            .participant_responses
            .count).to eq(1)
        end
      end

      context '#participants_not_responded' do
        it 'returns the participants that have not responded' do
          expect(@assessment_with_participants
            .participants_not_responded
            .count).to eq(2)

          @response.update(submitted_at: Time.now)

          expect(@assessment_with_participants
            .participants_not_responded
            .count).to eq(1)
        end
      end

      context '#participants_viewed_report' do
        it 'gets users who have viewed the report' do
          expect(@assessment_with_participants
            .participants_viewed_report
            .count).to eq(0)

          @participant.update(report_viewed_at: Time.now)

          expect(@assessment_with_participants
            .participants_viewed_report
            .count).to eq(1)
        end
      end

      context '#percent_completed' do

      end
    end
  end

end
