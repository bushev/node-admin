{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
  {{ pageheader({title: 'Audit logs'}) }}
{% endblock %}

{% block pagecontent %}

  <div class="row">
    <div class="col-sm-3 col-md-3 col-lg-2">
      <div class="search-filters">
        {{ search() }}
        <br/>

        {% include './partials/search-by-resource.swig' %}
        {{ auditLoggingSearchByResource() }}

        {% include './partials/search-by-action.swig' %}
        {{ auditLoggingSearchByAction() }}

        {% include './partials/search-by-user-id.swig' %}
        {{ auditLoggingSearchByUserId() }}

        {% include './partials/search-by-resource-id.swig' %}
        {{ auditLoggingSearchByResourceId() }}

        {% include './partials/search-by-date-range.swig' %}
        {{ auditLoggingSearchByDateRange() }}

        {{ search_buttons() }}
      </div>
      {#<pre>{{ filters | json(2) }}</pre>#}
      {#<pre>{{ filtersData | json(2) }}</pre>#}
    </div>

    <div class="col-sm-9 col-md-9 col-lg-10">
      <div class="msg-header">
        <div class="pull-right">
          <h5 class="sm-title text-right">{{ pagination_summary() }}</h5>
          {{ pagination_pages() }}
        </div>
      </div>

      <div class="list-group media-list msg-list">
        <div class="list-group-item list-group-sorting">
          <div class="">
            Sort by:
            {{ sorting_column({title: 'Timestamp', field: 'createdAt'}) }}
          </div>
        </div>

        {% for item in items %}
          {% set viewActionUrl = baseUrl + '/' + item.id %}
          {% set deleteActionUrl = baseUrl + '/' + item.id + '/delete' %}

          <div class="list-group-item">

            <div class="list-group-item-body">

              <div class="pull-right media-option">
                <small>{{ moment(item.createdAt).utcOffset(utcOffset).calendar() }}</small>
                {{ resource_action_buttons({deleteActionUrl: deleteActionUrl}) }}
              </div>

              <h4 class="sender">
                <a href="{{ viewActionUrl }}">
                  {{ item.resource }}
                </a>
                was {{ item.action }}
              </h4>
              <span>
                By: {{ item.userId.fullName }}, resourceId: {{ item.resourceId.toString() }}
              </span>

              {% if item.diff.length > 0 %}
                {% set diff = JSON.parse(item.diff) %}

                <div class="table-responsive">
                  <table class="table table-condensed">
                    <thead>
                    <tr>
                      <th>Field</th>
                      <th>From</th>
                      <th>To</th>
                    </tr>
                    </thead>
                    <tbody>

                    {% for d in diff %}
                      <tr>
                        <td>{{ d.name }}</td>
                        <td>
                          <div class="data-value">
                            <pre>{{ d.from | json(2) }}</pre>
                          </div>
                        </td>
                        <td>
                          <div class="data-value">
                            <pre>{{ d.to | json(2) }}</pre>
                          </div>
                        </td>
                      </tr>
                    {% endfor %}

                    </tbody>
                  </table>
                </div>
              {% endif %}

              <div>
                <strong>{{ item.message }}</strong>
              </div>
              <p>
                {% if item.isAdmin %}
                  <span class="label label-success">Admin</span>
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