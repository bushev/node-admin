{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
    {% include "../partials/pageheader.swig" with { 'pageTitle': 'Create Configuration'} %}
{% endblock %}

{% block pagecontent %}
    {% include "_form.swig" %}
{% endblock %}
