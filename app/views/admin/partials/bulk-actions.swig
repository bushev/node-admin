{% macro bulk_actions(options) %}
  <div class="pull-left bulk-actions">
    <h5 class="sm-title">Bulk Actions</h5>

    {% if options.check %}
      <button class="btn btn-white tooltips check-all" type="button" data-toggle="tooltip"
              data-original-title="Check All">
        <i class="fa fa-check"></i>
      </button>
    {% endif %}

    {% if options.bulkDelete %}
      <form action="{{ bulkDeleteActionUrl }}" method="post" class="bulk-delete-form" style="display: inline">
        <button class="btn btn-white tooltips bulk_delete" type="submit" data-toggle="tooltip"
                data-original-title="Delete">
          <i class="fa fa-trash-o"></i>
        </button>
      </form>
    {% endif %}

    {% if options.bulkEdit %}
      <form action="{{ bulkEditActionUrl }}" method="post" class="bulk-delete-form" style="display: inline">
        <button class="btn btn-white tooltips bulk_edit" type="submit" data-toggle="tooltip"
                data-original-title="Edit all search results">
          <i class="fa fa-edit"></i>
        </button>
      </form>
    {% endif %}

    {% if false %}
      <button class="btn btn-white tooltips" type="button" data-toggle="tooltip"
              data-original-title="Edit only the checked resources">
        <i class="fa fa-check-square-o"></i>
      </button>

      <div class="btn-group">
        <button data-toggle="dropdown" class="btn btn-white dropdown-toggle tooltips" type="button"
                data-original-title="Categorize">
          <i class="fa fa-folder"></i>
        </button>
        <ul class="dropdown-menu pull-right">
          <li><a href="#"><i class="fa fa-folder mr5"></i> Category 1</a></li>
          <li><a href="#"><i class="fa fa-folder mr5"></i> Category 2</a></li>
          <li><a href="#"><i class="fa fa-folder mr5"></i> Category 3</a></li>
          <li><a href="#"><i class="fa fa-folder mr5"></i> Category 4</a></li>
        </ul>
      </div>
      <div class="btn-group">
        <button data-toggle="dropdown" class="btn btn-white dropdown-toggle tooltips" type="button"
                data-original-title="Tag">
          <i class="fa fa-tag"></i>
        </button>
        <ul class="dropdown-menu pull-right">
          <li><a href="#"><i class="fa fa-tag mr5"></i> Tag 1</a></li>
          <li><a href="#"><i class="fa fa-tag mr5"></i> Tag 2</a></li>
          <li><a href="#"><i class="fa fa-tag mr5"></i> Tag 3</a></li>
        </ul>
      </div>
    {% endif %}
  </div>
{% endmacro %}
