---
layout: post
title:  "Tech"
permalink: /tech/
fix: header
order: 2
---

{%- assign posts_tech  = site.posts | where: "type", "tech"  -%}

{% include header/parts.html posts=posts_tech  type="tech"  %}
