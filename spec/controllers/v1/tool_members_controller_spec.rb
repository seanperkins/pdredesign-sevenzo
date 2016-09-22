require 'spec_helper'

describe V1::ToolMembersController do
  render_views
  before(:each) do
    request.env['HTTP_ACCEPT'] = 'application/json'
  end

  describe 'POST #create' do
    context 'when the user is not authenticated' do
      before(:each) do
        sign_out :user

        post :create, tool_member: {tool_type: 'Assessment', tool_id: 1, role: 0, user_id: 1}
      end

      it {
        is_expected.to respond_with(:unauthorized)
      }
    end

    context 'when the user is authenticated' do
      context 'when the user is a participant on the tool' do
        let(:user) {
          create(:user)
        }

        let(:candidate) {
          create(:user)
        }

        let(:tool) {
          create(:assessment)
        }


        let!(:tool_member) {
          create(:tool_member, :as_participant, tool: tool, user: user)
        }

        before(:each) do
          sign_in user
          post :create, tool_member: {tool_type: 'Assessment',
                                      tool_id: tool.id,
                                      role: ToolMember.member_roles[:participant],
                                      user_id: candidate.id}
        end

        it {
          is_expected.to respond_with(:forbidden)
        }
      end

      context 'when the user is a facilitator on the tool' do
        let(:user) {
          create(:user)
        }

        let(:candidate) {
          create(:user)
        }

        let(:tool) {
          create(:assessment)
        }

        let!(:tool_member) {
          create(:tool_member, :as_facilitator, tool: tool, user: user)
        }

        context 'when the entity to be created is valid' do
          before(:each) do
            sign_in user
            post :create, tool_member: {tool_type: 'Assessment',
                                        tool_id: tool.id,
                                        role: ToolMember.member_roles[:participant],
                                        user_id: candidate.id}
          end

          it {
            is_expected.to respond_with(:created)
          }

          it {
            expect(ToolMember.where(tool: tool, user: candidate).size).to eq 1
          }
        end

        context 'when the entity to be created already exists' do
          let!(:preexisting_candidate_membership) {
            create(:tool_member, :as_participant, tool: tool, user: candidate)
          }

          before(:each) do
            sign_in user
            post :create, tool_member: {tool_type: 'Assessment',
                                        tool_id: tool.id,
                                        role: ToolMember.member_roles[:participant],
                                        user_id: candidate.id}
          end

          it {
            is_expected.to respond_with :bad_request
          }

          it {
            expect(json['errors']['role'][0]).to eq 'has already been taken'
          }
        end
      end
    end
  end

  describe 'GET #show' do
    context 'when the user is not authenticated' do
      before(:each) do
        sign_out :user

        get :show, tool_type: 'assessment', tool_id: 1
      end

      it {
        is_expected.to respond_with(:unauthorized)
      }
    end

    context 'when the user is authenticated' do
      let(:user) {
        create(:user)
      }

      let(:tool) {
        create(:assessment)
      }

      context 'when the passed tool name is invalid' do
        let!(:participant_user) {
          create(:tool_member, :as_participant, tool: tool, user: user)
        }

        before(:each) do
          sign_in user
          get :show, tool_type: 'i_do_not_exist', tool_id: tool.id
        end

        it {
          is_expected.to respond_with(:ok)
        }

        it {
          expect(json.length).to eq 0
        }
      end

      context 'when the passed tool name is valid' do
        context 'when the user is a participant on the tool' do
          let!(:participant_user) {
            create(:tool_member, :as_participant, tool: tool, user: user)
          }

          before(:each) do
            sign_in user
            get :show, tool_type: 'assessment', tool_id: tool.id
          end

          it {
            is_expected.to respond_with(:ok)
          }

          it {
            expect(json.length).to eq 1
          }
        end

        context 'when the user is a facilitator on the tool' do
          context 'when the user is not also a participant' do
            let!(:facilitator_user) {
              create(:tool_member, :as_facilitator, tool: tool, user: user)
            }

            before(:each) do
              sign_in user
              get :show, tool_type: 'assessment', tool_id: tool.id
            end

            it {
              is_expected.to respond_with(:ok)
            }

            it {
              expect(json.length).to eq 0
            }
          end

          context 'when the user is also a participant' do
            let!(:facilitator_user) {
              create(:tool_member, :as_facilitator, tool: tool, user: user)
            }

            let!(:participant_user) {
              create(:tool_member, :as_participant, tool: tool, user: user)
            }

            before(:each) do
              sign_in user
              get :show, tool_type: 'assessment', tool_id: tool.id
            end

            it {
              is_expected.to respond_with(:ok)
            }

            it {
              expect(json.length).to eq 1
            }
          end
        end
      end
    end
  end
end