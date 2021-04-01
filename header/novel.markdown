---
layout: page
title:  "Novel"
permalink: /novel/
fix: header
order: 3
---

{%- assign _str = "" -%}
{%- assign _str = _str | append: ", 蒼" -%}
{%- assign _str = _str | append: ", 赤" -%}

{%- assign _posts = site.posts | where: "type", "novel" -%}
{%- assign _categories = _str | split: ", " -%}

{% include header/parts.html posts=_posts categories=_categories %}