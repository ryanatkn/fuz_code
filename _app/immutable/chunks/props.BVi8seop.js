import{S as x,o as z,q as G,u as m,v as H,w as h,U as c,x as N,y as P,z as F,A as V,B as k,C as J,b as Q,D as B,e as C,F as Y,h as L,d as W,E as X,G as p,I as ee,k as re,J as M,g as ae,K as te,L as ne,P as fe,M as ie,N as U,O as se,R as ue,Q as K,T as le,V as ve,W as _e,X as Z,Y as de,Z as ce,_ as oe,$ as ye,a0 as be}from"./runtime.Bchdziex.js";import{e as ge}from"./disclose-version.CjEqvbVj.js";function w(f,u=null,b){if(typeof f!="object"||f===null||x in f)return f;const g=k(f);if(g!==z&&g!==G)return f;var i=new Map,l=J(f),d=m(0);l&&i.set("length",m(f.length));var _;return new Proxy(f,{defineProperty(t,e,r){(!("value"in r)||r.configurable===!1||r.enumerable===!1||r.writable===!1)&&H();var a=i.get(e);return a===void 0?(a=m(r.value),i.set(e,a)):h(a,w(r.value,_)),!0},deleteProperty(t,e){var r=i.get(e);if(r===void 0)e in t&&i.set(e,m(c));else{if(l&&typeof e=="string"){var a=i.get("length"),n=Number(e);Number.isInteger(n)&&n<a.v&&h(a,n)}h(r,c),$(d)}return!0},get(t,e,r){var o;if(e===x)return f;var a=i.get(e),n=e in t;if(a===void 0&&(!n||(o=N(t,e))!=null&&o.writable)&&(a=m(w(n?t[e]:c,_)),i.set(e,a)),a!==void 0){var s=P(a);return s===c?void 0:s}return Reflect.get(t,e,r)},getOwnPropertyDescriptor(t,e){var r=Reflect.getOwnPropertyDescriptor(t,e);if(r&&"value"in r){var a=i.get(e);a&&(r.value=P(a))}else if(r===void 0){var n=i.get(e),s=n==null?void 0:n.v;if(n!==void 0&&s!==c)return{enumerable:!0,configurable:!0,value:s,writable:!0}}return r},has(t,e){var s;if(e===x)return!0;var r=i.get(e),a=r!==void 0&&r.v!==c||Reflect.has(t,e);if(r!==void 0||F!==null&&(!a||(s=N(t,e))!=null&&s.writable)){r===void 0&&(r=m(a?w(t[e],_):c),i.set(e,r));var n=P(r);if(n===c)return!1}return a},set(t,e,r,a){var S;var n=i.get(e),s=e in t;if(l&&e==="length")for(var o=r;o<n.v;o+=1){var y=i.get(o+"");y!==void 0?h(y,c):o in t&&(y=m(c),i.set(o+"",y))}n===void 0?(!s||(S=N(t,e))!=null&&S.writable)&&(n=m(void 0),h(n,w(r,_)),i.set(e,n)):(s=n.v!==c,h(n,w(r,_)));var E=Reflect.getOwnPropertyDescriptor(t,e);if(E!=null&&E.set&&E.set.call(a,r),!s){if(l&&typeof e=="string"){var A=i.get("length"),R=Number(e);Number.isInteger(R)&&R>=A.v&&h(A,R+1)}$(d)}return!0},ownKeys(t){P(d);var e=Reflect.ownKeys(t).filter(n=>{var s=i.get(n);return s===void 0||s.v!==c});for(var[r,a]of i)a.v!==c&&!(r in t)&&e.push(r);return e},setPrototypeOf(){V()}})}function $(f,u=1){h(f,f.v+u)}function me(f,u,b,g=null,i=!1){L&&W();var l=f,d=null,_=null,t=null,e=i?X:0;Q(()=>{if(t===(t=!!u()))return;let r=!1;if(L){const a=l.data===p;t===a&&(l=ee(),re(l),M(!1),r=!0)}t?(d?B(d):d=C(()=>b(l)),_&&Y(_,()=>{_=null})):(_?B(_):g&&(_=C(()=>g(l))),d&&Y(d,()=>{d=null})),r&&M(!0)},e),L&&(l=ae)}function j(f){for(var u=F,b=F;u!==null&&!(u.f&(se|ue));)u=u.parent;try{return K(u),f()}finally{K(b)}}function Ee(f,u,b,g){var q;var i=(b&le)!==0,l=(b&ve)!==0,d=(b&_e)!==0,_=(b&ye)!==0,t=!1,e;d?[e,t]=ge(()=>f[u]):e=f[u];var r=(q=N(f,u))==null?void 0:q.set,a=g,n=!0,s=!1,o=()=>(s=!0,n&&(n=!1,_?a=U(g):a=g),a);e===void 0&&g!==void 0&&(r&&l&&te(),e=o(),r&&r(e));var y;if(l)y=()=>{var v=f[u];return v===void 0?o():(n=!0,s=!1,v)};else{var E=j(()=>(i?Z:de)(()=>f[u]));E.f|=ne,y=()=>{var v=P(E);return v!==void 0&&(a=void 0),v===void 0?a:v}}if(!(b&fe))return y;if(r){var A=f.$$legacy;return function(v,I){return arguments.length>0?((!l||!I||A||t)&&r(I?y():v),v):y()}}var R=!1,S=!1,D=be(e),T=j(()=>Z(()=>{var v=y(),I=P(D),O=ce;return R||v===void 0&&O.f&oe?(R=!1,S=!0,I):(S=!1,D.v=v)}));return i||(T.equals=ie),function(v,I){if(arguments.length>0){const O=I?P(T):l&&d?w(v):v;return T.equals(O)||(R=!0,h(D,O),s&&a!==void 0&&(a=O),U(()=>P(T))),v}return P(T)}}export{w as a,me as i,Ee as p};
