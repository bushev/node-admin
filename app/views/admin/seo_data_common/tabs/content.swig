<div class="tab-pane" id="tab-content">

  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">Content</h3>
    </div>
    <div class="panel-body">

      <div class="row">
        <div class="col-sm-12">
          <div class="form-group">
            <label class="control-label" for="h1">H1</label>
            <input type="text" id="h1" name="h1" class="form-control" value="{{ item.h1 }}">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <div class="form-group">
            <label class="control-label" for="content1">Content #1</label>
            <textarea id="content1" name="content1" rows="6"
                      class="form-control ckeditor">{{ item.content1 }}</textarea>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <div class="form-group">
            <label class="control-label" for="content2">Content #2</label>
            <textarea id="content2" name="content2" rows="4"
                      class="form-control ckeditor">{{ item.content2 }}</textarea>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <div class="form-group">
            <label class="control-label" for="content3">Content #3</label>
            <textarea id="content3" name="content3" rows="4"
                      class="form-control ckeditor">{{ item.content3 }}</textarea>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <div class="form-group">
            <label class="control-label" for="content4">Content #4</label>
            <textarea id="content4" name="content4" rows="4"
                      class="form-control ckeditor">{{ item.content4 }}</textarea>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
