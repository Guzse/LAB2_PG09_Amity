(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{104:function(e,t,a){},105:function(e,t,a){},106:function(e,t,a){},107:function(e,t,a){},112:function(e,t,a){},134:function(e,t){},136:function(e,t){},146:function(e,t,a){},147:function(e,t,a){},148:function(e,t,a){},149:function(e,t,a){},150:function(e,t,a){},151:function(e,t,a){},152:function(e,t,a){},153:function(e,t,a){},154:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(38),l=a.n(c),o=(a(104),a(23)),i=a(7),s=(a(105),a(177)),u=a(54),m=a.n(u);a(106);var p=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement("nav",{className:"topnav"},r.a.createElement("div",{className:"logo-home"},e.logo&&r.a.createElement(o.c,{to:"/"},r.a.createElement("div",null,r.a.createElement("img",{alt:"Home",src:m.a})))),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(o.c,{to:"/about"},"About Us")),r.a.createElement("li",null,r.a.createElement("div",null,"\u2013")),r.a.createElement("li",null,r.a.createElement(o.c,{to:"/contact"},"Contact")),r.a.createElement("li",null,r.a.createElement("div",null,"\u2013")),r.a.createElement("li",null,r.a.createElement(o.c,{to:"/login"},"Login")))))};a(107);var d=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(p,null),r.a.createElement(s.a,{maxWidth:"md",fixed:!0,className:"landing"},r.a.createElement("img",{alt:"Amity Logo",src:m.a}),r.a.createElement("hr",null),r.a.createElement("h1",null,"Together we blossom"),r.a.createElement(o.b,{to:"/register"},r.a.createElement("button",{className:"primary-stroke"},"Create an Account"))))},f=a(5),E=a(19),g=a(42),v=a.n(g),b={unableToConnect:"Unable to connect to server. Please check your internet connection or try again later.",formatEmail:"Please enter a valid email address."},h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0,t=v.a.Deferred();return t.resolve({_HTTP_STATUS:500,message:b.unableToConnect,error:e}),t.promise()},w="https://seashell-app-skvgv.ondigitalocean.app";a(112);function C(e,t){document.addEventListener(e,t)}function N(e,t){document.removeEventListener(e,t)}function y(e,t){var a=new CustomEvent(e,{detail:t});document.dispatchEvent(a)}var O=a(87),j=a(83),k=a.n(j).a,S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{active:!1,zoneId:""},t=Object(n.useState)([]),a=Object(f.a)(t,2),c=a[0],l=a[1],o=Object(n.useRef)(),i=Object(n.useRef)(),s=Object(n.useRef)([]),u="meeting_"+e.zoneId;return Object(n.useEffect)(function(){o.current=O.a.connect(w,{jsonp:!1,forceNew:!0,extraHeaders:{"x-access-token":window.localStorage.getItem("accessToken"),"zone-id":e.zoneId}})},[]),Object(n.useEffect)(function(){e.active&&navigator.mediaDevices.getUserMedia({video:z,audio:!0}).then(function(e){i.current.srcObject=e,o.current.emit("join room",u),o.current.on("all users",function(t){var a=[];t.forEach(function(t){var n=function(e,t,a){var n=new k({initiator:!0,trickle:!1,stream:a});return n.on("signal",function(a){o.current.emit("sending signal",{userToSignal:e,callerID:t,signal:a})}),n}(t,o.current.id,e);s.current.push({peerID:t,peer:n}),a.push(n)}),l(a)}),o.current.on("user joined",function(t){var a=function(e,t,a){var n=new k({initiator:!1,trickle:!1,stream:a});return n.on("signal",function(e){o.current.emit("returning signal",{signal:e,callerID:t})}),n.signal(e),n}(t.signal,t.callerID,e);s.current.push({peerID:t.callerID,peer:a}),l(function(e){return[].concat(Object(E.a)(e),[a])})}),o.current.on("receiving returned signal",function(e){s.current.find(function(t){return t.peerID===e.id}).peer.signal(e.signal)})})},[e.active]),r.a.createElement("div",{className:"videoCall"},r.a.createElement("div",{className:"videoContainer",active:e.active?1:0},e.active&&c.map(function(e,t){return r.a.createElement(r.a.Fragment,null,r.a.createElement(x,{key:t,peer:e}))})),r.a.createElement("div",{className:"videoControls"},e.active&&r.a.createElement(r.a.Fragment,null),!e.active&&r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{className:"secondary-stroke",disabled:e.active,onClick:function(){return y("Clicked:JoinMeeting")}},"Join Meeting"))),"\\",e.active&&r.a.createElement("video",{className:"cameraView",muted:!0,ref:i,autoPlay:!0,playsInline:!0}))},x=function(e){var t=Object(n.useRef)();return Object(n.useEffect)(function(){e.peer.on("stream",function(e){t.current.srcObject=e})},[]),r.a.createElement("video",{playsInline:!0,autoPlay:!0,ref:t})},z={height:window.innerHeight/2,width:window.innerWidth/2},I=a(17),T=a.n(I),U=a(32),A=a(12),F=a(15),P=function(){function e(){Object(A.a)(this,e)}return Object(F.a)(e,[{key:"CreateSafezone",value:function(){var e=Object(U.a)(T.a.mark(function e(t){var a,n,r=arguments;return T.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=r.length>1&&void 0!==r[1]?r[1]:"",n=r.length>2&&void 0!==r[2]?r[2]:0,e.prev=2,e.next=5,fetch(w+"/api/safezone/",{method:"POST",headers:{"x-access-token":window.localStorage.getItem("accessToken"),"Content-Type":"application/json","Access-Control-Allow-Origin":"*"},body:JSON.stringify({zoneName:t,description:a,maxMembers:n})});case 5:return e.abrupt("return",e.sent);case 8:return e.prev=8,e.t0=e.catch(2),e.abrupt("return",h());case 11:case"end":return e.stop()}},e,null,[[2,8]])}));return function(t){return e.apply(this,arguments)}}()},{key:"UpdateSafezone",value:function(){var e=Object(U.a)(T.a.mark(function e(){var t,a=arguments;return T.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.length>0&&void 0!==a[0]?a[0]:{},e.prev=1,e.next=4,fetch(w+"/api/safezone/",{method:"PUT",headers:{"x-access-token":window.localStorage.getItem("accessToken"),"Content-Type":"application/json","Access-Control-Allow-Origin":"*"},body:JSON.stringify(t)});case 4:return e.abrupt("return",e.sent);case 7:return e.prev=7,e.t0=e.catch(1),e.abrupt("return",h());case 10:case"end":return e.stop()}},e,null,[[1,7]])}));return function(){return e.apply(this,arguments)}}()},{key:"GetSafezone",value:function(){var e=Object(U.a)(T.a.mark(function e(t){return T.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(w+"/api/safezone/",{method:"GET",headers:{"x-access-token":window.localStorage.getItem("accessToken"),"Content-Type":"application/json","Access-Control-Allow-Origin":"*","safezone-id":t}});case 3:return e.abrupt("return",e.sent);case 6:return e.prev=6,e.t0=e.catch(0),e.abrupt("return",h(e.t0));case 9:case"end":return e.stop()}},e,null,[[0,6]])}));return function(t){return e.apply(this,arguments)}}()}]),e}(),D=function(){function e(){Object(A.a)(this,e)}return Object(F.a)(e,[{key:"UpdateLastZone",value:function(){var e=Object(U.a)(T.a.mark(function e(t){return T.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(w+"/api/user/zone",{method:"PUT",headers:{"x-access-token":window.localStorage.getItem("accessToken"),"Content-Type":"application/json","Access-Control-Allow-Origin":"*"},body:JSON.stringify({lastZone:t})});case 3:return e.abrupt("return",e.sent);case 6:return e.prev=6,e.t0=e.catch(0),e.abrupt("return",h());case 9:case"end":return e.stop()}},e,null,[[0,6]])}));return function(t){return e.apply(this,arguments)}}()}]),e}(),H=new P,M=new D;var L=function(){var e=Object(i.h)().safezoneId,t=window.localStorage.getItem("username"),a=Object(n.useState)(!1),c=Object(f.a)(a,2),l=c[0],o=c[1],s=Object(n.useState)(!1),u=Object(f.a)(s,2),m=u[0],p=u[1];Object(n.useEffect)(function(){return C("Clicked:JoinMeeting",d),E(),function(){N("Clicked:JoinMeeting",d)}},[e,t,l]);var d=function(){o(!0)},E=function(){m||H.GetSafezone(e).then(function(e){return e.json()}).then(function(e){M.UpdateLastZone(e._id),y("ActiveSafeZone:Update",e),p(!0)})};return r.a.createElement(r.a.Fragment,null,r.a.createElement(S,{zoneId:e,active:e&&l}))},J=(a(146),a(84)),G=a.n(J),R=a(4),V=a(27),Z=function(){function e(){Object(A.a)(this,e)}return Object(F.a)(e,[{key:"SignIn",value:function(){var e=Object(U.a)(T.a.mark(function e(t,a){return T.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(w+"/api/auth/signin",{method:"POST",headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"},body:JSON.stringify({username:t,password:a})});case 3:return e.abrupt("return",e.sent);case 6:return e.prev=6,e.t0=e.catch(0),e.abrupt("return",h());case 9:case"end":return e.stop()}},e,null,[[0,6]])}));return function(t,a){return e.apply(this,arguments)}}()},{key:"SignUp",value:function(){var e=Object(U.a)(T.a.mark(function e(t,a,n){return T.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(w+"/api/auth/signup",{method:"POST",headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"},body:JSON.stringify({username:t,password:a,email:n})});case 3:return e.abrupt("return",e.sent);case 6:return e.prev=6,e.t0=e.catch(0),e.abrupt("return",h());case 9:case"end":return e.stop()}},e,null,[[0,6]])}));return function(t,a,n){return e.apply(this,arguments)}}()},{key:"Verify",value:function(){var e=Object(U.a)(T.a.mark(function e(){return T.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(w+"/api/auth/verify",{method:"GET",headers:{"x-access-token":window.localStorage.getItem("accessToken"),"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}});case 3:return e.abrupt("return",e.sent);case 6:return e.prev=6,e.t0=e.catch(0),e.abrupt("return",h());case 9:case"end":return e.stop()}},e,null,[[0,6]])}));return function(){return e.apply(this,arguments)}}()}]),e}(),q=a(10),B=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{label:"",name:""},t="password"===e.type?"\u25cf\u25cf\u25cf\u25cf\u25cf":"";return r.a.createElement("div",{className:"labelInputContainer"},e.label&&r.a.createElement("label",{for:e.name},e.label),e.icon&&q[e.icon],r.a.createElement("input",Object.assign({type:"text",placeholder:t},function(e){var t=Object(V.a)({},e);return e.icon&&delete t.icon,e.label&&delete t.label,t}(e))))},_=function(e){var t=Object(n.useState)({username:"",password:"",errorMsg:""}),a=Object(f.a)(t,2),c=a[0],l=a[1],o=new Z,s=Object(i.g)();Object(n.useEffect)(function(){window.localStorage.getItem("accessToken")&&u()});var u=function(){var e=Object(U.a)(T.a.mark(function e(){var t;return T.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.Verify();case 2:return e.next=4,e.sent.json();case 4:t=e.sent,s("/app/".concat(t.lastZone));case 6:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),m=function(e){var t=e.target.name,a=e.target.value;l(function(e){return Object(V.a)({},e,Object(R.a)({},t,a))})};return r.a.createElement("form",{className:"formLogin",onSubmit:function(e){e.preventDefault(),o.SignIn(c.username,c.password).then(function(e){if(200!==e.status)return console.error(e);e.json().then(function(e){window.localStorage.setItem("accessToken",e.accessToken),window.localStorage.setItem("username",e.username),window.localStorage.setItem("email",e.email),u()})})}},r.a.createElement(B,{label:"Username",placeholder:"username",type:"text",name:"username",value:c.username,onChange:m,required:!0}),r.a.createElement(B,{label:"Password",type:"password",name:"password",value:c.password,onChange:m,required:!0}),r.a.createElement("button",{type:"submit",className:"primary"},"Login"))},W={email:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},Y=(a(147),function(){var e=Object(n.useState)({username:"",email:"",password:"",confirmPassword:""}),t=Object(f.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)(""),s=Object(f.a)(l,2),u=s[0],m=s[1],p=Object(i.g)(),d=new Z,E=function(e){var t=e.target.name,a=e.target.value;c(function(e){return Object(V.a)({},e,Object(R.a)({},t,a))})},g=function(){var e=v()('input[name="email"]')[0],t=v()('input[name="confirmPassword"]')[0],n=v()('input[name="username"]')[0];return W.email.test(a.email)?a.password!==a.confirmPassword?(m(function(e){return"Passwords must match."}),t.setCustomValidity(u),!1):(m(function(e){return""}),e.setCustomValidity(""),t.setCustomValidity(""),n.setCustomValidity(""),!0):(m(function(e){return"Please enter a valid email address."}),e.setCustomValidity(u),!1)};return r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),g()&&d.SignUp(a.username,a.password,a.email).then(function(e){200===e.status&&p("/login?newuser=true"),e.json().then(function(e){m(function(t){return e.message}),e.key&&v()('input[name="'.concat(e.key,'"]'))[0].setCustomValidity(e.message)})})},className:"formRegister"},r.a.createElement(B,{label:"Username",placeholder:"John Doe",name:"username",onChange:E,onBlur:g,required:!0}),r.a.createElement(B,{label:"Email",placeholder:"user@email.com",name:"email",onChange:E,onBlur:g,required:!0}),r.a.createElement(B,{label:"Password",type:"password",name:"password",onChange:E,onBlur:g,required:!0}),r.a.createElement(B,{label:"Repeat Password",type:"password",name:"confirmPassword",onChange:E,onBlur:g,required:!0}),r.a.createElement("div",{className:"checkboxContainer"},r.a.createElement("input",{type:"checkbox",name:"termsService",required:!0}),r.a.createElement("label",null,"I have read the ",r.a.createElement(o.b,{to:"/service"},"Terms of Service"))),r.a.createElement("div",{className:"error"},u),r.a.createElement("button",{type:"submit",className:"primary"},"Register"))}),$=function(e){var t=Object(i.g)(),a=e.register?"Register":"Login",n=e.register?"Login":"Register",c=e.register?r.a.createElement(Y,null):r.a.createElement(_,null);return r.a.createElement(r.a.Fragment,null,r.a.createElement(p,{logo:!0}),r.a.createElement(s.a,{className:"authenticate",fixed:!0},r.a.createElement("div",null,r.a.createElement("img",{alt:"Logo",src:G.a,width:"400px",height:"500px"}),r.a.createElement("div",null,function(){if(new URLSearchParams(window.location.search).get("newuser"))return r.a.createElement("p",null,"You succesfully created your account. Please log in to continue.")}(),r.a.createElement("h1",null,a),r.a.createElement("hr",null),c,r.a.createElement("button",{onClick:function(){t("/".concat(n),{replace:!0})},className:"primary-stroke"},n)))))};var K=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(p,{logo:!0}),r.a.createElement(s.a,{fixed:!0}))},Q=(a(148),a(149),a(174)),X=a(173),ee=a(178),te=function(){var e=r.a.useState(!1),t=Object(f.a)(e,2),a=t[0],c=t[1],l=new P,o=Object(n.useState)({zoneName:"",description:"",maxMembers:0}),i=Object(f.a)(o,2),s=i[0],u=i[1];return r.a.createElement("div",{className:"sidebar-left"},r.a.createElement("div",{className:"serverlist"},r.a.createElement(q.HiUserGroup,{className:"groupIcon"}),r.a.createElement(q.HiUserGroup,{className:"groupIcon"}),r.a.createElement(q.HiUserGroup,{className:"groupIcon"})),r.a.createElement(q.HiOutlinePlusCircle,{onClick:function(){c(!0)},className:"plusIcon"}),r.a.createElement(ae,{open:a,onClose:function(){c(!1)},onChange:function(e){var t=e.target.name,a=e.target.value;console.log(t,a),u(function(e){return Object(V.a)({},e,Object(R.a)({},t,a))})},onSubmit:function(e){e.preventDefault(),l.CreateSafezone(s.zoneName,s.description,s.maxMembers).then(function(e){e.json().then(function(e){return console.log(e)})})}}))};function ae(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{open:!1,onClose:function(){},onChange:function(){},onSubmit:function(){}};return r.a.createElement(X.a,{open:e.open,onClose:e.handleClose},r.a.createElement(ee.a,null,r.a.createElement("form",{className:"createSafezone",onSubmit:e.onSubmit},r.a.createElement("h1",null,"Create safezone"),r.a.createElement("hr",null),r.a.createElement("div",{className:"safeZoneName-container"},r.a.createElement("label",{htmlFor:"zoneName"},"Safezone name"),r.a.createElement("input",{type:"text",name:"zoneName",onChange:e.onChange,required:!0})),r.a.createElement("div",{className:"description-container"},r.a.createElement("label",{htmlFor:"description"},"Description "),r.a.createElement("textarea",{onChange:e.onChange,id:"descriptionSafezone",name:"description",rows:"4",cols:"50"})),r.a.createElement("div",{className:"limit-container"},r.a.createElement("label",{htmlFor:"maxMembers"},"Member limit ")," ",r.a.createElement("span",{className:"outputSlider"}),r.a.createElement(Q.a,{onChange:e.onChange,name:"maxMembers",min:1,max:50,defaultValue:25,"aria-label":"Default",valueLabelDisplay:"auto",className:"slider"})),r.a.createElement("div",{className:"button-container"},r.a.createElement("button",{onClick:e.onClose,className:"primary-stroke cancel"},"Cancel"),r.a.createElement("button",{onClick:e.onClose,type:"submit",className:"primary-stroke register create"},"Create safezone")))))}a(150),a(151);var ne=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{width:"40px",primary:!1,secondary:!1,background:!1},t="";e.primary&&(t="primary"),e.secondary&&(t="secondary"),e.background&&(t="background");var a="";return e.onClick&&(a="clickable"),r.a.createElement("div",Object.assign({style:{width:e.width,height:e.width},className:"iconWrapper ".concat(t," ").concat(a)},function(){var t=Object(V.a)({},e);return delete t.primary,delete t.secondary,delete t.background,t}()),e.children)},re=a(179),ce=a(175),le=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{onClickSettings:function(){},onClickUser:function(){}},t=Object(n.useState)({}),a=Object(f.a)(t,2),c=a[0],l=a[1],o=function(e){l(e.detail)};return Object(n.useEffect)(function(){return C("ActiveSafeZone:Update",o),function(){N("ActiveSafeZone:Update",o)}},[o]),r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,c.zoneName),r.a.createElement(oe,null),r.a.createElement(ie,null),r.a.createElement(se,{onClickSettings:e.onClickSettings}))},oe=function(){return r.a.createElement("div",{className:"userList"},r.a.createElement(B,{className:"search",type:"text",placeholder:"Search.."}))},ie=function(){return r.a.createElement("div",{className:"meetingPlanner"},r.a.createElement("div",null,"Next meetup"),r.a.createElement(ne,{width:"20px",onClick:function(){}},r.a.createElement(q.HiOutlinePencilAlt,null)),r.a.createElement("p",null,"Friday January 10, 19:00"))},se=function(e){var t=e.onClickSettings,a=void 0===t?function(){}:t,c=Object(n.useState)(!1),l=Object(f.a)(c,2),o=l[0],s=l[1],u=Object(i.g)(),m=function(){s(!1)};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"profileSettings"},r.a.createElement("div",{className:"profile"},r.a.createElement(ne,{background:!0,width:"40px",onClick:function(){s(!0)}},r.a.createElement(q.HiOutlineUser,null)),r.a.createElement("div",{className:"username"},window.localStorage.getItem("username"))),r.a.createElement(ne,{width:"40px",onClick:a},r.a.createElement(q.HiOutlineCog,{className:"settingIcon"}))),r.a.createElement(X.a,{open:o,onClose:m},r.a.createElement(ce.a,null,"Do you want to log out?"),r.a.createElement(re.a,null,r.a.createElement("button",{onClick:m,className:"primary-outline"},"Cancel"),r.a.createElement("button",{onClick:function(){window.localStorage.removeItem("accessToken"),window.localStorage.removeItem("username"),window.localStorage.removeItem("email"),u("/login")},className:"primary"},"Log Out"))))};var ue=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"sidebarContainer"},r.a.createElement(te,null),r.a.createElement("div",{className:"sidebar-right"},r.a.createElement(le,{onClickSettings:function(e){return console.log("onClickSettings",e)},onClickUser:function(e){return console.log("onClickUser",e)}}))),r.a.createElement("div",{id:"outlet"},r.a.createElement(i.a,null)))};a(152);var me=function(){var e=r.a.useState(!1),t=Object(f.a)(e,2),a=(t[0],t[1],r.a.useState(!1)),c=Object(f.a)(a,2),l=c[0],o=c[1],i=function(){o(!1)},u=new P,m=Object(n.useState)({zoneName:"",description:"",maxMembers:0}),p=Object(f.a)(m,2),d=p[0],E=p[1];function g(e){var t=e.target.name,a=e.target.value;E(function(e){return Object(V.a)({},e,Object(R.a)({},t,a))})}return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"sidebarContainer"},r.a.createElement("div",{className:"leftside-sidebar"},r.a.createElement("div",{className:"serverlist"},r.a.createElement("a",{href:"#"},r.a.createElement(q.HiUserGroup,{className:"groupIcon"})),r.a.createElement("a",{href:"#"},r.a.createElement(q.HiUserGroup,{className:"groupIcon"})),r.a.createElement("a",{href:"#"},r.a.createElement(q.HiUserGroup,{className:"groupIcon"}))),r.a.createElement("a",{to:"#",className:"createSz"},r.a.createElement(q.HiOutlinePlusCircle,{className:"plusIcon"}))),r.a.createElement("div",{className:"rightside-sidebar"},r.a.createElement("div",{className:"searcher"},r.a.createElement("input",{className:"searchbar",type:"text",placeholder:"Search.."}),r.a.createElement("a",{href:"#"},r.a.createElement(q.HiUserGroup,{className:"serverIcon"})," ",r.a.createElement("span",null,"server1 ")),r.a.createElement("a",{href:"#"},r.a.createElement(q.HiUserGroup,{className:"serverIcon"})," ",r.a.createElement("span",null,"server1 ")),r.a.createElement("a",{href:"#"},r.a.createElement(q.HiUserGroup,{className:"serverIcon"})," ",r.a.createElement("span",null,"server1 "))),r.a.createElement("div",{className:"containterPlanAcc"},r.a.createElement("hr",null),r.a.createElement("div",{className:"planner"},r.a.createElement("h3",null,"Next meetup ",r.a.createElement(q.HiOutlinePencilAlt,{onClick:function(){o(!0)}})),r.a.createElement("span",null,"19 january ")),r.a.createElement("hr",null),r.a.createElement("div",{className:"account"},r.a.createElement(q.HiUserCircle,{className:"userIcon"}),r.a.createElement("span",null,"Jan verstraten"),r.a.createElement("a",{className:"settings",href:"#"},r.a.createElement(q.HiOutlineCog,{className:"settingIcon"})))))),r.a.createElement("div",{className:"safezoneBody"},r.a.createElement(s.a,{fixed:!0}),r.a.createElement(s.a,{fixed:!0},r.a.createElement(X.a,{onClose:i,open:l},r.a.createElement("h2",null,"Create meeting"),r.a.createElement(ee.a,null,r.a.createElement("form",{className:"createMeeting",onSubmit:function(e){e.preventDefault(),u.CreateSafezone(d.zoneName,d.description,d.maxMembers).then(function(e){e.json().then(function(e){return console.log(e)})})}},r.a.createElement("hr",null),r.a.createElement("div",{className:"Date-container"},r.a.createElement("label",{htmlFor:"date"},"Safezone name"),r.a.createElement("input",{type:"date",name:"date",onChange:g,required:!0})),r.a.createElement("div",{className:"time-container"},r.a.createElement("label",{htmlFor:"time"},"time "),r.a.createElement("input",{type:"time",onChange:g,id:"descriptionSafezone",name:"time"})),r.a.createElement("div",{className:"button-container"},r.a.createElement("button",{onClick:i,className:"primary-stroke ",to:"#"},"Remove"),r.a.createElement("button",{onClick:i,className:"primary-stroke ",to:"#"},"Cancel"),r.a.createElement("button",{onClick:i,type:"submit",className:"primary-stroke register create",to:"#"},"Accept"))))))))};var pe=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(p,{logo:!0}),r.a.createElement(s.a,{fixed:!0}))},de=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(p,{logo:!0}),r.a.createElement(s.a,null,r.a.createElement("h1",null,"404 Not Found")))};a(153);var fe=function(){var e=r.a.useState(!1),t=Object(f.a)(e,2),a=t[0],c=t[1],l=function(){c(!1)},o=new P,i=Object(n.useState)({zoneName:"",description:"",maxMembers:0}),s=Object(f.a)(i,2),u=s[0],m=s[1];function p(e){var t=e.target.name,a=e.target.value;m(function(e){return Object(V.a)({},e,Object(R.a)({},t,a))})}return r.a.createElement(r.a.Fragment,null,r.a.createElement(X.a,{open:a,onClose:l},r.a.createElement(ee.a,null,r.a.createElement("form",{className:"createSafezone",onSubmit:function(e){e.preventDefault(),o.CreateSafezone(u.zoneName,u.description,u.maxMembers).then(function(e){e.json().then(function(e){return console.log(e)})})}},r.a.createElement("h1",null,"Create safezone"),r.a.createElement("hr",null),r.a.createElement("div",{className:"safeZoneName-container"},r.a.createElement("label",{htmlFor:"zoneName"},"Safezone name"),r.a.createElement("input",{type:"text",name:"zoneName",onChange:p,required:!0})),r.a.createElement("div",{className:"description-container"},r.a.createElement("label",{htmlFor:"description"},"Description "),r.a.createElement("textarea",{onChange:p,id:"descriptionSafezone",name:"description",rows:"4",cols:"50"})),r.a.createElement("div",{className:"limit-container"},r.a.createElement("label",{htmlFor:"maxMembers"},"Member limit ")," ",r.a.createElement("span",{className:"outputSlider"}),r.a.createElement(Q.a,{onChange:p,name:"maxMembers",min:1,max:50,defaultValue:25,"aria-label":"Default",valueLabelDisplay:"auto",className:"slider"})),r.a.createElement("div",{className:"button-container"},r.a.createElement("button",{onClick:l,className:"primary-stroke cancel",to:"/safezone"},"Cancel"),r.a.createElement("button",{onClick:l,type:"submit",className:"primary-stroke register create",to:"/safezone"},"Create safezone"))))))};var Ee=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(s.a,{fixed:!0},r.a.createElement(fe,{className:"safezoneForm"})))};var ge=function(){return r.a.createElement(o.a,null,r.a.createElement(i.d,null,r.a.createElement(i.b,{index:!0,element:r.a.createElement(d,null)}),r.a.createElement(i.b,{path:"login",element:r.a.createElement($,null)}),r.a.createElement(i.b,{path:"register",element:r.a.createElement($,{register:!0})}),r.a.createElement(i.b,{path:"about",element:r.a.createElement(K,null)}),r.a.createElement(i.b,{path:"contact",element:r.a.createElement(pe,null)}),r.a.createElement(i.b,{path:"app",element:r.a.createElement(ue,null)},r.a.createElement(i.b,{path:":safezoneId",element:r.a.createElement(L,null)}),r.a.createElement(i.b,{path:"main",element:r.a.createElement(me,null)}),r.a.createElement(i.b,{path:"new",element:r.a.createElement(Ee,null)})),r.a.createElement(i.b,{path:"*",element:r.a.createElement(de,null)})))};l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(ge,null)),document.getElementById("root"))},54:function(e,t,a){e.exports=a.p+"static/media/Woordmerk_A.de01e9fd.svg"},84:function(e,t,a){e.exports=a.p+"static/media/Logo_A.943622a9.svg"},99:function(e,t,a){e.exports=a(154)}},[[99,1,2]]]);
//# sourceMappingURL=main.7715cc82.chunk.js.map