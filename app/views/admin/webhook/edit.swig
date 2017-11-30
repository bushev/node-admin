{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
  {{ pageheader({title: 'Webhook Management - Edit Webhook', showSaveButton: true, showCloseButton: true}) }}
{% endblock %}

{% block pagecontent %}
  {% include "_form.swig" %}
{% endblock %}
