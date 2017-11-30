{% extends '../layout.swig' %}

{% block title %}Create SEO data{% endblock %}

{% block pageheader %}
  {{ pageheader({title: 'Manage SEO - create data', showSaveButton: true, showCloseButton: true}) }}
{% endblock %}

{% block pagecontent %}
  {% include '_form.swig' %}
{% endblock %}

{% block page_js %}

{% endblock %}
