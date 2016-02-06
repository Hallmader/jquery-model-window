;
(function($) {
    var Widget = function() {
        this.modelBox;
    };
    Widget.prototype = {
        on: function(type, handler) {
            if (typeof(this.handlers[type] === "undefined")) {
                this.handlers[type] = [];
            }
            this.handlers[type].push(handler);
        },
        update: function(type, data) {
            if (this.handlers[type] instanceof(Array)) {
                var handlers = this.handlers[type];
                for (var i = 0, len = handlers.length; i < len; i++) {
                    handlers[i](data);
                }
            }
        },
        renderUI: function() {},
        bindUI: function() {},
        syncUI: function() {},
        destory: function() {},
        render: function(container) {
            this.renderUI();
            this.handlers = [];
            this.bindUI();
            this.syncUI();
            $(container || document.body).append(this.modelBox);
        }
    };
    var Model = function() {
        this.config = {
            //窗体宽高度
            width: 800,
            height: 500,
            //是否有遮罩阴影/关闭按钮
            hasMask: true,
            hasCloseBtn: true,
            //遮罩显示/隐藏方式
            maskShowStyle: {
                method: 'slide',
                speed: 500
            },
            maskHideStyle: {
                method: 'slide',
                speed: 500
            },
            //窗体显示/隐藏方式
            modelShowStyle: {
                method: 'show',
                speed: 500
            },
            modelHideStyle: {
                method: 'hide',
                speed: 500
            },
            //窗体内容区内容，标题内容
            content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est sint ad sunt, voluptatem eaque aperiam similique ratione at, id, eos consectetur dolorem nobis excepturi aspernatur? Saepe tenetur, fugit placeat quia!",
            title: "我是标题喵",
            //prompt输入框是否密码形式，默认内容，占位内容
            isInputPassWord: true,
            defaultInputText: "喵？",
            placeHolderText: "你想说啥",
            //各窗口按钮内容
            text4AlertBtn: "ok",
            text4ConfirmBtn: "确定",
            text4CancelBtn: "取消",
            text4PromptBtn: "确定",
            //各窗口按钮回调函数
            handler4PromptBtn: function() {},
            handler4ConfirmBtn: function() {},
            handler4CancelBtn: function() {},
            handler4AlertBtn: function() {},
            handler4CloseBtn: function() {},
            //是否可拖动，是否指定拖动区域
            isDraggable: true,
            draggablePart: ".model-header",
            //关闭按钮样式配置
            closeBtnConfig: {
                color: "#058",
                fontSize: "21px",
                bgc: "#fff",
                width: "25px",
                height: "25px",
                LH: "25px",
                br: "50%"
            }
        };
    };
    Model.prototype = $.extend({}, new Widget(), {
        renderUI: function() {
            var btnContent = '';
            switch (this.config.modelType) {
                case "alert":
                    btnContent = "<button class='model-alertBtn'>" +
                        this.config.text4AlertBtn + "</button>";
                    break;
                case "confirm":
                    btnContent = "<button class='model-confirmBtn'>" +
                        this.config.text4ConfirmBtn +
                        "</button>" +
                        "<button class='model-cancelBtn'>" +
                        this.config.text4CancelBtn +
                        "</button>";
                    break;
                case "prompt":
                    this.config.content = "<input type='" +
                        (this.isInputPassword ? "password" : "text") +
                        "' placeholder='" +
                        this.config.placeHolderText +
                        "' maxlength='" +
                        this.config.maxLength +
                        "'>";
                    btnContent = "<button class='model-promptBtn'>" +
                        this.config.text4PromptBtn +
                        "</button>";
                    break;
            }


            this.modelBox = $("<div class='model-box'>" +
                "<div class='model-body'>" +
                this.config.content +
                "</div>" +
                "</div>");
            if (this.config.modelType !== 'common') {
                this.modelBox.prepend("<div class='model-header'>" + this.config.title + "</div>");
                this.modelBox.append("<div class='model-footer'>" + btnContent + "</div>");
            }
            if (this.config.hasCloseBtn) {
                this.closeBtn = $("<span class='model-closeBtn'>X</span>");
                this.closeBtn.appendTo(this.modelBox);
            }
            if (this.config.hasMask) {
                this.mask = $("<div class='model-mask'></div>");
                this.mask.appendTo('body');
            }

            this.promptInputBox = this.modelBox.find('.model-body input');
        },
        syncUI: function() {
            this.modelBox.css({
                width: this.config.width + "px",
                height: this.config.height + "px",
                left: (this.config.x || (window.innerWidth - this.config.width) / 2),
                top: (this.config.y || (window.innerHeight - this.config.height) / 2)
            });
            if (this.config.hasMask) {

                if (this.config.maskShowStyle) {
                    switch (this.config.maskShowStyle.method) {
                        case "show":
                            this.mask.css('opacity', 0);
                            this.mask.animate({
                                opacity: 1
                            }, this.config.maskShowStyle.speed);
                            break;
                        case "slide":
                            this.mask.hide();
                            this.mask.slideDown(this.config.maskShowStyle.speed);
                            break;
                        default:
                            this.mask.show();
                            break;
                    }
                } else {
                    this.mask.show();
                }
            }
            switch (this.config.modelShowStyle.method) {
                case "show":
                    this.modelBox.css('opacity', 0);
                    this.modelBox.animate({
                        opacity: 1
                    }, this.config.modelShowStyle.speed);
                    break;
                case "slide":
                    this.modelBox.hide();
                    this.modelBox.slideDown(this.config.modelShowStyle.speed);
                    break;
                default:
                    this.modelBox.show();
                    break;
            }

            if (this.config.isDraggable) {
                this.modelBox.draggable();
                if (this.config.draggablePart) {
                    this.modelBox.draggable({
                        handle: this.config.draggablePart
                    });
                }
                this.config.isDraggable = false;
            }

            this.closeBtn.css({
                color: this.config.closeBtnConfig.color,
                fontSize: this.config.closeBtnConfig.size,
                backgroundColor: this.config.closeBtnConfig.bgc,
                width: this.config.closeBtnConfig.width,
                height: this.config.closeBtnConfig.height,
                lineHeight: this.config.closeBtnConfig.LH,
                borderRadius: this.config.closeBtnConfig.br
            });
        },
        bindUI: function() {
            var that = this;

            this.modelBox.on('click', '.model-closeBtn', function() {
                that.update('close');
                that.destory();
            }).on('click', '.model-alertBtn', function() {
                that.update('alert');
                that.destory();
            }).on('click', '.model-confirmBtn', function() {
                that.update('confirm');
                that.destory();
            }).on('click', '.model-cancelBtn', function() {
                that.update('cancel');
                that.destory();
            }).on('click', '.model-promptBtn', function() {
                that.update('prompt');
                that.destory();
            });
            if (this.config.handler4CloseBtn) {
                this.on('close', this.config.handler4CloseBtn);
            }
            if (this.config.handler4AlertBtn) {
                this.on('alert', this.config.handler4AlertBtn);
            }
            if (this.config.handler4ConfirmBtn) {
                this.on('confirm', this.config.handler4ConfirmBtn);
            }
            if (this.config.handler4CancelBtn) {
                this.on('cancel', this.config.handler4CancelBtn);
            }
            if (this.config.handler4PromptBtn) {
                this.on('prompt', this.config.handler4PromptBtn);
                this.modelBox.removeClass('prompt-box');
            }
        },
        destory: function() {
            var that = this;

            if (this.config.hasMask) {
                switch (this.config.maskHideStyle.method) {
                    case "hide":
                        this.mask.animate({
                            opacity: 0,
                        }, this.config.maskHideStyle.speed, function() {
                            this.remove();
                        });
                        break;
                    case "slide":
                        this.mask.slideUp(this.config.maskHideStyle.speed, function() {
                            this.remove();
                        });
                        break;
                    default:
                        this.mask.remove();
                        break;
                }
            }

            switch (this.config.modelHideStyle.method) {
                case "hide":
                    this.modelBox.animate({
                        opacity: 0,
                    }, this.config.modelHideStyle.speed, function() {
                        this.remove();
                    });
                    break;
                case "slide":
                    this.modelBox.slideUp(this.config.modelHideStyle.speed, function() {
                        this.remove();
                    });
                    break;
                default:
                    this.modelBox.remove();
                    break;
            }
        },
        common: function(config) {
            $.extend(true, this.config, config, {
                modelType: "common"
            });
            this.render();
            return this;
        },
        alert: function(config) {
            $.extend(true, this.config, config, {
                modelType: "alert"
            });
            this.render();
            return this;
        },
        confirm: function(config) {
            $.extend(true, this.config, config, {
                modelType: "confirm"
            });
            this.render();
            return this;
        },
        prompt: function(config) {
            $.extend(true, this.config, config, {
                modelType: "prompt",
                promptText: "",
            });
            this.render();
            this.promptInputBox.focus();
            this.modelBox.addClass('prompt-box');
            return this;
        }
    });
    window.Model = Model;
})(jQuery);
