	function hideSignup() {
		document.getElementById("signupContainer").style.display = " none ";
		document.getElementById("loginError").style.display = " none ";
		document.getElementById("signupCode").style.display = " none ";
		document.getElementById("loginContainer").style.display = " block ";
	}

	function hideLogin() {
		document.getElementById("loginContainer").style.display = " none ";
		document.getElementById("signupError").style.display = " none ";
		document.getElementById("signupContainer").style.display = " block ";
	}

	function edit() {
		document.getElementById('profileName').readOnly = false;
		// document.getElementById('profileEmail').readOnly = false;
		document.getElementById('profilePassword').readOnly = false;
		document.getElementById('profileMobile').readOnly = false;
		document.getElementById("savebtn").disabled = false;
		document.getElementById('profileName').focus();
		return false;
	}

	function save() {
		var name = document.getElementById("profileName").value;
		var email = document.getElementById("profileEmail").value;
		var pwd = document.getElementById("profilePassword").value;
		var mobile = document.getElementById("profileMobile").value;
		// alert(name+email+pwd+mobile);
		var sendURL = "http://localhost:3000/updateProfile";
		console.log(sendURL);
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var text=JSON.parse(xhr.responseText);
				document.getElementById("profileName").value=text.name;
				document.getElementById("profileEmail").value=text.email;
				document.getElementById("profilePassword").value=text.password;
				document.getElementById("profileMobile").value=text.mobile;
				// alert(text);
				// document.getElementById("profileName").value=text.email;
				// document.getElementById("profileEmail").value=text.email;
				// document.getElementById("profilePassword").value=text.password;
				// document.getElementById("profileMobile").value=text.mobile;
				// document.getElementById("userWelcomeFont").innerHTML="Hi "+text.name;
				// document.getElementById("points").innerHTML=text.points;
			}
		};
		xhr.open("POST",sendURL,true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(JSON.stringify({name:name, email:email,pwd:pwd,mobile:mobile}));
	}
	function show() {
		document.getElementById("userProfileContainer").style.display = "block";
		document.getElementById("userProfileContainerBtn").style.display = "none";
	}
	function homeload() {
		document.getElementById("userProfileContainer").style.display = "none";
		document.getElementById("userProfileContainerBtn").style.display = "block";

		var sendURL = "http://localhost:3000/getProfile";
		console.log(sendURL);
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var text=JSON.parse(xhr.responseText);
				// alert(text.email);
				document.getElementById("profileName").value=text.name;
				document.getElementById("profileEmail").value=text.email;
				document.getElementById("profilePassword").value=text.password;
				document.getElementById("profileMobile").value=text.mobile;
				document.getElementById("userWelcomeFont").innerHTML="Hi "+text.name;
				document.getElementById("points").innerHTML=text.points;
			}
		};
		xhr.open("GET",sendURL,true);
		xhr.send();
	}
	function logout(){
		var sendURL = "http://localhost:3000/users/logout";
		console.log(sendURL);
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var text=xhr.responseText;
				window.location.assign("register.html");
			}
		};
		xhr.open("GET",sendURL,true);
		xhr.send();
	}
	function off() {
		//alert("inside");`
		// document.getElementById("userProfileContainer").style.display = "none";
		// document.getElementById("userProfileContainerBtn").style.display = "block";
		// return false;
		window.location.reload();
	}
	function getCouponCode() {
		var property = document.getElementById("codeButton");
        property.style.backgroundColor = "#00ff00"
        var property = document.getElementById("noCodeButton");
		property.style.backgroundColor = "#ffffff"
		property.style.color = "black" ;
		document.getElementById("signupCode").style.display = " block ";
	}

	function noCode() {
		var property = document.getElementById("noCodeButton");
		property.style.backgroundColor = "#ff0000"
		var property = document.getElementById("codeButton");
		property.style.backgroundColor = "#ffffff"
		property.style.color = "black" ;
		document.getElementById("signupCode").style.display = " none ";
	}

	function signup() {
		var email = document.getElementById("signupEmail").value;
		var name = document.getElementById("signupUsername").value;
		var npwd = document.getElementById("signupNewPassword").value;
		var cpwd = document.getElementById("signupConfirmPassword").value;
		var mobile = document.getElementById("signupMobile").value;
		var code = document.getElementById("signupCode").value;
		alert(code);
		if (email == "" ) {
			document.getElementById("signupError").style.display = " block ";
			document.getElementById("signupError").innerHTML = "Please enter an email-Id";
			document.getElementById("signupEmail").focus();
			return false;
		}

		if(!(email.match("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"))) {
			document.getElementById("signupError").style.display = " block ";
			document.getElementById("signupError").innerHTML = "Please enter an valid email-Id";
			document.getElementById("signupEmail").focus();
			return false;
		}
		if (name == "" ) {
			document.getElementById("signupError").style.display = " block ";
			document.getElementById("signupError").innerHTML = "Please enter a username";
			document.getElementById("signupUsername").focus();
			return false;
		}

		if (npwd == "" ) {
			document.getElementById("signupError").style.display = " block ";
			document.getElementById("signupError").innerHTML = "Please enter a password";
			document.getElementById("signupNewPassword").focus();
			return false;
		}

		if (cpwd == "") {
			document.getElementById("signupError").style.display = " block ";
			document.getElementById("signupError").innerHTML = "Please confirm your password";
			document.getElementById("signupConfirmPassword").focus();
			return false;
		}
		if(!(npwd===cpwd)){
			document.getElementById("signupError").style.display = " block ";
			document.getElementById("signupError").innerHTML = "Password doesn't match";
			document.getElementById("signupNewPassword").focus();
			return false;
		}
		if (mobile == "") {
			document.getElementById("signupError").style.display = " block ";
			document.getElementById("signupError").innerHTML = "Please enter a mobile number";
			document.getElementById("signupMobile").focus();
			return false;
		}

		if (mobile.length<10) {
			document.getElementById("signupError").style.display = " block ";
			document.getElementById("signupError").innerHTML = "Please enter a valid mobile number";
			document.getElementById("signupMobile").focus();
			return false;
		}
		var data = {
			email:email,
			name:name,
			newpwd:npwd,
			conpwd:cpwd,
			mobile:mobile
		};
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
		//Call a function when the state changes.
	   if (this.readyState == 4 && this.status == 200)
				{
			       var text=xhr.responseText;

			       if (text=="ok") {
			       	alert("User account created");
			       	window.location.reload();
 			}
 		}
		};
		xhr.open("POST", '/users/signup', true);
		//Send the proper header information along with the request
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(JSON.stringify({name:name, email:email,newpwd:npwd,conpwd:cpwd,mobile:mobile,code:code}));
		}

	function login() {
		var email = document.getElementById("loginUsername").value;
		var pwd = document.getElementById("loginPassword").value;

		if(email == "" ) {
			document.getElementById("loginError").style.display = " block ";
			document.getElementById("loginError").innerHTML = "Please enter a email-Id";
			document.getElementById("loginUsername").focus();
			return false;
		}
		if(!(email.match("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"))) {
			document.getElementById("loginError").style.display = " block ";
			document.getElementById("loginError").innerHTML = "Please enter an valid email-Id";
			document.getElementById("loginUsername").focus();
			return false;
		}
		if (pwd == "" ) {
			document.getElementById("loginError").style.display = " block ";
			document.getElementById("loginError").innerHTML = "Please enter a password";
			document.getElementById("loginPassword").focus();
			return false;
		}
		var data = {
			email:email,
			password:pwd
		};
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
		//Call a function when the state changes.
		    if (this.readyState == 4 && this.status == 200) {
		       var text = xhr.responseText;
           if(text=='valid_user')
           window.location.assign("home.html");
           else {
             alert("invalid_user");
           }
		    }
		};
		xhr.open("POST", '/users/login', true);
		//Send the proper header information along with the request
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(JSON.stringify({email:email,password:pwd}));
		// alert("sent");

	}
