---
layout: post
title:  "Diary"
permalink: /diary/
fix: header
order: 1
---

{%- assign posts_diary = site.posts | where: "type", "diary" -%}

{% include header/parts.html posts=posts_diary type="diary" %}