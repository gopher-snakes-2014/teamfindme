class AddVoterColumnToNotes < ActiveRecord::Migration
  def change
    add_column :notes, :voters, :string, array: true, default: []
  end
end
