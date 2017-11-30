{% extends '../layout.swig' %}

{% block title %}Edit SEO data {{ item.id }} {% endblock %}

{% block pageheader %}
  {{ pageheader({title: 'Manage SEO - edit data', showSaveButton: true, showCloseButton: true}) }}
{% endblock %}

{% block pagecontent %}
  {% include '_form.swig' %}
{% endblock %}

{% block page_js %}

{% endblock %}
