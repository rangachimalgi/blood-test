"use strict";(self.webpackChunkreact_ecommerce=self.webpackChunkreact_ecommerce||[]).push([[732],{8697:function(e,n,s){s.d(n,{Z:function(){return l}});var t=s(7022),i=s(9743),a=s(2677),c=s.p+"static/media/table.c96637810cb2ae358aca.jpg",r=s(184),l=function(e){var n=e.title;return(0,r.jsxs)("div",{className:"image-container",children:[(0,r.jsx)("img",{src:c,alt:"Product-bg"}),(0,r.jsx)("div",{className:"overlay",children:(0,r.jsx)(t.Z,{children:(0,r.jsx)(i.Z,{children:(0,r.jsx)(a.Z,{children:(0,r.jsx)("h2",{children:n})})})})})]})}},3622:function(e,n,s){s.d(n,{Z:function(){return o}});var t=s(9439),i=s(2791),a=s(2677),c=s(7689),r=s(379),l=s(9085),d=s(184),o=function(e){var n,s=e.title,o=e.productItem,u=e.addToCart,h=e.showImage,m=void 0===h||h,f=e.desc,x=e.enableHoverEffect,v=(0,i.useContext)(r.c).setSelectedProduct,j=(0,c.s0)(),p=(0,i.useState)(0),N=(0,t.Z)(p,2),g=N[0],Z=N[1],b=function(){v(o),localStorage.setItem("selectedProduct-".concat(o.id),JSON.stringify(o)),j("/shop/".concat(o.id))};return(0,d.jsxs)(a.Z,{lg:3,md:4,sm:6,xs:12,className:"product mtop ".concat(x?"hover-enabled":""),children:["Big Discount"===s&&(0,d.jsxs)("span",{className:"discount",children:[o.discount,"% Off"]}),(0,d.jsxs)("div",{className:"product-image-container",children:[m&&(0,d.jsx)("img",{loading:"lazy",onClick:b,src:o.imgUrl,alt:o.productName,className:"product-image"}),x&&(0,d.jsxs)("div",{className:"hover-overlay",children:[(0,d.jsx)("h2",{children:o.overlayTitle}),(0,d.jsx)("ul",{children:null===(n=o.overlayDetails)||void 0===n?void 0:n.map((function(e,n){return(0,d.jsx)("li",{children:e},n)}))})]})]}),f&&(0,d.jsx)("p",{className:"product-description",children:f}),(0,d.jsxs)("div",{className:"product-like",children:[(0,d.jsx)("label",{children:g})," ",(0,d.jsx)("br",{}),(0,d.jsx)("ion-icon",{name:"heart-outline",onClick:function(){Z(g+1)}})]}),(0,d.jsxs)("div",{className:"product-details",children:[(0,d.jsx)("h3",{onClick:b,children:o.productName}),(0,d.jsxs)("div",{className:"price",children:[(0,d.jsxs)("h4",{children:["\u20b9",o.price]}),(0,d.jsx)("button",{"aria-label":"Add",type:"submit",className:"add",onClick:function(){return function(e){u(e),l.Am.success("Product has been added to cart!")}(o)},children:(0,d.jsx)("ion-icon",{name:"add"})})]})]})]})}},3665:function(e,n,s){s.d(n,{Z:function(){return I}});var t=s(3433),i=s(9439),a=s(9743),c=s(1413),r=s(5987),l=s(1694),d=s.n(l),o=s(2791),u=s(162),h=s(6445),m=s(184),f=["active","disabled","className","style","activeLabel","children"],x=["children"],v=o.forwardRef((function(e,n){var s=e.active,t=void 0!==s&&s,i=e.disabled,a=void 0!==i&&i,l=e.className,o=e.style,u=e.activeLabel,x=void 0===u?"(current)":u,v=e.children,j=(0,r.Z)(e,f),p=t||a?"span":h.Z;return(0,m.jsx)("li",{ref:n,style:o,className:d()(l,"page-item",{active:t,disabled:a}),children:(0,m.jsxs)(p,(0,c.Z)((0,c.Z)({className:"page-link"},j),{},{children:[v,t&&x&&(0,m.jsx)("span",{className:"visually-hidden",children:x})]}))})}));v.displayName="PageItem";var j=v;function p(e,n){var s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e,t=o.forwardRef((function(e,t){var i=e.children,a=(0,r.Z)(e,x);return(0,m.jsxs)(v,(0,c.Z)((0,c.Z)({},a),{},{ref:t,children:[(0,m.jsx)("span",{"aria-hidden":"true",children:i||n}),(0,m.jsx)("span",{className:"visually-hidden",children:s})]}))}));return t.displayName=e,t}var N=p("First","\xab"),g=p("Prev","\u2039","Previous"),Z=p("Ellipsis","\u2026","More"),b=p("Next","\u203a"),y=p("Last","\xbb"),C=["bsPrefix","className","size"],k=o.forwardRef((function(e,n){var s=e.bsPrefix,t=e.className,i=e.size,a=(0,r.Z)(e,C),l=(0,u.vE)(s,"pagination");return(0,m.jsx)("ul",(0,c.Z)((0,c.Z)({ref:n},a),{},{className:d()(t,l,i&&"".concat(l,"-").concat(i))}))}));k.displayName="Pagination";var P=Object.assign(k,{First:N,Prev:g,Ellipsis:Z,Item:j,Next:b,Last:y}),w=s(3622),I=function(e){var n=e.productItems,s=e.addToCart,c=(0,o.useState)(1),r=(0,i.Z)(c,2),l=r[0],d=r[1],u=Math.ceil(n.length/50),h=n.slice(50*(l-1),50*l);return(0,o.useEffect)((function(){}),[n]),0===n.length?(0,m.jsx)("h1",{className:"not-found",children:"Product Not Found !!"}):(0,m.jsxs)("div",{children:[(0,m.jsx)(a.Z,{className:"justify-content-center",children:h.map((function(e){return(0,m.jsx)(w.Z,{title:null,productItem:e,addToCart:s,showImage:!1},e.id)}))}),(0,m.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:(0,m.jsxs)(P,{children:[(0,m.jsx)(P.Prev,{onClick:function(){return d((function(e){return Math.max(e-1,1)}))},disabled:1===l}),(0,t.Z)(Array(u)).map((function(e,n){return(0,m.jsx)(P.Item,{active:n+1===l,onClick:function(){return d(n+1)},children:n+1},n)})),(0,m.jsx)(P.Next,{onClick:function(){return d((function(e){return Math.min(e+1,u)}))},disabled:l===u})]})})]})}},167:function(e,n,s){s.r(n),s.d(n,{default:function(){return f}});var t=s(9439),i=s(7022),a=s(9743),c=s(2677),r=(s(1413),s(8453)),l=s(184),d=s(2791),o=function(e){var n=e.setFilterList,s=(0,d.useState)(null),i=(0,t.Z)(s,2),a=i[0],c=i[1];return(0,l.jsxs)("div",{className:"search-container",children:[(0,l.jsx)("input",{type:"text",placeholder:"Search...",onChange:function(e){c(e.target.value),n(r.RB.filter((function(e){var n;return null===(n=e.productName)||void 0===n?void 0:n.toLowerCase().includes(null===a||void 0===a?void 0:a.toLowerCase())})))}}),(0,l.jsx)("ion-icon",{name:"search-outline",className:"search-icon"})]})},u=s(3665),h=(s(8697),s(379)),m=s(7689),f=function(){var e=(0,d.useContext)(h.c),n=e.addToCart,s=e.globalFilterList,r=((0,m.UO)().id,(0,d.useState)(s)),f=(0,t.Z)(r,2),x=f[0],v=f[1];return(0,d.useEffect)((function(){window.scrollTo(0,0)}),[]),(0,d.useEffect)((function(){v(s)}),[s]),(0,l.jsx)(d.Fragment,{children:(0,l.jsxs)("section",{className:"filter-bar",children:[(0,l.jsx)(i.Z,{className:"filter-bar-container",children:(0,l.jsx)(a.Z,{className:"justify-content-center",children:(0,l.jsx)(c.Z,{md:12,children:(0,l.jsx)(o,{setFilterList:v})})})}),(0,l.jsx)(i.Z,{children:(0,l.jsx)(u.Z,{productItems:x,addToCart:n})})]})})}}}]);
//# sourceMappingURL=732.1a422f60.chunk.js.map