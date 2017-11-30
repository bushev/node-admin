<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <meta name="description" content="">

  <title>Asset picker</title>

  <link href="/adminAssets/stylesheets/build.min.css" rel="stylesheet">

  <!--[if lt IE 9]>
  <script src="/adminAssets/javascripts/build_lt_ie_9_js.min.js"></script>
  <![endif]-->
</head>

<body>
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
    </div>

    <div class="list-group media-list msg-list">
      <div class="list-group-item list-group-sorting">
        <div class="">
          Sort by:
          {{ sorting_column({title: 'Name', field: 'name'}) }}
        </div>
      </div>

      {% for item in items %}

        <div class="list-group-item">

          <div class="list-group-item-body">

            <div class="pull-right media-option">
              &nbsp;
            </div>

            <a href="#">
              <h4 class="sender">
                {{ item.name }}
              </h4>
            </a>

            {% if item.cdnUrl %}
              <p>
                <a href="{{ item.cdnUrl }}" target="_blank">
                  {{ item.cdnUrl }}
                </a>
              </p>
            {% endif %}

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

<script src="/adminAssets/javascripts/build.min.js"></script>
<script src="/adminAssets/javascripts/ckeditor/ckeditor.js"></script>

<script src="/javascripts/admin_build.js"></script>
<link rel="stylesheet" type="text/css" href="/stylesheets/admin_build.css">

</body>
</html>