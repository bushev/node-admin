{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
  {{ pageheader({title: 'Jobs'}) }}
{% endblock %}

{% block pagecontent %}

  <div class="row">
    <div class="col-sm-3 col-md-3 col-lg-3">
      <p>
        <a href="{{ createActionUrl }}" class="btn btn-success btn-block">Create New</a>
      </p>
      <p>
        <a href="{{ baseUrl }}/schedule" class="btn btn-default btn-block">Reschedule all</a>
      </p>

      <div class="search-filters">
        {{ search() }}

        <br>

        {% include './partials/search-by-enabled-status.swig' %}
        {{ searchByJobEnabledStatus() }}

        {{ search_buttons() }}
      </div>
    </div>

    <div class="col-sm-9 col-md-9 col-lg-9">
      <div class="msg-header">
        <div class="pull-right">
          <h5 class="sm-title text-right">{{ pagination_summary() }}</h5>
          {{ pagination_pages() }}
        </div>

        {{ bulk_actions({check: true, bulkDelete: true}) }}
      </div>

      <div class="list-group media-list msg-list">
        <div class="list-group-item list-group-sorting">
          <div class="">
            Sort by:
            {{ sorting_column({title: 'Created', field: 'createdAt'}) }}
            {{ sorting_column({title: 'Priority', field: 'priority'}) }}
            {{ sorting_column({title: 'Worker', field: 'workerName'}) }}
            {{ sorting_column({title: 'Command', field: 'commandName'}) }}
            <span class="pull-right" style="font-weight: 400; padding-top: 5px">
              <strong>{{ jobsScheduled }}</strong> jobs scheduled
            </span>
          </div>
        </div>

        {% for item in items %}
          {% set editActionUrl = baseUrl + '/' + item.id + '/edit' %}
          {% set viewActionUrl = baseUrl + '/' + item.id %}
          {% set deleteActionUrl = baseUrl + '/' + item.id + '/delete' %}

          <div class="list-group-item">

            {{ item_select_checkbox() }}

            <div class="list-group-item-body">
              <div class="pull-right media-option text-right">
                <small>{{ moment(item.createdAt).utcOffset(utcOffset).calendar() }}</small>
                {{ resource_action_buttons({viewActionUrl: viewActionUrl, editActionUrl: editActionUrl, deleteActionUrl: deleteActionUrl}) }}
                <p class="help-block text-right">
                  {% if item.enabled %}
                    <span class="label label-success">Enabled</span>
                  {% else %}
                    <span class="label label-default">Disabled</span>
                  {% endif %}
                  {% if item.scheduled %}
                    <span class="label label-success">Scheduled</span>
                  {% endif %}
                </p>
              </div>

              <a href="{{ viewActionUrl }}">
                <h4 class="sender">
                  {{ item.name }} | priority: {{ item.priority }} | ttl: {{ item.ttl }}
                </h4>
              </a>

              <p style="font-family: 'Courier New'; font-weight: 600">
                {{ item.schedule }} - {{ item.workerName }} - {{ item.commandName }}
              </p>

            </div>
          </div>
        {% endfor %}

      </div>

      <div class="list-group-footer">
        <div class="pull-right">
          {{ pagination_rows() }}
        </div>
        <div class="pull-left">
          {{ pagination_pages() }}
        </div>
      </div>

    </div>

  </div>

{% endblock %}