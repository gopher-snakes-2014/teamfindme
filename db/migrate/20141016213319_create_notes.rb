class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.references :user
      t.attachment :image
      t.text :comment
      t.float :longitude
      t.float :latitude
      t.timestamps
    end
  end
end
