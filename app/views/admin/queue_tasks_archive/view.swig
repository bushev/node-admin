{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
  {{ pageheader({title: 'Queue Management - View Task (archived)', showCloseButton: true}) }}
{% endblock %}

{% block pagecontent %}
  <div class="row">
    <pre>
      {{ item | json(2) }}
    </pre>
  </div>

{% endblock %}