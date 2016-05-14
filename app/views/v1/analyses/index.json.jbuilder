json.analyses @analyses do |analysis|
  json.partial! 'v1/analyses/analysis', analysis: analysis
  json.links Link::Analysis.new(analysis, current_user).execute
end
