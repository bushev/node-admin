{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
  {{ pageheader({title: 'Robots - View robot', showEditButton: true, showCloseButton: true}) }}
{% endblock %}

{% block pagecontent %}
  <div class="row">
    <div class="col-md-12">
      <pre>{{ item | json(2) }}</pre>
    </div>
  </div>
{% endblock %}
