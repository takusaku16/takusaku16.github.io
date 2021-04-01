---
layout: page
title:  "Diary"
permalink: /diary/
fix: header
order: 1
---

{%- assign _str = "" -%}
{%- assign _str = _str | append: ", 2021/04" -%}
{%- assign _str = _str | append: ", 2021/03" -%}

{%- assign _posts = site.posts | where: "type", "diary" -%}
{%- assign _categories = _str | split: ", " -%}

{% include header/parts.html posts=_posts categories=_categories %}