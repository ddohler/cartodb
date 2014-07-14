  cdb.admin.MetadataDialog = cdb.admin.BaseDialog.extend({

    events: function() {
      return _.extend({},cdb.admin.BaseDialog.prototype.events,{
          //'click ul.instances li a' : '_onInstanceClick',
          //'click a.year_paid':        '_onYearPaidClick'
      });
    },

    initialize: function() {
      //_.bindAll(this, "_setInstance", "_onYearPaidClick", "_onInstanceClick");

      // Extend options
      _.extend(this.options, {
        title: 'Table metadata',
        description: '',
        width: 490,
        clean_on_hide: true,
        template_name: 'common/views/metadata_dialog_base',
        ok_title: 'Save settings',
        ok_button_classes: 'button grey',
        modal_class: 'metadata_dialog'
      });

      this.constructor.__super__.initialize.apply(this);

    },

    /**
     * Render the content for the create dialog
     */
    render_content: function() {

      _.each(this.options.tags, function(li) {
        this.$el.find("ul").append("<li>" + li + "</li>");
      }, this);

      this.$el.find("ul").tagit({
        allowSpaces: true,
        onSubmitTags: function(ev,tagList) {
          self.$el.find("a.ok").click();
        }
      });

      return false;
    },

    /**
     *  Hide the dialog
     */
    ok: function() {

      if(this.options.onResponse) {

        var title       = this.$('input[name="title"]').val();
        var source      = this.$('input[name="source"]').val();
        var description = this.$('textarea').val();

        var tags = _.map(this.$("ul li .tagit-label"), function(tag) { return $(tag).text() });

        this.options.onResponse(title, description, source, tags);

      }

      this.hide();

    },


    /**
     *  Hide the dialog
     */
    hide: function() {
      var self = this;

      this.$el.find(".modal").animate({
        marginTop: "50px",
        opacity: 0
      },300, function() {
        if(self.options.clean_on_hide) {
          self.clean();
        }
      });
      this.$el.find(".mamufas").fadeOut(300);
      this.trigger("closedDialog", this , this);
    }
  });