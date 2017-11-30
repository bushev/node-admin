<div class="tab-pane" id="tab-seo">

  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">META tags</h3>
    </div>
    <div class="panel-body">

      <div class="row">
        <div class="col-sm-12">
          <div class="form-group">
            <label class="control-label" for="description">Meta: description</label>
            <textarea id="description" name="description" class="form-control"
                      rows="5">{{ item.description }}</textarea>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <div class="form-group">
            <label class="control-label" for="keywords">Meta: keywords</label>
            <input type="text" id="keywords" name="keywords" class="form-control" value="{{ item.keywords }}"/>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <div class="form-group">
            <label class="control-label" for="imageUrl">Meta: Image URL</label>
            <input type="text" id="imageUrl" name="imageUrl" class="form-control" value="{{ item.imageUrl }}"/>
            <span class="help-block">Optimised JPEG - 300x240</span>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
