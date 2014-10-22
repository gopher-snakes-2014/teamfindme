class AddVoterColumnToNotes < ActiveRecord::Migration
  def change
    add_column :notes, :voters, :integer, array: true, default: []
  end
end
