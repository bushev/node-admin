{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
  {{ pageheader({title: 'Queue Archieve'}) }}
{% endblock %}

{% block pagecontent %}

  <div class="row">
    <div class="col-sm-3 col-md-3 col-lg-2">

      {{ search() }}

      <br/>

    </div>

    <div class="col-sm-9 col-md-9 col-lg-10">
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
            {{ sorting_column({title: 'Completed', field: 'ended'}) }}
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

                {% if item.status === 'complete' %}
                  <div class="label label-success">complete</div>
                {% elseif item.status === 'failed' %}
                  <div class="label label-danger">failed</div>
                {% endif %}

                {{ resource_action_buttons({deleteActionUrl: deleteActionUrl}) }}
              </div>

              <a href="{{ viewActionUrl }}">
                <h4 class="sender">
                  {{ item.queue }} - {{ item.name }}
                </h4>
              </a>

              {% if item.status === 'failed' %}
                <pre class="text-danger">{{ item.error.toString() }}</pre>
                <pre>{{ item.stack.toString() | replace('\\n', '<br>', 'g') | raw }}</pre>
              {% endif %}

              <p>
                <small>{{ moment(item.ended).utcOffset(utcOffset).calendar() }}</small>
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