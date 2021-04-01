---
layout: page
title:  "Tech"
permalink: /tech/
fix: header
order: 2
---

{%- assign _str = "" -%}
{%- assign _str = _str | append: ", jekyll" -%}
{%- assign _str = _str | append: ", 麻雀" -%}

{%- assign _posts = site.posts | where: "type", "tech" -%}
{%- assign _categories = _str | split: ", " -%}

{% include header/parts.html posts=_posts categories=_categories %}