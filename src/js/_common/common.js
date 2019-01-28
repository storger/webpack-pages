$(function(){
	$(".loader").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
});

$.fn.extend({
	/**
	 *datatables 表格
	 *
	 * @param {*} options
	 * @returns datatable对象
	 */
	buildTable: function(options) {
		var defaults = {
			destroy: true, // 摧毁现有结构。重新创建新的datatable
			serverSide: true,
			autoWidth: false, // 自适应宽度
			stateSave: false, // 保存状态到cookie ******很重要 ，
			// 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性设置为true就可避免了
			paging: true, // 是否使用分页
			searching: false,
			lengthChange: false, // 是否启用设置每页显示记录数
			pageLength: 10, // 默认每页显示的记录数
			scrollCollapse: false, // 指定适当的时候缩起滚动视图
			ordering: false, // 是否使用排序
			//"bJQueryUI": false, //页面风格使用jQuery.
			//"sPaginationType": "full_numbers", //分页样式
			processing: true,
			language: {
				sLengthMenu: '&nbsp;&nbsp;&nbsp;&nbsp;每页显示 _MENU_ 条',
				sZeroRecords: '抱歉，没有找到',
				sEmptyTable: '抱歉，没有找到',
				sInfo: '显示 _START_ 到 _END_ 条　共 _TOTAL_ 条',
				sInfoEmpty: '没有记录',
				sInfoFiltered: '(从 _MAX_ 条数据中检索)',
				sProcessing: '正在加载中...',
				sSearch: '搜索：',
				oPaginate: {
					sFirst: '首页',
					sPrevious: '上页',
					sNext: '下页',
					sLast: '末页'
				}
			}
		};
		options = $.extend(true, {}, defaults, options);
		return this.DataTable(options);
	},
	/**
	 *table 全选和反选方法，点击行选中
	 *
	 * @param {*} allcheck 全选按钮id
	 */
	tableSelect: function(allcheck) {
		var table = this;
		$(allcheck).on('change', function() {
			var checkAll = $(this).prop('checked');
			table.find('input[class="check"]').prop('checked', checkAll);
		});
		this.on('change', '.check', function() {
			var length1 = table.find('tbody .check').length;
			var length2 = table.find('tbody .check:checked').length;
			$(allcheck).prop('checked', length1 === length2 ? true : false);
		});
	}
})