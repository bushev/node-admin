{% macro pageheader(options) %}
  <div class="pageheader">
    <div class="media">
      <div class="pageicon pull-left">
        <i class="fa fa-home"></i>
      </div>
      <div class="list-group-item-body">
        <ul class="breadcrumb">
          <li><a href="/"><i class="glyphicon glyphicon-home"></i></a></li>
          <li><a href="/admin">Admin</a></li>
          <li>{{ options.title }}</li>
        </ul>
        <h5 class="pull-left">{% if options.title %}{{ options.title }}{% else %}Blank Page{% endif %}</h5>

        <div class="pull-right">
          {% if options.showImportButton %}
            <a href="{{ importActionUrl }}" class="btn btn-default">Import</a>
          {% endif %}

          {% if options.showExportButton %}
            <a href="{{ exportActionUrl }}" class="btn btn-default">Export</a>
          {% endif %}

          {% if options.showSaveButton %}
            <a class="btn btn-default" href="#" onclick="javascript:save('save');">Save</a>
            <a class="btn btn-default" href="#" onclick="javascript:save('save&CreateAnother');">
              Save & Create Another
            </a>
            <a class="btn btn-primary" href="#" onclick="javascript:save('save&Close');">Save & Close</a>
          {% endif %}

          {% if options.showEditButton %}
            <a href="{{ editActionUrl }}" class="btn btn-default">Edit</a>
          {% endif %}

          {% if options.showCloseButton %}
            <a href="{{ cancelActionUrl }}" class="btn btn-link">
              {% if options.cancelButtonText %}
                {{ options.cancelButtonText }}
              {% else %}
                Close
              {% endif %}
            </a>
          {% endif %}
        </div>
      </div>
    </div>
  </div>

  <script>
    function save(action) {
      $('form[name=itemForm]').append('<input type="hidden" name="saveAction" value="' + action + '">');
      $('form[name=itemForm]').submit()
    }
  </script>
{% endmacro %}