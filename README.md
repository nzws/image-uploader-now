# image-uploader-now

> Upload images to s3 easily using ZEIT Now, Lambda and Tinypng.

![Imgur](https://i.imgur.com/Cjb8HLx.png)

## Features

- tinypng で圧縮して S3 にアップロード
- markdown ですぐにコピー
- クリップボードからの画像ペースト、ファイル D&D、ファイル選択ダイアログでアップロード可能
  > クリップボード、ファイル D&D は枠の中で有効
- アップロード履歴
- directory slug
- ZEIT Now と Lambda でタダ運用

## Required

- ZEIT Account
- Tinypng API Key
- S3 keys
- GitHub Account
- GitHub oauth keys
  > Callback URL is: https://<domain>/oauth/callback

## How to build

- Clone this repo.
- Set secret keys.

```bash
now secrets add uploader_bucket_name "<s3 bucket name>"
now secrets add uploader_bucket_endpoint "<s3 endpoint>"
now secrets add uploader_bucket_url "<s3 url e.g. https://files.example.com/>"
now secrets add uploader_bucket_key "<s3 key>"
now secrets add uploader_bucket_secret "<s3 secret>"
now secrets add uploader_tinify_token "<tinypng token>"
now secrets add uploader_github_client_id "<github client id>"
now secrets add uploader_github_client_secret "<github client secret>"
now secrets add uploader_github_user_id "<your user id e.g. 14953122>"
```

- Run `now`.
