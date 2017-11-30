<div class="tab-pane active" id="mainProps">

    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Basic info</h3>
        </div>
        <div class="panel-body">

            <div class="row">
                <div class="col-sm-12">
                    <div class="form-group">
                        <label class="control-label" for="user_id">User</label>

                        <select class="form-control" id="userId" name="userId" required>
                            <option>-- Select one</option>
                            {% for user in users %}
                            <option value="{{ user.id }}"
                                    {% if item.userId== user.id %}selected{% endif %}>{{ user.fullName }}
                            </option>
                            {% endfor %}
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="control-label" for="apiKey">API Key</label>
                        <input type="text" id="apiKey" name="apiKey" class="form-control" value="{{ item.apiKey }}"
                               disabled/>
                    </div>

                    <div class="form-group">
                        <label class="control-label" for="apiKey">Active</label>
                        <select class="form-control" id="active" name="active" required>
                            <option value="true" {% if !item._id || item.active %}selected{% endif %}>Yes</option>
                            <option value="false" {% if item.active === false %}selected{% endif %}>No</option>
                        </select>
                    </div>

                </div>
            </div>

        </div>
    </div>

</div>
