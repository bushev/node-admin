<div class="tab-pane active" id="tab-basic">

  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">Basic info</h3>
    </div>
    <div class="panel-body">

      <div class="row">
        <div class="col-sm-3">
          <div class="form-group">
            <label class="control-label" for="timeZone">Time Zone</label>
            <select id="timeZone" name="timeZone" class="form-control">
              {% for timezone in timezones %}
                <option value="{{ timezone.name }}" {% if loggedUser.timeZone === timezone.name %}selected{% endif %}>
                  {{ timezone.name }} ({{ timezone.offset }})
                </option>
              {% endfor %}
            </select>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>