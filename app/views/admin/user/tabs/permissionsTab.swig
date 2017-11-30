<div class="tab-pane" id="tab-permissions">

  <h4>User permissions</h4>

  <div class="row">
    <div class="col-sm-12">

      <div class="form-group">
        <label class="col-md-2 control-label" for="roles">Roles</label>

        <div class="col-md-9">
          <select class="form-control user-roles-select" id="roles" name="roles" multiple style="width:100%">
            {% for role in roles %}
              <option value="{{ role.name }}" {% if item.roles.indexOf(role.name) !== -1 %}selected{% endif %}>
                {{ role.name }}
              </option>
            {% endfor %}
          </select>
        </div>
      </div>

    </div>
  </div>
</div>
