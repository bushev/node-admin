{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
  {{ pageheader({title: 'PUSH notifications history'}) }}
{% endblock %}

{% block pagecontent %}

  <div class="row">
    <div class="col-sm-3 col-md-3 col-lg-3">
      {#<p>#}
      {#<a href="{{ createActionUrl }}" class="btn btn-success btn-block btn-create-msg">Create New</a>#}
      {#</p>#}

      <div class="search-filters">
        {{ search() }}

        <br>

        {% include './partials/search-by-status.swig' %}
        {{ searchByPushNotificationStatus() }}

        {% include './partials/search-by-platform.swig' %}
        {{ searchByPushNotificationPlatform() }}

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
            {{ sorting_column({title: 'Status', field: 'status'}) }}
          </div>
        </div>

        {% for item in items %}
          {% set viewActionUrl = baseUrl + '/' + item.id %}
          {% set deleteActionUrl = baseUrl + '/' + item.id + '/delete' %}

          <div class="list-group-item">

            {{ item_select_checkbox() }}

            <div class="list-group-item-body">
              <div class="pull-right media-option">
                <small>{{ moment(item.createdAt).utcOffset(utcOffset).calendar() }}</small>
                {{ resource_action_buttons({viewActionUrl: viewActionUrl, deleteActionUrl: deleteActionUrl}) }}
              </div>

              <a href="{{ viewActionUrl }}">
                <h4 class="sender">
                  {{ item.alert }}
                </h4>
              </a>

              {% if item.status === 'error' %}
                <br>
                <pre>{{ item.error }}</pre>
              {% endif %}

              <p class="help-block text-right">
                {% if item.status === 'success' %}
                  <span class="label label-success">Success</span>
                {% elseif item.status === 'error' %}
                  <span class="label label-danger">Error</span>
                {% endif %}

                {% if item.platform === 'ios' %}
                  <span class="label label-success">iOS</span>
                {% elseif item.platform === 'android' %}
                  <span class="label label-danger">Android</span>
                {% endif %}
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
