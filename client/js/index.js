// 當文件都下載完後執行
$(document).ready(function() {

    var deleteData = function(id) {
        // 刪除資料
        $.get("http://127.0.0.1:1337/delete/" + id, function(data, status) {
            console.log(data);

            // 對 #query 執行 click
            $('#query').click();
        });
    };


    $('#query').on('click', function() {
        // 查詢資料
        $.get("http://127.0.0.1:1337/query", function(data, status) {

            $('tbody').empty();

            for (var i in data) {

                // 宣告需要的DOM元件
                $tdIndex = $('<td>').text(+i + 1);
                $tdName = $('<td id="n_' + data[i]._id + '">').html("<span>" + data[i].name + '</span>' + "<input type='hidden' value='" + data[i].name + "'/>");
                $tdPrice = $('<td id="p_' + data[i]._id + '">').html("<span>" + data[i].price + '</span>' + "<input type='hidden' value='" + data[i].price + "'/>");
                $tdCount = $('<td id="c_' + data[i]._id + '">').html("<span>" + data[i].count + '</span>' + "<input type='hidden' value='" + data[i].count + "'/>");

                $btnUpdate = $('<button>').attr('class', 'btn btn-primary')
                    .text('修改').attr('data-id', data[i]._id);
                $btnDel = $('<button>').attr('class', 'btn btn-primary')
                    .text('刪除').attr('data-id', data[i]._id);

                $btnUpdate.on('click', function(data) {
                    var id = $(this).attr("data-id");
                    var goodsname = $("#n_" + id).children().last().val();
                    var goodsprice = $("#p_" + id).children().last().val();
                    var goodscount = $("#c_" + id).children().last().val();
                    $.post('http://127.0.0.1:1337/update', { 'id': id, 'name': goodsname, 'price': goodsprice, 'count': goodscount });
                    console.log("ff");
                });

                $tdName.on('click', function() {
                    $(this).children().first().hide();
                    $(this).children().last().attr("type", "text");

                })
                $tdPrice.on('click', function() {
                    $(this).children().first().hide();
                    $(this).children().last().attr("type", "text");

                })
                $tdCount.on('click', function() {
                    $(this).children().first().hide();
                    $(this).children().last().attr("type", "text");

                })

                // 定義刪除按鈕的函式
                $btnDel.on('click', function() {
                    var id = $(this).attr('data-id');
                    deleteData(id);
                })

                // 宣告 tr
                $tr = $('<tr>').append($tdIndex)
                    .append($tdName)
                    .append($tdPrice)
                    .append($tdCount)
                    .append($btnUpdate)
                    .append($btnDel);

                // 將 tr 插入到 tbody
                $('tbody').append($tr);
            }

        });
    });
});