{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
  {{ pageheader({title: 'ACL Management - View Resource', showEditButton: true, showCloseButton: true}) }}
{% endblock %}

{% block pagecontent %}

  <pre>{{ item | json(2) }}</pre>

{% endblock %}

