<div class="tab-pane active" id="mainProps">

  <h4>Basic info</h4>

  <div class="row">
    <div class="col-sm-5">
      <div class="form-group">
        <label class="control-label" for="workerName">Worker</label>
        <input type="text" id="workerName" name="workerName" class="form-control" autofocus required/>
      </div>
    </div>
    <div class="col-sm-5">
      <div class="form-group">
        <label class="control-label" for="commandName">Command</label>
        <input type="text" id="commandName" name="commandName" class="form-control" required/>
      </div>
    </div>
    <div class="col-sm-2">
      <div class="form-group">
        <label class="control-label" for="priority">Priority</label>
        <input type="text" id="priority" name="priority" class="form-control" value="{{ item.priority }}"/>
      </div>
    </div>
  </div>

  {% set dummyArr = [1, 2, 3, 4] %}

  {% for dummy in dummyArr %}
    <div class="row">
      <div class="col-sm-6">
        <div class="form-group">
          <label class="control-label" for="name1">Param</label>
          <input type="text" id="name1" name="params[{{ loop.index0 }}][name]" class="form-control"/>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="form-group">
          <label class="control-label" for="value1">Value</label>
          <input type="text" id="value1" name="params[{{ loop.index0 }}][value]" class="form-control"/>
        </div>
      </div>
    </div>
  {% endfor %}
</div>
