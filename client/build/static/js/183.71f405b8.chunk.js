"use strict";(self.webpackChunkreact_ecommerce=self.webpackChunkreact_ecommerce||[]).push([[183],{4404:function(e,r,a){a.r(r),a.d(r,{default:function(){return A}});var t=a(9439),n=a(7022),s=a(9743),c=a(2677),i=a(1413),o=a(8453),l=a(184),d=a(2791),u=function(e){var r=e.setFilterList,a=(0,d.useState)(null),n=(0,t.Z)(a,2),s=n[0],c=n[1];return(0,l.jsxs)("div",{className:"search-container",children:[(0,l.jsx)("input",{type:"text",placeholder:"Search...",onChange:function(e){c(e.target.value),r(o.RB.filter((function(e){var r;return null===(r=e.productName)||void 0===r?void 0:r.toLowerCase().includes(null===s||void 0===s?void 0:s.toLowerCase())})))}}),(0,l.jsx)("ion-icon",{name:"search-outline",className:"search-icon"})]})},m=a(3665),f=(a(8697),a(9214)),x=a(7689),h=a(5987),v=a(1694),j=a.n(v),Z=a(162),b=a(6543),N=a(7472),C=["bsPrefix","className","variant","as"],p=d.forwardRef((function(e,r){var a=e.bsPrefix,t=e.className,n=e.variant,s=e.as,c=void 0===s?"img":s,o=(0,h.Z)(e,C),d=(0,Z.vE)(a,"card-img");return(0,l.jsx)(c,(0,i.Z)({ref:r,className:j()(n?"".concat(d,"-").concat(n):d,t)},o))}));p.displayName="CardImg";var w=p,y=a(6040),g=["bsPrefix","className","as"],k=d.forwardRef((function(e,r){var a=e.bsPrefix,t=e.className,n=e.as,s=void 0===n?"div":n,c=(0,h.Z)(e,g),o=(0,Z.vE)(a,"card-header"),u=(0,d.useMemo)((function(){return{cardHeaderBsPrefix:o}}),[o]);return(0,l.jsx)(y.Z.Provider,{value:u,children:(0,l.jsx)(s,(0,i.Z)((0,i.Z)({ref:r},c),{},{className:j()(t,o)}))})}));k.displayName="CardHeader";var P=k,I=["bsPrefix","className","bg","text","border","body","children","as"],B=(0,N.Z)("h5"),T=(0,N.Z)("h6"),F=(0,b.Z)("card-body"),L=(0,b.Z)("card-title",{Component:B}),S=(0,b.Z)("card-subtitle",{Component:T}),E=(0,b.Z)("card-link",{Component:"a"}),R=(0,b.Z)("card-text",{Component:"p"}),H=(0,b.Z)("card-footer"),q=(0,b.Z)("card-img-overlay"),O=d.forwardRef((function(e,r){var a=e.bsPrefix,t=e.className,n=e.bg,s=e.text,c=e.border,o=e.body,d=void 0!==o&&o,u=e.children,m=e.as,f=void 0===m?"div":m,x=(0,h.Z)(e,I),v=(0,Z.vE)(a,"card");return(0,l.jsx)(f,(0,i.Z)((0,i.Z)({ref:r},x),{},{className:j()(t,v,n&&"bg-".concat(n),s&&"text-".concat(s),c&&"border-".concat(c)),children:d?(0,l.jsx)(F,{children:u}):u}))}));O.displayName="Card";var V=Object.assign(O,{Img:w,Title:L,Subtitle:S,Body:F,Link:E,Text:R,Header:P,Footer:H,ImgOverlay:q}),_=a(3360),M=a(9135),U=function(e){var r=e.onBookNow,a=(0,d.useContext)(f.c),t=a.CartItem,n=a.deleteProduct,s=t.reduce((function(e,r){return e+r.qty*r.price}),0);return(0,l.jsx)(V,{className:"cart-summary",children:(0,l.jsxs)(V.Body,{children:[(0,l.jsx)(V.Title,{children:"Cart Summary"}),0===t.length?(0,l.jsx)("p",{children:"No items in the cart."}):(0,l.jsx)("ul",{children:t.map((function(e,r){return(0,l.jsxs)("li",{className:"cart-item",children:[(0,l.jsxs)("span",{className:"serial-number",children:[r+1,". "]}),(0,l.jsxs)("span",{children:[e.productName," x ",e.qty," = \u20b9",e.price*e.qty]}),(0,l.jsx)(_.Z,{variant:"danger",onClick:function(){return n(e)},className:"remove-icon-button",children:(0,l.jsx)(M.iFH,{className:"remove-icon"})})]},e.id)}))}),(0,l.jsxs)("h4",{children:["Total Price: \u20b9",s]}),(0,l.jsx)(_.Z,{onClick:r,className:"book-now-button",children:"Book Now"})]})})},z=a(7662),A=(a(8594),function(){var e=(0,d.useContext)(f.c),r=e.addToCart,a=e.globalFilterList,i=((0,x.UO)().id,(0,d.useState)(a)),o=(0,t.Z)(i,2),h=o[0],v=o[1],j=(0,d.useState)(!1),Z=(0,t.Z)(j,2),b=Z[0],N=Z[1],C=(0,d.useRef)(null);(0,d.useEffect)((function(){window.scrollTo(0,0)}),[]),(0,d.useEffect)((function(){v(a)}),[a]);return(0,l.jsxs)(d.Fragment,{children:[(0,l.jsxs)("section",{className:"filter-bar",children:[(0,l.jsx)(n.Z,{className:"filter-bar-container",children:(0,l.jsx)(s.Z,{className:"justify-content-center",children:(0,l.jsx)(c.Z,{md:12,children:(0,l.jsx)(u,{setFilterList:v})})})}),(0,l.jsx)(n.Z,{children:(0,l.jsxs)(s.Z,{children:[(0,l.jsx)(c.Z,{md:8,children:(0,l.jsx)(m.Z,{productItems:h,addToCart:r})}),(0,l.jsx)(c.Z,{md:4,ref:C,children:(0,l.jsx)(U,{onBookNow:function(){N(!0)}})})]})}),(0,l.jsx)("button",{onClick:function(){C.current&&C.current.scrollIntoView({behavior:"smooth"})},className:"fixed-view-cart-button",children:"View Cart"})]}),b&&(0,l.jsx)(z.Z,{show:b,handleClose:function(){N(!1)},CartItem:h,setCartItem:function(){}})]})})}}]);
//# sourceMappingURL=183.71f405b8.chunk.js.map