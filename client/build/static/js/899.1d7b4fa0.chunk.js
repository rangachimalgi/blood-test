"use strict";(self.webpackChunkreact_ecommerce=self.webpackChunkreact_ecommerce||[]).push([[899],{7662:function(e,n,r){var a=r(4165),t=r(5861),o=r(4942),i=r(3433),s=r(1413),c=r(9439),l=r(2791),d=r(1243),u=r(5316),h=r(5313),m=r(9410),p=r(3360),x=r(2309),f=r(184);n.Z=function(e){var n=e.show,r=e.handleClose,Z=e.CartItem,v=e.setCartItem,j=(0,l.useState)({pincode:"",name:"",email:"",address:"",phoneno:"",age:"",noOfPersons:1,appointmentDate:"",beneficiaries:[]}),g=(0,c.Z)(j,2),b=g[0],y=g[1],C=(0,l.useState)(""),N=(0,c.Z)(C,2),k=N[0],P=N[1];(0,l.useEffect)((function(){y((function(e){return(0,s.Z)((0,s.Z)({},e),{},{beneficiaries:Array.from({length:e.noOfPersons},(function(){return{name:"",age:"",gender:""}}))})}))}),[b.noOfPersons]);var I=function(e,n,r){var a=(0,i.Z)(b.beneficiaries);a[e]=(0,s.Z)((0,s.Z)({},a[e]),{},(0,o.Z)({},n,r)),y((0,s.Z)((0,s.Z)({},b),{},{beneficiaries:a}))},G=function(){var e=(0,t.Z)((0,a.Z)().mark((function e(){var n,t;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(x.G.includes(b.pincode)){e.next=3;break}return alert("Service is not available in your pincode."),e.abrupt("return");case 3:return n={pincode:b.pincode,name:b.name,email:b.email,address:b.address,phoneno:b.phoneno,age:b.age,noOfPersons:b.noOfPersons,appointmentDate:b.appointmentDate,beneficiaries:b.beneficiaries,cartItems:Z},console.log("Order Details: ",n),t=JSON.stringify(n).length,console.log("Payload size: ".concat(t," bytes")),e.prev=7,e.next=10,d.Z.post("".concat("https://blood-test-l0ts.onrender.com","/api/orders"),n);case 10:e.sent.data.success?(v([]),r(),alert("Order submitted successfully!")):alert("Error submitting order. Please try again."),e.next=18;break;case 14:e.prev=14,e.t0=e.catch(7),console.error("Error submitting order:",e.t0),alert("Error submitting order. Please try again.");case 18:case"end":return e.stop()}}),e,null,[[7,14]])})));return function(){return e.apply(this,arguments)}}();return(0,f.jsxs)(u.Z,{show:n,onHide:r,children:[(0,f.jsx)(u.Z.Header,{closeButton:!0,children:(0,f.jsx)(u.Z.Title,{children:"Checkout Form"})}),(0,f.jsx)(u.Z.Body,{children:(0,f.jsxs)(h.Z,{children:[(0,f.jsxs)(h.Z.Group,{controlId:"formPincode",children:[(0,f.jsxs)(m.Z,{children:[(0,f.jsx)(h.Z.Control,{type:"text",placeholder:"Enter Pincode",value:b.pincode,onChange:function(e){return y((0,s.Z)((0,s.Z)({},b),{},{pincode:e.target.value}))},name:"pincode"}),(0,f.jsx)(p.Z,{variant:"outline-secondary",onClick:function(){x.G.includes(b.pincode)?P("Service is available in your pincode!"):P("Sorry, service is not available in your pincode.")},children:"Check Availability"})]}),(0,f.jsx)(h.Z.Text,{className:"text-muted",children:k})]}),(0,f.jsxs)(h.Z.Group,{controlId:"formName",children:[(0,f.jsx)(h.Z.Label,{children:"Name"}),(0,f.jsx)(h.Z.Control,{type:"text",placeholder:"Enter your name",value:b.name,onChange:function(e){return y((0,s.Z)((0,s.Z)({},b),{},{name:e.target.value}))},name:"name"})]}),(0,f.jsxs)(h.Z.Group,{controlId:"formEmail",children:[(0,f.jsx)(h.Z.Label,{children:"Email"}),(0,f.jsx)(h.Z.Control,{type:"email",placeholder:"Enter your email",value:b.email,onChange:function(e){return y((0,s.Z)((0,s.Z)({},b),{},{email:e.target.value}))},name:"email"})]}),(0,f.jsxs)(h.Z.Group,{controlId:"formAddress",children:[(0,f.jsx)(h.Z.Label,{children:"Address"}),(0,f.jsx)(h.Z.Control,{type:"text",placeholder:"Enter your address",value:b.address,onChange:function(e){return y((0,s.Z)((0,s.Z)({},b),{},{address:e.target.value}))},name:"address"})]}),(0,f.jsxs)(h.Z.Group,{controlId:"formPhoneNo",children:[(0,f.jsx)(h.Z.Label,{children:"Phone No"}),(0,f.jsx)(h.Z.Control,{type:"text",placeholder:"Enter your phone no",value:b.phoneno,onChange:function(e){return y((0,s.Z)((0,s.Z)({},b),{},{phoneno:e.target.value}))},name:"phoneno"})]}),(0,f.jsxs)(h.Z.Group,{controlId:"formAge",children:[(0,f.jsx)(h.Z.Label,{children:"Age"}),(0,f.jsx)(h.Z.Control,{type:"text",placeholder:"Enter your age",value:b.age,onChange:function(e){return y((0,s.Z)((0,s.Z)({},b),{},{age:e.target.value}))},name:"age"})]}),(0,f.jsxs)(h.Z.Group,{controlId:"formNoOfPersons",children:[(0,f.jsx)(h.Z.Label,{children:"Number of Persons"}),(0,f.jsx)(h.Z.Control,{as:"select",value:b.noOfPersons,onChange:function(e){var n=parseInt(e.target.value,10);y((0,s.Z)((0,s.Z)({},b),{},{noOfPersons:n,beneficiaries:Array.from({length:n},(function(e,n){return b.beneficiaries[n]||{name:"",age:"",gender:""}}))}))},name:"noOfPersons",children:(0,i.Z)(Array(10).keys()).map((function(e){return(0,f.jsx)("option",{value:e+1,children:e+1},e+1)}))})]}),(0,f.jsxs)(h.Z.Group,{controlId:"formAppointmentDate",children:[(0,f.jsx)(h.Z.Label,{children:"Appointment Date"}),(0,f.jsx)(h.Z.Control,{as:"select",value:b.appointmentDate,onChange:function(e){return y((0,s.Z)((0,s.Z)({},b),{},{appointmentDate:e.target.value}))},name:"appointmentDate",children:function(){for(var e=[],n=new Date,r=0;r<7;r++){var a=new Date;a.setDate(n.getDate()+r);var t=a.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"});e.push((0,f.jsx)("option",{value:t,children:t},r))}return e}()})]}),(0,f.jsx)("h5",{children:"Beneficiaries"}),b.beneficiaries.map((function(e,n){return(0,f.jsxs)("div",{children:[(0,f.jsxs)(h.Z.Group,{controlId:"formBeneficiaryName".concat(n),children:[(0,f.jsxs)(h.Z.Label,{children:["Beneficiary Name ",n+1]}),(0,f.jsx)(h.Z.Control,{type:"text",placeholder:"Enter name",value:e.name,onChange:function(e){return I(n,"name",e.target.value)},name:"beneficiaryName".concat(n)})]}),(0,f.jsxs)(h.Z.Group,{controlId:"formBeneficiaryAge".concat(n),children:[(0,f.jsx)(h.Z.Label,{children:"Age"}),(0,f.jsx)(h.Z.Control,{type:"text",placeholder:"Enter age",value:e.age,onChange:function(e){return I(n,"age",e.target.value)},name:"beneficiaryAge".concat(n)})]}),(0,f.jsxs)(h.Z.Group,{controlId:"formBeneficiaryGender".concat(n),children:[(0,f.jsx)(h.Z.Label,{children:"Gender"}),(0,f.jsxs)(h.Z.Control,{as:"select",value:e.gender,onChange:function(e){return I(n,"gender",e.target.value)},name:"beneficiaryGender".concat(n),children:[(0,f.jsx)("option",{value:"",children:"Select Gender"}),(0,f.jsx)("option",{value:"Male",children:"Male"}),(0,f.jsx)("option",{value:"Female",children:"Female"}),(0,f.jsx)("option",{value:"Other",children:"Other"})]})]})]},n)}))]})}),(0,f.jsxs)(u.Z.Footer,{children:[(0,f.jsx)(p.Z,{variant:"secondary",onClick:r,children:"Close"}),(0,f.jsx)(p.Z,{variant:"primary",onClick:G,children:"Confirm Purchase"})]})]})}},5899:function(e,n,r){r.r(n),r.d(n,{default:function(){return u}});var a=r(9439),t=r(2791),o=r(1087),i=r(5956),s=r(9214),c=r(9085),l=(r(5462),r(7662)),d=r(184),u=function(){(0,t.useContext)(s.c).addToCart;var e=(0,t.useState)(!1),n=(0,a.Z)(e,2),r=n[0],u=n[1],h=(0,t.useState)(null),m=(0,a.Z)(h,2),p=m[0],x=m[1];return(0,d.jsxs)("div",{className:"packages-list",children:[(0,d.jsx)(c.Ix,{}),(0,d.jsx)("h2",{children:"Available Health Packages"}),(0,d.jsx)("div",{className:"packages-grid",children:i.M.map((function(e){var n;return(0,d.jsxs)("div",{className:"package-card",children:[(0,d.jsx)(o.rU,{to:"/health/".concat(e.id),className:"package-link",children:(0,d.jsxs)("div",{className:"package-image-container",children:[(0,d.jsx)("img",{src:e.imgUrl,alt:e.productName,className:"package-image"}),(0,d.jsxs)("div",{className:"hover-overlay",children:[(0,d.jsx)("h2",{children:e.overlayTitle}),(0,d.jsx)("ul",{children:null===(n=e.overlayDetails)||void 0===n?void 0:n.map((function(e,n){return(0,d.jsx)("li",{children:e},n)}))})]})]})}),(0,d.jsxs)("div",{className:"package-details",children:[(0,d.jsx)("div",{className:"package-name",children:e.productName}),(0,d.jsx)("div",{className:"package-desc",children:e.desc})]}),(0,d.jsxs)("div",{className:"price-cart-box",children:[(0,d.jsxs)("div",{className:"package-price",children:["\u20b9",e.price]}),(0,d.jsx)("button",{className:"book-now-button",onClick:function(){return function(e){x(e),u(!0)}(e)},children:"Book Now"})]})]},e.id)}))}),r&&(0,d.jsx)(l.Z,{show:r,handleClose:function(){u(!1),x(null)},CartItem:p?[p]:[],setCartItem:function(){}})]})}},9410:function(e,n,r){var a=r(5987),t=r(1413),o=r(1694),i=r.n(o),s=r(2791),c=r(6543),l=r(162),d=r(6882),u=r(1991),h=r(184),m=["bsPrefix","size","hasValidation","className","as"],p=(0,c.Z)("input-group-text",{Component:"span"}),x=s.forwardRef((function(e,n){var r=e.bsPrefix,o=e.size,c=e.hasValidation,d=e.className,p=e.as,x=void 0===p?"div":p,f=(0,a.Z)(e,m);r=(0,l.vE)(r,"input-group");var Z=(0,s.useMemo)((function(){return{}}),[]);return(0,h.jsx)(u.Z.Provider,{value:Z,children:(0,h.jsx)(x,(0,t.Z)((0,t.Z)({ref:n},f),{},{className:i()(d,r,o&&"".concat(r,"-").concat(o),c&&"has-validation")}))})}));x.displayName="InputGroup",n.Z=Object.assign(x,{Text:p,Radio:function(e){return(0,h.jsx)(p,{children:(0,h.jsx)(d.Z,(0,t.Z)({type:"radio"},e))})},Checkbox:function(e){return(0,h.jsx)(p,{children:(0,h.jsx)(d.Z,(0,t.Z)({type:"checkbox"},e))})}})}}]);
//# sourceMappingURL=899.1d7b4fa0.chunk.js.map