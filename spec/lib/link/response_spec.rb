require 'spec_helper'

describe Link::Response do

  let(:assessment) {
    create(:assessment, :with_participants)
  }

  let(:user) {
    create(:user, :with_district)
  }

  let(:link_response) {
    Link::Response.new(assessment, user)
  }

  context 'when user is not associated' do
    before(:each) do
      allow(assessment).to receive(:participant?).and_return false
      allow(assessment).to receive(:facilitator?).and_return false
      allow(assessment).to receive(:network_partner?).and_return false
    end

    it {
      expect(link_response.execute).to eq :none
    }
  end

  context 'when user is associated' do
    context 'when user is not assigned' do
      before(:each) do
        allow(assessment).to receive(:participant?).and_return true
        allow(assessment).to receive(:assigned?).and_return false
      end

      it {
        expect(link_response.execute).to eq :none
      }
    end

    context 'when user is assigned' do
      context 'when the assessment is not fully complete' do
        context 'when the user has no responses' do
          context 'when the user is not a participant' do
            before(:each) do
              allow(assessment).to receive(:participant?).and_return false
              allow(assessment).to receive(:facilitator?).and_return true
              allow(assessment).to receive(:assigned?).and_return true
              allow(assessment).to receive(:fully_complete?).and_return false
              allow(link_response).to receive(:user_has_responses?).and_return false
            end

            it {
              expect(link_response.execute).to eq :none
            }
          end

          context 'when the user is a participant' do
            before(:each) do
              allow(assessment).to receive(:participant?).and_return true
              allow(assessment).to receive(:assigned?).and_return true
              allow(assessment).to receive(:fully_complete?).and_return false
              allow(link_response).to receive(:user_has_responses?).and_return false
            end

            it {
              expect(link_response.execute).to eq :new_response
            }
          end
        end

        context 'when the user has responses' do
          before(:each) do
            allow(assessment).to receive(:participant?).and_return true
            allow(assessment).to receive(:assigned?).and_return true
            allow(assessment).to receive(:fully_complete?).and_return false
            allow(link_response).to receive(:user_has_responses?).and_return true
          end

          it {
            expect(link_response.execute).to eq :response
          }
        end
      end

      context 'when the assessment is fully complete' do
        before(:each) do
          allow(assessment).to receive(:participant?).and_return true
          allow(assessment).to receive(:assigned?).and_return true
          allow(assessment).to receive(:fully_complete?).and_return true
        end

        it {
          expect(link_response.execute).to eq :consensus
        }
      end
    end
  end
end
