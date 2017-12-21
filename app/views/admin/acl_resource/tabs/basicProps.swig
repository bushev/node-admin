<div class="tab-pane active" id="tab-basic">

  <h4>Basic info</h4>

  <div class="row">

    <div class="form-group">
      <label class="col-sm-4 control-label">Resource Name</label>

      <div class="col-sm-4">
        <input type="text" class="form-control" name="name" placeholder="Enter Resource Name"
               value="{{ item.name }}" required autofocus>
      </div>
    </div>

    <div class="form-group">
      <label class="col-sm-4 control-label">Resource Actions</label>

      <div class="col-sm-4">

        <div class="acl_actions_input_fields_wrap">

          <button class="acl_actions_add_field_button btn btn-primary btn-sm">
            <i class="fa fa-plus" aria-hidden="true"></i> Add More
          </button>

          {% if not item.actions %}
            {% set item.actions = [''] %}
          {% endif %}

          {% for action in item.actions %}

            <div class="input-group">
              <input type="text" class="form-control" name="actions[]" value="{{ action }}">
              <span class="input-group-btn">
                  <button class="remove_field btn btn-danger btn-sm" type="button">
                    <i class="fa fa-times" aria-hidden="true"></i> Remove
                  </button>
                </span>
            </div>

          {% endfor %}

        </div>

      </div>
    </div>

  </div>

</div>
