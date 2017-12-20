<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <meta name="description" content="">

  <title>{% if pageTitle %}{{ pageTitle }}{% else %}{% endif %} {% if globalConfig and globalConfig.project and globalConfig.project.name %} | {{ globalConfig.project.name }}{% endif %}</title>

  <link href="/adminAssets/stylesheets/build.min.css?v=1" rel="stylesheet">

  <!--[if lt IE 9]>
  <script src="/adminAssets/javascripts/build_lt_ie_9_js.min.js"></script>
  <![endif]-->
</head>

<body>
{% block header %}
  <header>
    <div class="headerwrapper">
      {% include "./partials/header-left.swig" %}
      {% include "./partials/header-right.swig" %}
    </div>
  </header>
{% endblock %}
<section>
  {# Reusable components (macro) #}
  {% include "./partials/pagination-pages.swig" %}
  {% include "./partials/pagination-rows.swig" %}
  {% include "./partials/pagination-summary.swig" %}
  {% include "./partials/sorting_column.swig" %}
  {% include "./partials/sorting.swig" %}
  {% include "./partials/search.swig" %}
  {% include "./partials/search-buttons.swig" %}
  {% include "./partials/back-button.swig" %}
  {% include "./partials/anchor.swig" %}
  {% include "./partials/resource-action-buttons.swig" %}
  {% include "./partials/bulk-actions.swig" %}
  {% include "./partials/quickfilter.swig" %}
  {% include "./partials/pageheader.swig" %}
  {% include "./partials/item-select-checkbox.swig" %}
  {% include "./partials/audit-logs.swig" %}

  {% block content %}
    <div class="mainwrapper">
      <div class="leftpanel">
        {% include "./partials/profile-left.swig" %}
        <h5 class="leftpanel-title">Navigation</h5>
        {% include "./partials/left-menu-items.swig" %}
      </div>

      <div class="mainpanel">
        {% block mainpanel %}
          {% block pageheader %}{% include "./partials/pageheader.swig" %}{% endblock %}
          <div class="contentpanel">
            {% include "./partials/messages.swig" %}
            {% block pagecontent %}{% endblock %}
          </div>
        {% endblock %}
      </div>
    </div>
  {% endblock %}

</section>

<script src="/adminAssets/javascripts/build.min.js?v=1"></script>
<script src="/adminAssets/javascripts/ckeditor/ckeditor.js"></script>

{% block page_js %}{% endblock %}
{% block extra_scripts %}{% endblock %}
</body>
</html>
