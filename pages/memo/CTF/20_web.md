---
layout: page
title: web
toc: true
---

## web

- SQLインジェクション
- クロスサイトスクリプティング

### SQLインジェクション
```sql
SELECT * FROM users WHERE name = 't' OR 't' = 't';
```

OR以降が必ず true になる。入力を直接SQLに利用している場合、このように意図しないSQLをユーザーが指定出来てしまう。

### クロスサイトスクリプティング
