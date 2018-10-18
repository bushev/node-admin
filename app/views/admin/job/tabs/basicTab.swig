<div class="tab-pane active" id="tab-basic">

  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">Basic info</h3>
    </div>
    <div class="panel-body">

      <div class="row">
        <div class="col-sm-12">
          <div class="form-group">
            <label class="control-label" for="name">Name</label>
            <input type="text" id="name" name="name" class="form-control" value="{{ item.name }}" required/>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-3">
          <div class="form-group">
            <label class="control-label" for="workerName">Worker</label>
            <input type="text" id="workerName" name="workerName" class="form-control" value="{{ item.workerName }}"
                   required/>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="form-group">
            <label class="control-label" for="commandName">Command</label>
            <input type="text" id="commandName" name="commandName" class="form-control" value="{{ item.commandName }}"
                   required/>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="form-group">
            <label class="control-label" for="priority">Priority</label>
            <input type="number" id="priority" name="priority" class="form-control" value="{{ item.priority }}"/>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="form-group">
            <label class="control-label" for="enabled">Enabled</label>
            <input type="checkbox" name="enabled" id="enabled" {% if item.enabled %}checked{% endif %}>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-9">
          <div class="form-group">
            <label class="control-label" for="schedule">Schedule</label>
            <input type="text" id="schedule" name="schedule" class="form-control" value="{{ item.schedule }}"/>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="form-group">
            <label class="control-label" for="ttl">TTL (ms)</label>
            <input type="number" id="ttl" name="ttl" class="form-control" value="{{ item.ttl }}"/>
          </div>
        </div>
      </div>

      {% set dummyArr = [1, 2, 3, 4] %}

      {% for dummy in dummyArr %}
        {% if item.params[loop.index0] %}
          {% set param = item.params[loop.index0] %}
          {% set paramName = param.name %}
          {% set paramValue = param.value %}
        {% else %}
          {% set paramName = '' %}
          {% set paramValue = '' %}
        {% endif %}
        <div class="row">
          <div class="col-sm-6">
            <div class="form-group">
              <label class="control-label" for="name1">Param</label>
              <input type="text" id="name1" name="params[{{ loop.index0 }}][name]" class="form-control"
                     value="{{ paramName }}"/>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <label class="control-label" for="value1">Value</label>
              <input type="text" id="value1" name="params[{{ loop.index0 }}][value]" class="form-control"
                     value="{{ paramValue }}"/>
            </div>
          </div>
        </div>
      {% endfor %}

    </div>
  </div>

</div>
