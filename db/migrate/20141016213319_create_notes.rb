class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.references :user
      t.string :picture_path
      t.text :comment
      t.string :longitude
      t.string :latitude
      t.timestamps
    end
  end
end
