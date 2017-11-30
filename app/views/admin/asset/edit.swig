{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
  {{ pageheader({title: 'Assets Management - Edit Asset', showSaveButton: true, showCloseButton: true}) }}
{% endblock %}

{% block pagecontent %}
  {% include "_form.swig" %}
{% endblock %}
