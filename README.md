# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, unll: false, unique: true|
|mail|string|null: false|

### Association
- has_many :groups, through: :members
- has_many :members
- has_many :messages
- has_many :groups_users

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|index: true, unll: false, unique: true|
|member_id|integer|null: false, foreign_key: true|

### Association
- has_many :messages
- belongs_tp :user
- has_many : groups_users

## messageテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|index: true, unll: false, unique: true|
|image|string|index: true, unll: false, unique: true|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_tp :group
- belongs_tp :user

## memberテーブル

|Column|Type|Options|
|------|----|-------|
|text|text|index: true, unll: false, unique: true|

### Association
- belongs_tp :user
