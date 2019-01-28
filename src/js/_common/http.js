// 获取项目路径
const getRootPath = ()=>{
	let curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： proj/meun.jsp
    let pathName = window.document.location.pathname;
    let pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    let localhostPath = curWwwPath.substring(0, pos);
    //获取带"/"的项目名，如：/proj
    let projectName = pathName.substring(0, pathName.substr(1).indexOf("/") + 1);
    return localhostPath + projectName;
}
// 自定义ajax请求
const customAjax = (option) => {
	let deferred = $.Deferred();
	$.ajax({
		url:Config.baseurl + option.url,
		type: option.type || 'post',
		data: option.data || {},
		dataType: option.dataType || 'json',
		contentType: option.contentType,
		beforeSend: function(XMLHttpRequest) {},
		success: function(data) {
            if(data.success){
                deferred.resolve(data)   
            }else{
                deferred.reject(data.message);
            }
        },
        error: function(err) {
            deferred.reject('网络错误，请重试');
        }
	});
	return deferred.done(data => {
		Msg.success(data.message);
	}).fail(err => {
		Msg.error(data.message);
	})
}
exports.default = {
	get:(url, data) => customAjax({
		url: url,
        type: 'get',
        data: data,
        contentType: '',
	}),
	post:(url, data) => customAjax({
		url: url,
        data: JSON.stringify(data),
        contentType:'application/json'
	})
}