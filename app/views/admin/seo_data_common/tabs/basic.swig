<div class="tab-pane active" id="tab-basic">

  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">Basic information</h3>
    </div>
    <div class="panel-body">

      <div class="row">
        <div class="col-sm-12">
          <div class="form-group">
            <label class="control-label" for="title">Title</label>
            <input type="text" id="title" name="title" class="form-control" value="{{ item.title }}"/>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <div class="form-group">
            <label class="control-label" for="subDomain">Sub-domain</label>
            <input type="text" id="subDomain" name="subDomain" class="form-control" value="{{ item.subDomain }}"/>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <div class="form-group">
            <label class="control-label" for="url">URL</label>
            <input type="text" id="url" name="url" class="form-control" value="{{ item.url }}" required>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <div class="form-group">
            <label class="control-label" for="published">Published</label>
            <input type="checkbox" id="published" name="published" {% if item.published %}checked{% endif %}/>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
