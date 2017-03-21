var $ = function(e) {
	return document.querySelector(e);
}

// 文本框获得焦点时显示输入提示信息
function render(field) {
	field.nextElementSibling.style.display = "block";
}

// 验证用户名是否有效
function userValidate(user) {
	var infoArr = user.value.split(''), len = 0;
	for(var i = 0;i<infoArr.length;i++) {
		if(infoArr[i].charCodeAt() > 0x00 && infoArr[i].charCodeAt() < 0xff){
			len++;
		} else {
			len +=2;
		}
	}
	if(formRequired(user)) {
		var reg = len >= 4 && len <= 16,
			trueText = "名称格式正确",
			falseText = "名称格式错误";
		if(isValidate(user,reg,trueText,falseText)) {
			return true;
		}
	}
}

// 验证邮箱是否有效
function emailValidate(email) {
	if(formRequired(email)) {
		var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-]+)+$/.test(email.value),
			trueText = "邮箱格式正确",
			falseText = "邮箱格式错误";
		if(isValidate(email,reg,trueText,falseText)) {
			return true;
		}
	}
}

// 验证密码是否有效
function pwdValidate(pwd) {
	if(formRequired(pwd)) {
		var reg = pwd.value.length >= 6 && pwd.value.length <= 20,
			trueText = "密码可用",
			falseText = "密码不可用";
		if(isValidate(pwd,reg,trueText,falseText)) {
			return true;
		}
	}
}

// 验证第二次密码是否与第一次一致
function repwdValidate(repwd) {
	if(formRequired(repwd)) {
		var reg = repwd.value == $("#pwd").value,
			trueText = "密码输入一致",
			falseText = "密码输入不一致";
		if(isValidate(repwd,reg,trueText,falseText)) {
			return true;
		}
	}
}

// 验证手机号码是否有效
function phoneValidate(phone) {
	if(formRequired(phone)) {
		var reg = /^1[3|4|5|7|8]\d{9}/.test(phone.value),
			trueText = "手机格式正确",
			falseText = "手机格式错误";
		if(isValidate(phone,reg,trueText,falseText)) {
			return true;
		}
	}
}

// 根据有效性做出相应的提示
function isValidate(field,reg,trueText,falseText) {
	if(reg) {
		field.nextElementSibling.innerHTML = trueText;
		field.nextElementSibling.style.color = "#26af26";
		field.style.borderColor = "#26af26";
		return true;
	} else {
		field.nextElementSibling.innerHTML = falseText;
		field.nextElementSibling.style.color = "#f00";
		field.style.borderColor = "#f00";
		return false;
	}
}

// 判断必填项是否为空
function formRequired(field) {
	if(field.value == null || field.value == "") {
		field.nextElementSibling.innerHTML = field.previousElementSibling.innerHTML + "不能为空";
		field.nextElementSibling.style.display = "block";
		field.nextElementSibling.style.color = "#f00";
		field.style.borderColor = "#f00";
		return false;
	}
	return true;
}

// 点击提交时，验证整个表单是否有效
function formValidate() {
	if(formRequired($("#username")) && userValidate($("#username")) && formRequired($("#pwd")) && pwdValidate($("#pwd")) && formRequired($("#repwd")) && repwdValidate($("#repwd")) && formRequired($("#email")) && emailValidate($("#email")) && formRequired($("#phone")) && phoneValidate($("#phone"))) {
		alert("提交成功");
	} else {
		alert("提交失败");
	}
}