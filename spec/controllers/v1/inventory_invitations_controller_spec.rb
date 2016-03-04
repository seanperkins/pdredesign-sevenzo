require 'spec_helper'

describe V1::InventoryInvitationsController do
  render_views

  describe '#create' do
    context 'without user' do
      let(:inventory) { FactoryGirl.create(:inventory) }

      before(:each) do
        sign_out :user
        post :create, inventory_id: inventory.id, format: :json
      end

      it 'requires logged in user' do
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'as non-facilitator' do
      let(:user) { FactoryGirl.create(:user) }
      let(:inventory) { FactoryGirl.create(:inventory) }

      before(:each) do
        sign_in user
        post :create, inventory_id: inventory.id, format: :json
      end

      it 'requires a facilitator to create a invite' do
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'as facilitator' do
      let(:inventory) { FactoryGirl.create(:inventory, :with_facilitators) }
      let(:facilitator_user) { inventory.facilitators.first.user }
      let(:email) { 'john_doe@gmail.com' }

      context 'inviting user for second time' do
        let(:existing_invitation) { FactoryGirl.create(:inventory_invitation, inventory: inventory) }

        before(:each) do
          sign_in facilitator_user
          post :create,
            inventory_id: inventory.id,
            first_name: 'john',
            last_name: 'doe',
            email: existing_invitation.email,
            team_role: 'Finance',
            role: 'facilitator', format: :json
        end

        it 'returns error status code' do
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it 'returns error message' do
          expect(json["errors"]["email"]).to include("User has already been invited")
        end
      end

      context 'inviting user for first time' do

        let(:created_invitation) { InventoryInvitation.where(email: email).first }

        shared_examples 'successful_invitation' do
          it 'responds successfully' do
            expect(response).to have_http_status(:success)
          end

          it 'creates an invitation' do
            expect(created_invitation).not_to be_nil
          end

          it 'sets inventory in invitation' do
            expect(created_invitation.inventory).to eq inventory
          end

          it 'sets invitation first_name' do
            expect(created_invitation.first_name).to eq 'john'
          end

          it 'sets invitation last_name' do
            expect(created_invitation.last_name).to eq 'doe'
          end

          it 'sets invitation team_role' do
            expect(created_invitation.team_role).to eq 'Finance'
          end

          it 'sets invitation role' do
            expect(created_invitation.role).to eq 'facilitator'
          end
        end

        context 'without send_invite' do
          before(:each) do
            sign_in facilitator_user
            post :create,
              inventory_id: inventory.id,
              first_name: 'john',
              last_name: 'doe',
              email: email,
              team_role: 'Finance',
              role: 'facilitator', format: :json
          end

          it 'ignores invitation notification' do
            expect(InventoryInvitationNotificationWorker.jobs.count).to eq(0)
          end
          it_behaves_like 'successful_invitation'
        end

        context 'with send_invite' do
          before(:each) do
            sign_in facilitator_user
            post :create,
              inventory_id: inventory.id,
              first_name: 'john',
              last_name: 'doe',
              email: email,
              team_role: 'Finance',
              role: 'facilitator',
              send_invite: true, format: :json
          end

          it 'sends invitation notification' do
            expect(InventoryInvitationNotificationWorker.jobs.count).to eq(1)
          end

          it_behaves_like 'successful_invitation'
        end
      end
    end
  end
end
