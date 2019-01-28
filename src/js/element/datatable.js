import '../../assets/plugins/datatables/css/jquery.dataTables.min.css'
import '../_common/core.min.js'
import '../../assets/plugins/datatables/js/jquery.dataTables.min.js'

import '../_common/common.js'

$('#dataTable').buildTable({
	serverSide:false,
	pageLength:2,
	ordering:true,
	data:[
		{name:'31231',id:'523234234234'},
		{name:'31232',id:'523234234235'},
		{name:'31233',id:'523234234236'},
		{name:'31234',id:'523234234237'},
	],
	columns:[
		{
			title:'名称',
			data:'name',
		},
		{
			title:'ID',
			data:'id'
		}
	]
})
