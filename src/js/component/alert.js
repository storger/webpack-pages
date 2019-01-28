import '../_common/core.min.js'
import '../_common/common.js'

$(function(){
	$('#msgSuccess').click(function(){
		Msg.success('success');
	});
	$('#msgAlert').click(function(){
		Msg.alert('alert');
	})
	$('#msgWarning').click(function(){
		Msg.warning('warning');
	})
	$('#msgDanger').click(function(){
		Msg.error('error');
	})
})