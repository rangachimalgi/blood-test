"use strict";(self.webpackChunkreact_ecommerce=self.webpackChunkreact_ecommerce||[]).push([[637],{3101:function(e,n,r){var t=r(4165),s=r(5861),o=r(4942),a=r(3433),c=r(1413),i=r(9439),l=r(2791),d=r(7022),u=r(9743),h=r(2677),m=r(5313),f=r(9410),p=r(3360),x=r(1243),g=r(2309),j=r(184);n.Z=function(e){var n=e.CartItem,r=e.setCartItem,Z=(0,l.useState)({pincode:"",name:"",email:"",address:"",phoneno:"",age:"",noOfPersons:1,appointmentDate:"",beneficiaries:[{name:"",age:"",gender:""}],tests:[]}),v=(0,i.Z)(Z,2),y=v[0],b=v[1],C=(0,l.useState)(""),N=(0,i.Z)(C,2),k=N[0],P=N[1];(0,l.useEffect)((function(){b((function(e){return(0,c.Z)((0,c.Z)({},e),{},{beneficiaries:Array.from({length:e.noOfPersons},(function(){return{name:"",age:"",gender:""}}))})}))}),[y.noOfPersons]);var T=function(e,n,r){var t=(0,a.Z)(y.beneficiaries);t[e]=(0,c.Z)((0,c.Z)({},t[e]),{},(0,o.Z)({},n,r)),b((0,c.Z)((0,c.Z)({},y),{},{beneficiaries:t}))},A=function(e,n){var r=(0,a.Z)(y.tests);n?r.includes(e)||r.push(e):r=r.filter((function(n){return n!==e})),b((0,c.Z)((0,c.Z)({},y),{},{tests:r}))},I=function(){var e=(0,s.Z)((0,t.Z)().mark((function e(){var s;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Order Data before submission:",y),s={pincode:y.pincode,name:y.name,email:y.email,address:y.address,phoneno:y.phoneno,age:y.age,noOfPersons:y.noOfPersons,appointmentDate:y.appointmentDate,beneficiaries:y.beneficiaries.map((function(e){return{name:e.name,age:e.age,gender:e.gender}})),tests:y.tests,cartItems:n},e.prev=2,e.next=5,x.Z.post("".concat("https://blood-test-l0ts.onrender.com","/api/orders"),s);case 5:e.sent.data.success?(r([]),alert("Order submitted successfully!")):alert("Error submitting order. Please try again."),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(2),console.error("Error submitting order:",e.t0),alert("Error submitting order. Please try again.");case 13:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(){return e.apply(this,arguments)}}();return(0,j.jsx)(d.Z,{className:"embedded-checkout-form",children:(0,j.jsx)(u.Z,{children:(0,j.jsxs)(h.Z,{md:12,children:[(0,j.jsx)("h3",{className:"form-heading",children:"Booking Form"}),(0,j.jsxs)(m.Z,{children:[(0,j.jsxs)(m.Z.Group,{controlId:"formPincode",children:[(0,j.jsxs)(f.Z,{children:[(0,j.jsx)(m.Z.Control,{type:"text",placeholder:"Enter Pincode",value:y.pincode,onChange:function(e){return b((0,c.Z)((0,c.Z)({},y),{},{pincode:e.target.value}))},name:"pincode",className:"form-control"}),(0,j.jsx)(p.Z,{variant:"outline-secondary",onClick:function(){g.G.includes(y.pincode)?P("Service is available in your pincode!"):P("Sorry, service is not available in your pincode.")},children:"Check Availability"})]}),(0,j.jsx)(m.Z.Text,{className:"text-muted",children:k})]}),(0,j.jsxs)(m.Z.Group,{controlId:"formName",children:[(0,j.jsx)(m.Z.Label,{children:"Name :"}),(0,j.jsx)(m.Z.Control,{type:"text",placeholder:"Enter your name",value:y.name,onChange:function(e){return b((0,c.Z)((0,c.Z)({},y),{},{name:e.target.value}))},name:"name",className:"form-control"})]}),(0,j.jsxs)(m.Z.Group,{controlId:"formEmail",children:[(0,j.jsx)(m.Z.Label,{children:"Email"}),(0,j.jsx)(m.Z.Control,{type:"email",placeholder:"Enter your email",value:y.email,onChange:function(e){return b((0,c.Z)((0,c.Z)({},y),{},{email:e.target.value}))},name:"email",className:"form-control"})]}),(0,j.jsxs)(m.Z.Group,{controlId:"formAddress",children:[(0,j.jsx)(m.Z.Label,{children:"Address"}),(0,j.jsx)(m.Z.Control,{type:"text",placeholder:"Enter your address",value:y.address,onChange:function(e){return b((0,c.Z)((0,c.Z)({},y),{},{address:e.target.value}))},name:"address",className:"form-control"})]}),(0,j.jsxs)(m.Z.Group,{controlId:"formPhoneNo",children:[(0,j.jsx)(m.Z.Label,{children:"Phone No"}),(0,j.jsx)(m.Z.Control,{type:"text",placeholder:"Enter your phone no",value:y.phoneno,onChange:function(e){return b((0,c.Z)((0,c.Z)({},y),{},{phoneno:e.target.value}))},name:"phoneno",className:"form-control"})]}),(0,j.jsxs)(m.Z.Group,{controlId:"formAge",children:[(0,j.jsx)(m.Z.Label,{children:"Age"}),(0,j.jsx)(m.Z.Control,{type:"text",placeholder:"Enter your age",value:y.age,onChange:function(e){return b((0,c.Z)((0,c.Z)({},y),{},{age:e.target.value}))},name:"age",className:"form-control"})]}),(0,j.jsxs)(m.Z.Group,{controlId:"formNoOfPersons",children:[(0,j.jsx)(m.Z.Label,{children:"Number of Persons"}),(0,j.jsx)(m.Z.Control,{as:"select",value:y.noOfPersons,onChange:function(e){var n=parseInt(e.target.value,10);b((0,c.Z)((0,c.Z)({},y),{},{noOfPersons:n,beneficiaries:Array.from({length:n},(function(e,n){return y.beneficiaries[n]||{name:"",age:"",gender:""}}))}))},name:"noOfPersons",className:"form-control",children:(0,a.Z)(Array(10).keys()).map((function(e){return(0,j.jsx)("option",{value:e+1,children:e+1},e+1)}))}),(0,j.jsx)(m.Z.Text,{className:"text-warning",children:"Note : The same set of tests/packages will be added for all persons."})]}),(0,j.jsxs)(m.Z.Group,{controlId:"formAppointmentDate",children:[(0,j.jsx)(m.Z.Label,{children:"Appointment Date"}),(0,j.jsx)(m.Z.Control,{as:"select",value:y.appointmentDate,onChange:function(e){return b((0,c.Z)((0,c.Z)({},y),{},{appointmentDate:e.target.value}))},name:"appointmentDate",className:"form-control",children:function(){for(var e=[],n=new Date,r=0;r<7;r++){var t=new Date;t.setDate(n.getDate()+r);var s=t.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"});e.push((0,j.jsx)("option",{value:s,children:s},r))}return e}()})]}),(0,j.jsx)("h5",{children:"Beneficiaries"}),y.beneficiaries.map((function(e,n){return(0,j.jsxs)("div",{children:[(0,j.jsxs)(m.Z.Group,{controlId:"formBeneficiaryName".concat(n),children:[(0,j.jsxs)(m.Z.Label,{children:["Beneficiary Name ",n+1]}),(0,j.jsx)(m.Z.Control,{type:"text",placeholder:"Enter name",value:e.name,onChange:function(e){return T(n,"name",e.target.value)},name:"beneficiaryName".concat(n),className:"form-control"})]}),(0,j.jsxs)(m.Z.Group,{controlId:"formBeneficiaryAge".concat(n),children:[(0,j.jsx)(m.Z.Label,{children:"Age"}),(0,j.jsx)(m.Z.Control,{type:"text",placeholder:"Enter age",value:e.age,onChange:function(e){return T(n,"age",e.target.value)},name:"beneficiaryAge".concat(n),className:"form-control"})]}),(0,j.jsxs)(m.Z.Group,{controlId:"formBeneficiaryGender".concat(n),children:[(0,j.jsx)(m.Z.Label,{children:"Gender"}),(0,j.jsxs)(m.Z.Control,{as:"select",value:e.gender,onChange:function(e){return T(n,"gender",e.target.value)},name:"beneficiaryGender".concat(n),className:"form-control",children:[(0,j.jsx)("option",{value:"",children:"Select Gender"}),(0,j.jsx)("option",{value:"Male",children:"Male"}),(0,j.jsx)("option",{value:"Female",children:"Female"}),(0,j.jsx)("option",{value:"Other",children:"Other"})]})]})]},n)})),(0,j.jsx)("h5",{children:"Select Additional Tests (Optional)"}),(0,j.jsxs)(m.Z.Group,{controlId:"formAdditionalTests",children:[(0,j.jsx)(m.Z.Check,{type:"checkbox",label:"Fasting Blood Sugar (FBS) @ Rs. 80 / Person",checked:y.tests.includes("Fasting Blood Sugar (FBS)"),onChange:function(e){return A("Fasting Blood Sugar (FBS)",e.target.checked)}}),(0,j.jsx)(m.Z.Check,{type:"checkbox",label:"CRP Test @ Rs. 480 / Person",checked:y.tests.includes("CRP Test"),onChange:function(e){return A("CRP Test",e.target.checked)}}),(0,j.jsx)(m.Z.Check,{type:"checkbox",label:"ESR Test @ Rs. 120 / Person",checked:y.tests.includes("ESR Test"),onChange:function(e){return A("ESR Test",e.target.checked)}}),(0,j.jsx)(m.Z.Check,{type:"checkbox",label:"Covid Antibody IgG @ Rs. 400 / Person",checked:y.tests.includes("Covid Antibody IgG"),onChange:function(e){return A("Covid Antibody IgG",e.target.checked)}}),(0,j.jsx)(m.Z.Check,{type:"checkbox",label:"Complete Urine Analysis @ Rs. 510 / Person",checked:y.tests.includes("Complete Urine Analysis"),onChange:function(e){return A("Complete Urine Analysis",e.target.checked)}}),(0,j.jsx)(m.Z.Check,{type:"checkbox",label:"Troponin - Heart Attack Risk Test (ACTNI) @ Rs. 650 / Person",checked:y.tests.includes("Troponin - Heart Attack Risk Test (ACTNI)"),onChange:function(e){return A("Troponin - Heart Attack Risk Test (ACTNI)",e.target.checked)}})]}),(0,j.jsx)(p.Z,{variant:"primary",onClick:I,className:"confirm-button",children:"Book Now"})]})]})})})}},737:function(e,n,r){r.r(n);var t=r(9439),s=r(2791),o=r(8697),a=r(9214),c=r(7022),i=r(9743),l=r(2677),d=(r(3665),r(8453)),u=r(7689),h=(r(9085),r(3101)),m=(r(838),r(184));n.default=function(){var e=(0,s.useState)("desc"),n=(0,t.Z)(e,2),r=n[0],f=n[1],p=(0,s.useState)([]),x=(0,t.Z)(p,2),g=(x[0],x[1]),j=(0,s.useState)([]),Z=(0,t.Z)(j,2),v=(Z[0],Z[1]),y=(0,s.useState)(null),b=(0,t.Z)(y,2),C=b[0],N=b[1],k=(0,s.useContext)(a.c),P=k.selectedProduct,T=k.setSelectedProduct,A=(k.addToCart,(0,u.UO)().id),I=(0,s.useState)(1),S=(0,t.Z)(I,2);S[0],S[1];(0,s.useEffect)((function(){if(!P){var e=localStorage.getItem("selectedProduct-".concat(A));T(JSON.parse(e))}}),[A,P,T]),(0,s.useEffect)((function(){if(window.scrollTo(0,0),null!==P&&void 0!==P&&P.includedTests){var e=P.includedTests.flatMap((function(e){return e.tests}));v(d.RB.filter((function(n){return e.includes(n.id)})))}g(d.RB.filter((function(e){return e.category===(null===P||void 0===P?void 0:P.category)&&e.id!==(null===P||void 0===P?void 0:P.id)})))}),[P]),(0,s.useEffect)((function(){return function(){T(null)}}),[T]);return(0,m.jsxs)(s.Fragment,{children:[(0,m.jsx)(o.Z,{title:null===P||void 0===P?void 0:P.productName}),(0,m.jsx)(c.Z,{className:"product-page",children:(0,m.jsxs)(i.Z,{children:[(0,m.jsx)(l.Z,{md:8,children:(0,m.jsxs)("div",{className:"product-box",children:[(0,m.jsx)("section",{children:(0,m.jsxs)(i.Z,{className:"justify-content-center",children:[(0,m.jsx)(l.Z,{md:6,children:(0,m.jsx)("img",{loading:"lazy",src:null===P||void 0===P?void 0:P.imgUrl,alt:""})}),(0,m.jsx)("h1",{children:null===P||void 0===P?void 0:P.products}),(0,m.jsxs)(l.Z,{md:6,children:[(0,m.jsx)("h2",{children:null===P||void 0===P?void 0:P.productName}),(0,m.jsxs)("div",{className:"info",children:[(0,m.jsxs)("span",{className:"price",children:["\u20b9",null===P||void 0===P?void 0:P.price]}),(0,m.jsxs)("span",{children:["category: ",null===P||void 0===P?void 0:P.category]})]}),(0,m.jsx)("p",{children:null===P||void 0===P?void 0:P.shortDesc})]})]})}),(null===P||void 0===P?void 0:P.includedTests)&&P.includedTests.length>0&&(0,m.jsxs)("section",{className:"included-tests",children:[(0,m.jsx)("h3",{children:"Included Tests"}),P.includedTests.map((function(e){return(0,m.jsxs)("div",{children:[(0,m.jsxs)("h4",{onClick:function(){return N(C===e.categoryName?null:e.categoryName)},style:{cursor:"pointer",display:"flex",alignItems:"center"},children:[C===e.categoryName?(0,m.jsx)("i",{className:"fa fa-chevron-down",style:{marginRight:"10px"}}):(0,m.jsx)("i",{className:"fa fa-chevron-right",style:{marginRight:"10px"}}),e.categoryName]}),C===e.categoryName&&(0,m.jsx)(i.Z,{children:e.tests.map((function(e){var n=d.RB.find((function(n){return n.id===e}));return(0,m.jsx)(l.Z,{md:4,children:(0,m.jsxs)("div",{className:"test-item",children:[(0,m.jsx)("h5",{children:n.productName}),(0,m.jsx)("p",{children:n.shortDesc})]})},e)}))})]},e.categoryName)}))]}),(0,m.jsxs)("section",{className:"product-reviews",children:[(0,m.jsx)("ul",{children:(0,m.jsx)("li",{style:{color:"desc"===r?"black":"#9c9b9b"},onClick:function(){return f("desc")},children:"Description"})}),"desc"===r?(0,m.jsx)("p",{children:null===P||void 0===P?void 0:P.description}):(0,m.jsx)("div",{className:"rates",children:null===P||void 0===P?void 0:P.reviews.map((function(e){return(0,m.jsxs)("div",{className:"rate-comment",children:[(0,m.jsx)("span",{children:"Jhon Doe"}),(0,m.jsxs)("span",{children:[e.rating," (rating)"]}),(0,m.jsx)("p",{children:e.text})]},e.rating)}))})]})]})}),(0,m.jsx)(l.Z,{md:4,children:(0,m.jsx)("div",{className:"checkout-box form-container",children:(0,m.jsx)(h.Z,{CartItem:P?[P]:[],setCartItem:T})})})]})})]})}},838:function(){}}]);
//# sourceMappingURL=637.9a577547.chunk.js.map