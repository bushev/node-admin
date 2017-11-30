{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
  {{ pageheader({title: 'API Keys Management - Create API Key', showSaveButton: true, showCloseButton: true}) }}
{% endblock %}

{% block pagecontent %}
  {% include "_form.swig" %}
{% endblock %}
