<div class="tab-pane active" id="project-tab">

  <h4>Project information</h4>

  <div class="form-group">
    <label class="col-sm-3 control-label" for="projectName">Project name</label>

    <div class="col-sm-9">
      <input type="text" name="projectName" id="projectName" class="form-control" value="{{ item.project.name }}"/>
    </div>
  </div>

  <div class="form-group">
    <label class="col-sm-3 control-label" for="projectConfig">Project config</label>

    <div class="col-sm-9">
      <textarea rows="20" name="projectConfig" id="projectConfig"
                class="form-control">{{ item.project.projectConfig }}</textarea>
    </div>
  </div>

</div>
