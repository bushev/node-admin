<div class="tab-pane active" id="mainProps">

  <h4>Basic info</h4>

  <div class="row">
    <div class="col-sm-12">

      <div class="form-group">
        <label class="col-md-2 control-label" for="webhookEventId">Event</label>

        <div class="col-md-5">
          <select class="form-control input-md" id="webhookEventId" name="webhookEventId" required>
            <option selected disabled value="">Choose One</option>
            {% for event in webhookevents %}
              <option value="{{ event.id }}"
                      {% if item.webhookEventId == event.id %}selected{% endif %}>{{ event.name }}</option>
            {% endfor %}
          </select>
        </div>
      </div>

      <div class="form-group">
        <label class="col-md-2 control-label" for="url">Webhook URL</label>
        <div class="col-md-5">
          <input id="url" name="url" type="text" value="{{ item.url }}" class="form-control input-md">
        </div>
      </div>


    </div>
  </div>

</div>
