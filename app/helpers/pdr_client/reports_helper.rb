module PdrClient
  module ReportsHelper
    extend ActionView::Helpers::SanitizeHelper::ClassMethods
    include UsersHelper rescue false

    COL_SEP   = ','
    QUOTE_SEP = '"'

    def consensus_csv_report(consensus = {participants: [], questions: [], scores: []})
      CSV.generate(col_sep: COL_SEP, quote_char: QUOTE_SEP) do |csv_content|
        csv_content << headers(consensus[:participants])
        
        consensus["questions"].each do |question|
          participant_scores     = [question["number"].to_s, question["content"].to_s,"Score"]
          participant_evidences  = [question["number"].to_s, question["content"].to_s,"Evidence"]

          consensus["participants"].each do |participant|
           answer = score_for_participant(
              consensus["scores"],
              question["id"],
              participant["id"]
            ) 
            
            participant_scores    << (answer && answer["value"]) || ''
            participant_evidences << (answer && strip_tags(answer["evidence"])) || ''
          end

          csv_content << participant_scores
          csv_content << participant_evidences
        end
      end
    end

    def headers(participants)
      ["Question Number", "Question Text", "Type" ] + 
      participant_names_from_hash(participants)
    end

    def score_for_participant(scores, question_id, participant_id)
      return {value: '', evidence: ''} unless scores

      scores.find do |score|
        score["question_id"] == question_id && 
        score["participant"]["participant_id"] == participant_id
      end
    end

    def answer_titles
      { 
        :"1" => 'Non-Existent',
        :"2" => 'Initial',
        :"3" => 'Defined & Managed',
        :"4" => 'Optimizing'
      }
    end

    def answer_count(scores, question_id, value)
      return 0 unless scores
      scores.inject(0) do |count, score|
        next count unless score[:question_id] == question_id
        next count unless score[:value] == value
        count + 1
      end
    end

    def pdf_css_loader_helper
      Rails.application.assets.find_asset( "pdr_client.css" ).to_s
    end

    def question_score_value(question)
      return 5 if skipped_question?(question)
      return question[:score] && question[:score][:value]
    end

    private
    def participant_names_from_hash(participants)
      participants.map { |p| p["name"] }
    end

    def skipped_question?(question)
      return false unless question[:score]
      question[:score][:value].blank? &&
      !question[:score][:evidence].blank?
    end

  end
end
