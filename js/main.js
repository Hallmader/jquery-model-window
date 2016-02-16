$(function() {
    var test = new Model();

    $("#model-ctrl1").click(function() {
        test.alert({
            width: 800,
            height: 500,
            hasMask: true,
            hasCloseBtn: true,

            maskShowStyle: {
                method: 'slide',
                speed: 500
            },
            maskHideStyle: {
                method: 'slide',
                speed: 500
            },
            modelShowStyle: {
                method: 'slide',
                speed: 500
            },
            modelHideStyle: {
                method: 'slide',
                speed: 500
            },

            content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est sint ad sunt, voluptatem eaque aperiam similique ratione at, id, eos consectetur dolorem nobis excepturi aspernatur? Saepe tenetur, fugit placeat quia!",
            title: "我是标题喵",
            text4AlertBtn: "ok",
            handler4AlertBtn: function() {
                console.log('我被点击了');
            },
            isDraggable:true,
            draggablePart:".model-header",
            closeBtnConfig:{
                color: "#058",
                fontSize: "21px",
                bgc:"#fff",
                width:"25px",
                height:"25px",
                LH:"25px",
                br:"50%"
            }
        });
    });

    $("#model-ctrl2").click(function() {
        test.confirm({
            width: 800,
            height: 500,
            hasMask: true,
            hasCloseBtn: true,

            maskShowStyle: {
                method: 'slide',
                speed: 500
            },
            maskHideStyle: {
                method: 'slide',
                speed: 500
            },
            modelShowStyle: {
                method: 'slide',
                speed: 500
            },
            modelHideStyle: {
                method: 'slide',
                speed: 500
            },

            content: "你确定要关闭吗QAQ？",
            title: "我是标题喵",
            text4ConfirmBtn: "确定",
            text4CancelBtn: "取消",
            handler4ConfirmBtn: function() {
                console.log('确定');
            },
            handler4CancelBtn: function() {
                console.log('取消');
            }
        });
    });

    $("#model-ctrl3").click(function() {
        test.prompt({
            width: 800,
            height: 500,
            hasMask: true,
            hasCloseBtn: true,

            maskShowStyle: {
                method: 'slide',
                speed: 500
            },
            maskHideStyle: {
                method: 'slide',
                speed: 500
            },
            modelShowStyle: {
                method: 'slide',
                speed: 500
            },
            modelHideStyle: {
                method: 'slide',
                speed: 500
            },

            isInputPassWord:true,
            defaultInputText:"喵？",
            placeHolderText:"你想说什么呢？",
            title: "我是标题喵",

            text4PromptBtn:"确定",
            handler4PromptBtn:function(){
            	console.log('已提交。');
            }
        });
    });

    $("#model-ctrl4").click(function() {
        test.common({
            width: 800,
            height: 500,
            hasMask: true,
            hasCloseBtn: true,

            maskShowStyle: {
                method: 'show',
                speed: 500
            },
            maskHideStyle: {
                method: 'hide',
                speed: 500
            },
            modelShowStyle: {
                method: 'show',
                speed: 500
            },
            modelHideStyle: {
                method: 'hide',
                speed: 500
            },

            content: "测试页面",
            handler4CloseBtn: function() {
                console.log('我被关闭了');
            }
        });
    });
});
