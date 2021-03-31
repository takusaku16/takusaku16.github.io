---
layout: post
title:  "Novel"
permalink: /novel/
fix: header
order: 3
---

{%- assign posts_novel = site.posts | where: "type", "novel" -%}

{% include header/parts.html posts=posts_novel type="novel" %}