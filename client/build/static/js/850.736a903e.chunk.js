"use strict";(self.webpackChunkreact_ecommerce=self.webpackChunkreact_ecommerce||[]).push([[850],{8697:function(e,n,r){r.d(n,{Z:function(){return c}});var a=r(7022),t=r(9743),i=r(2677),o=r.p+"static/media/table.c96637810cb2ae358aca.jpg",s=r(184),c=function(e){var n=e.title;return(0,s.jsxs)("div",{className:"image-container",children:[(0,s.jsx)("img",{src:o,alt:"Product-bg"}),(0,s.jsx)("div",{className:"overlay",children:(0,s.jsx)(a.Z,{children:(0,s.jsx)(t.Z,{children:(0,s.jsx)(i.Z,{children:(0,s.jsx)("h2",{children:n})})})})})]})}},7662:function(e,n,r){var a=r(4165),t=r(5861),i=r(4942),o=r(3433),s=r(1413),c=r(9439),l=r(2791),d=r(1243),u=r(5316),h=r(5313),m=r(9410),f=r(3360),p=r(2309),x=r(184);n.Z=function(e){var n=e.show,r=e.handleClose,v=e.CartItem,j=e.setCartItem,Z=(0,l.useState)({pincode:"",name:"",email:"",address:"",phoneno:"",age:"",noOfPersons:1,appointmentDate:"",beneficiaries:[]}),g=(0,c.Z)(Z,2),b=g[0],y=g[1],C=(0,l.useState)(""),N=(0,c.Z)(C,2),P=N[0],I=N[1];(0,l.useEffect)((function(){y((function(e){return(0,s.Z)((0,s.Z)({},e),{},{beneficiaries:Array.from({length:e.noOfPersons},(function(){return{name:"",age:"",gender:""}}))})}))}),[b.noOfPersons]);var k=function(e,n,r){var a=(0,o.Z)(b.beneficiaries);a[e]=(0,s.Z)((0,s.Z)({},a[e]),{},(0,i.Z)({},n,r)),y((0,s.Z)((0,s.Z)({},b),{},{beneficiaries:a}))},A=function(){var e=(0,t.Z)((0,a.Z)().mark((function e(){var n,t;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(p.G.includes(b.pincode)){e.next=3;break}return alert("Service is not available in your pincode."),e.abrupt("return");case 3:return n={pincode:b.pincode,name:b.name,email:b.email,address:b.address,phoneno:b.phoneno,age:b.age,noOfPersons:b.noOfPersons,appointmentDate:b.appointmentDate,beneficiaries:b.beneficiaries,cartItems:v},console.log("Order Details: ",n),t=JSON.stringify(n).length,console.log("Payload size: ".concat(t," bytes")),e.prev=7,e.next=10,d.Z.post("".concat("https://blood-test-l0ts.onrender.com","/api/orders"),n);case 10:e.sent.data.success?(j([]),r(),alert("Order submitted successfully!")):alert("Error submitting order. Please try again."),e.next=18;break;case 14:e.prev=14,e.t0=e.catch(7),console.error("Error submitting order:",e.t0),alert("Error submitting order. Please try again.");case 18:case"end":return e.stop()}}),e,null,[[7,14]])})));return function(){return e.apply(this,arguments)}}();return(0,x.jsxs)(u.Z,{show:n,onHide:r,children:[(0,x.jsx)(u.Z.Header,{closeButton:!0,children:(0,x.jsx)(u.Z.Title,{children:"Checkout Form"})}),(0,x.jsx)(u.Z.Body,{children:(0,x.jsxs)(h.Z,{children:[(0,x.jsxs)(h.Z.Group,{controlId:"formPincode",children:[(0,x.jsxs)(m.Z,{children:[(0,x.jsx)(h.Z.Control,{type:"text",placeholder:"Enter Pincode",value:b.pincode,onChange:function(e){return y((0,s.Z)((0,s.Z)({},b),{},{pincode:e.target.value}))},name:"pincode"}),(0,x.jsx)(f.Z,{variant:"outline-secondary",onClick:function(){p.G.includes(b.pincode)?I("Service is available in your pincode!"):I("Sorry, service is not available in your pincode.")},children:"Check Availability"})]}),(0,x.jsx)(h.Z.Text,{className:"text-muted",children:P})]}),(0,x.jsxs)(h.Z.Group,{controlId:"formName",children:[(0,x.jsx)(h.Z.Label,{children:"Name"}),(0,x.jsx)(h.Z.Control,{type:"text",placeholder:"Enter your name",value:b.name,onChange:function(e){return y((0,s.Z)((0,s.Z)({},b),{},{name:e.target.value}))},name:"name"})]}),(0,x.jsxs)(h.Z.Group,{controlId:"formEmail",children:[(0,x.jsx)(h.Z.Label,{children:"Email"}),(0,x.jsx)(h.Z.Control,{type:"email",placeholder:"Enter your email",value:b.email,onChange:function(e){return y((0,s.Z)((0,s.Z)({},b),{},{email:e.target.value}))},name:"email"})]}),(0,x.jsxs)(h.Z.Group,{controlId:"formAddress",children:[(0,x.jsx)(h.Z.Label,{children:"Address"}),(0,x.jsx)(h.Z.Control,{type:"text",placeholder:"Enter your address",value:b.address,onChange:function(e){return y((0,s.Z)((0,s.Z)({},b),{},{address:e.target.value}))},name:"address"})]}),(0,x.jsxs)(h.Z.Group,{controlId:"formPhoneNo",children:[(0,x.jsx)(h.Z.Label,{children:"Phone No"}),(0,x.jsx)(h.Z.Control,{type:"text",placeholder:"Enter your phone no",value:b.phoneno,onChange:function(e){return y((0,s.Z)((0,s.Z)({},b),{},{phoneno:e.target.value}))},name:"phoneno"})]}),(0,x.jsxs)(h.Z.Group,{controlId:"formAge",children:[(0,x.jsx)(h.Z.Label,{children:"Age"}),(0,x.jsx)(h.Z.Control,{type:"text",placeholder:"Enter your age",value:b.age,onChange:function(e){return y((0,s.Z)((0,s.Z)({},b),{},{age:e.target.value}))},name:"age"})]}),(0,x.jsxs)(h.Z.Group,{controlId:"formNoOfPersons",children:[(0,x.jsx)(h.Z.Label,{children:"Number of Persons"}),(0,x.jsx)(h.Z.Control,{as:"select",value:b.noOfPersons,onChange:function(e){var n=parseInt(e.target.value,10);y((0,s.Z)((0,s.Z)({},b),{},{noOfPersons:n,beneficiaries:Array.from({length:n},(function(e,n){return b.beneficiaries[n]||{name:"",age:"",gender:""}}))}))},name:"noOfPersons",children:(0,o.Z)(Array(10).keys()).map((function(e){return(0,x.jsx)("option",{value:e+1,children:e+1},e+1)}))})]}),(0,x.jsxs)(h.Z.Group,{controlId:"formAppointmentDate",children:[(0,x.jsx)(h.Z.Label,{children:"Appointment Date"}),(0,x.jsx)(h.Z.Control,{as:"select",value:b.appointmentDate,onChange:function(e){return y((0,s.Z)((0,s.Z)({},b),{},{appointmentDate:e.target.value}))},name:"appointmentDate",children:function(){for(var e=[],n=new Date,r=0;r<7;r++){var a=new Date;a.setDate(n.getDate()+r);var t=a.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"});e.push((0,x.jsx)("option",{value:t,children:t},r))}return e}()})]}),(0,x.jsx)("h5",{children:"Beneficiaries"}),b.beneficiaries.map((function(e,n){return(0,x.jsxs)("div",{children:[(0,x.jsxs)(h.Z.Group,{controlId:"formBeneficiaryName".concat(n),children:[(0,x.jsxs)(h.Z.Label,{children:["Beneficiary Name ",n+1]}),(0,x.jsx)(h.Z.Control,{type:"text",placeholder:"Enter name",value:e.name,onChange:function(e){return k(n,"name",e.target.value)},name:"beneficiaryName".concat(n)})]}),(0,x.jsxs)(h.Z.Group,{controlId:"formBeneficiaryAge".concat(n),children:[(0,x.jsx)(h.Z.Label,{children:"Age"}),(0,x.jsx)(h.Z.Control,{type:"text",placeholder:"Enter age",value:e.age,onChange:function(e){return k(n,"age",e.target.value)},name:"beneficiaryAge".concat(n)})]}),(0,x.jsxs)(h.Z.Group,{controlId:"formBeneficiaryGender".concat(n),children:[(0,x.jsx)(h.Z.Label,{children:"Gender"}),(0,x.jsxs)(h.Z.Control,{as:"select",value:e.gender,onChange:function(e){return k(n,"gender",e.target.value)},name:"beneficiaryGender".concat(n),children:[(0,x.jsx)("option",{value:"",children:"Select Gender"}),(0,x.jsx)("option",{value:"Male",children:"Male"}),(0,x.jsx)("option",{value:"Female",children:"Female"}),(0,x.jsx)("option",{value:"Other",children:"Other"})]})]})]},n)}))]})}),(0,x.jsxs)(u.Z.Footer,{children:[(0,x.jsx)(f.Z,{variant:"secondary",onClick:r,children:"Close"}),(0,x.jsx)(f.Z,{variant:"primary",onClick:A,children:"Confirm Purchase"})]})]})}},3622:function(e,n,r){r.d(n,{Z:function(){return l}});var a=r(9439),t=r(2791),i=r(2677),o=r(7689),s=r(9214),c=(r(7662),r(184)),l=function(e){var n,r=e.title,l=e.productItem,d=(e.addToCart,e.showImage),u=void 0===d||d,h=e.desc,m=e.enableHoverEffect,f=e.handleAddToCart,p=(0,t.useContext)(s.c).setSelectedProduct,x=(0,o.s0)(),v=(0,t.useState)(0),j=(0,a.Z)(v,2),Z=j[0],g=j[1],b=function(){p(l),localStorage.setItem("selectedProduct-".concat(l.id),JSON.stringify(l)),x("/shop/".concat(l.id))};return(0,c.jsxs)(i.Z,{lg:3,md:4,sm:6,xs:12,className:"product mtop ".concat(m?"hover-enabled":""),children:["Big Discount"===r&&(0,c.jsxs)("span",{className:"discount",children:[l.discount,"% Off"]}),(0,c.jsxs)("div",{className:"product-image-container",children:[u&&(0,c.jsx)("img",{loading:"lazy",onClick:b,src:l.imgUrl,alt:l.productName,className:"product-image"}),m&&(0,c.jsxs)("div",{className:"hover-overlay",children:[(0,c.jsx)("h2",{children:l.overlayTitle}),(0,c.jsx)("ul",{children:null===(n=l.overlayDetails)||void 0===n?void 0:n.map((function(e,n){return(0,c.jsx)("li",{children:e},n)}))})]})]}),h&&(0,c.jsx)("p",{className:"product-description",children:h}),(0,c.jsxs)("div",{className:"product-like",children:[(0,c.jsx)("label",{children:Z})," ",(0,c.jsx)("br",{}),(0,c.jsx)("ion-icon",{name:"heart-outline",onClick:function(){g(Z+1)}})]}),(0,c.jsxs)("div",{className:"product-details",children:[(0,c.jsx)("h3",{onClick:b,children:l.productName}),(0,c.jsxs)("div",{className:"price",children:[(0,c.jsxs)("h4",{children:["\u20b9",l.price]}),(0,c.jsx)("button",{"aria-label":"Add",type:"submit",className:"add",onClick:function(){return f(l)},children:(0,c.jsx)("ion-icon",{name:"add"})})]})]})]})}},3665:function(e,n,r){r.d(n,{Z:function(){return O}});var a=r(3433),t=r(9439),i=r(9743),o=r(1413),s=r(5987),c=r(1694),l=r.n(c),d=r(2791),u=r(162),h=r(6445),m=r(184),f=["active","disabled","className","style","activeLabel","children"],p=["children"],x=d.forwardRef((function(e,n){var r=e.active,a=void 0!==r&&r,t=e.disabled,i=void 0!==t&&t,c=e.className,d=e.style,u=e.activeLabel,p=void 0===u?"(current)":u,x=e.children,v=(0,s.Z)(e,f),j=a||i?"span":h.Z;return(0,m.jsx)("li",{ref:n,style:d,className:l()(c,"page-item",{active:a,disabled:i}),children:(0,m.jsxs)(j,(0,o.Z)((0,o.Z)({className:"page-link"},v),{},{children:[x,a&&p&&(0,m.jsx)("span",{className:"visually-hidden",children:p})]}))})}));x.displayName="PageItem";var v=x;function j(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e,a=d.forwardRef((function(e,a){var t=e.children,i=(0,s.Z)(e,p);return(0,m.jsxs)(x,(0,o.Z)((0,o.Z)({},i),{},{ref:a,children:[(0,m.jsx)("span",{"aria-hidden":"true",children:t||n}),(0,m.jsx)("span",{className:"visually-hidden",children:r})]}))}));return a.displayName=e,a}var Z=j("First","\xab"),g=j("Prev","\u2039","Previous"),b=j("Ellipsis","\u2026","More"),y=j("Next","\u203a"),C=j("Last","\xbb"),N=["bsPrefix","className","size"],P=d.forwardRef((function(e,n){var r=e.bsPrefix,a=e.className,t=e.size,i=(0,s.Z)(e,N),c=(0,u.vE)(r,"pagination");return(0,m.jsx)("ul",(0,o.Z)((0,o.Z)({ref:n},i),{},{className:l()(a,c,t&&"".concat(c,"-").concat(t))}))}));P.displayName="Pagination";var I=Object.assign(P,{First:Z,Prev:g,Ellipsis:b,Item:v,Next:y,Last:C}),k=r(7689),A=r(9085),E=(r(5462),r(3622)),G=r(9214),O=function(e){var n=e.productItems,r=(0,d.useState)(1),o=(0,t.Z)(r,2),s=o[0],c=o[1],l=Math.ceil(n.length/50),u=n.slice(50*(s-1),50*s),h=(0,d.useContext)(G.c).addToCart,f=(0,k.s0)();(0,d.useEffect)((function(){}),[n]);var p=function(e){h(e);var n=A.Am.success("Product has been added to cart!",{autoClose:1e3});setTimeout((function(){A.Am.update(n,{render:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("div",{children:"Product has been added to cart!"}),(0,m.jsx)("button",{onClick:function(){f("/cart"),A.Am.dismiss(n)},style:{color:"#007bff",background:"none",border:"none",textDecoration:"underline",cursor:"pointer"},children:"Go to Cart"})]}),autoClose:!1,closeButton:!0})}),1e3)};return 0===n.length?(0,m.jsx)("h1",{className:"not-found",children:"Product Not Found !!"}):(0,m.jsxs)("div",{children:[(0,m.jsx)(A.Ix,{}),(0,m.jsx)(i.Z,{className:"justify-content-center",children:u.map((function(e){return(0,m.jsx)(E.Z,{title:null,productItem:e,addToCart:h,handleAddToCart:p,showImage:!1},e.id)}))}),(0,m.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:(0,m.jsxs)(I,{children:[(0,m.jsx)(I.Prev,{onClick:function(){return c((function(e){return Math.max(e-1,1)}))},disabled:1===s}),(0,a.Z)(Array(l)).map((function(e,n){return(0,m.jsx)(I.Item,{active:n+1===s,onClick:function(){return c(n+1)},children:n+1},n)})),(0,m.jsx)(I.Next,{onClick:function(){return c((function(e){return Math.min(e+1,l)}))},disabled:s===l})]})})]})}},9410:function(e,n,r){var a=r(5987),t=r(1413),i=r(1694),o=r.n(i),s=r(2791),c=r(6543),l=r(162),d=r(6882),u=r(1991),h=r(184),m=["bsPrefix","size","hasValidation","className","as"],f=(0,c.Z)("input-group-text",{Component:"span"}),p=s.forwardRef((function(e,n){var r=e.bsPrefix,i=e.size,c=e.hasValidation,d=e.className,f=e.as,p=void 0===f?"div":f,x=(0,a.Z)(e,m);r=(0,l.vE)(r,"input-group");var v=(0,s.useMemo)((function(){return{}}),[]);return(0,h.jsx)(u.Z.Provider,{value:v,children:(0,h.jsx)(p,(0,t.Z)((0,t.Z)({ref:n},x),{},{className:o()(d,r,i&&"".concat(r,"-").concat(i),c&&"has-validation")}))})}));p.displayName="InputGroup",n.Z=Object.assign(p,{Text:f,Radio:function(e){return(0,h.jsx)(f,{children:(0,h.jsx)(d.Z,(0,t.Z)({type:"radio"},e))})},Checkbox:function(e){return(0,h.jsx)(f,{children:(0,h.jsx)(d.Z,(0,t.Z)({type:"checkbox"},e))})}})}}]);
//# sourceMappingURL=850.736a903e.chunk.js.map