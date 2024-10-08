# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Article.create({title: '新しい記事です', content: '素晴らしい記事です。これは。'})
# Article.create({title: 'スラ橋い記事です', content: 'ほんとだよ。これは。'})

john = User.create!(email: 'john@example.com', password: 'password')
emily = User.create!(email: 'emily@example.com', password: 'password')

5.times do
  john.articles.create!(
    title: Faker::Lorem.sentence(word_count: 5),
    content: Faker::Lorem.sentence(word_count: 100)
  )
end

5.times do
  emily.articles.create!(
    title: Faker::Lorem.sentence(word_count: 5),
    content: Faker::Lorem.sentence(word_count: 100)
  )
end
