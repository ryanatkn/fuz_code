import{a as b,t as Z,d as q,e as ye}from"../chunks/disclose-version.EP6Mcciw.js";import{p as pe,a as ve,t as O,f as D,c as g,r as p,s as f,y as E,n as we,T as ue,am as Q}from"../chunks/runtime.BqA-ut3V.js";import{s as V,a as fe,f as Ae,t as ke,b as he,p as Se,L as Ee,c as Ce,d as Te}from"../chunks/package.DpGDTZPC.js";import{s as B}from"../chunks/render.C7lrwJRz.js";import{i as P,p as ge}from"../chunks/props.C1DEocty.js";import{s as Y,h as je}from"../chunks/snippet.Dt2F4S23.js";import{s as Pe,a as ze,p as Ie}from"../chunks/stores.D7xR4oDu.js";import{b as De}from"../chunks/entry.DjxzX35F.js";var Le=Z('<div class="repo_name svelte-1widkfd"> </div>'),Me=Z("<img>"),Re=Z("<blockquote> </blockquote>"),qe=Z('<p class="text_align_center"> <!></p>'),Oe=Z('<div class="homepage_url svelte-1widkfd"><a class="chip svelte-1widkfd"> </a></div>'),Ze=Z('<a class="chip svelte-1widkfd">repo</a>'),Ge=Z('<a class="chip svelte-1widkfd" title="version"> </a>'),He=Z('<a class="chip svelte-1widkfd">npm</a>'),Ue=Z('<blockquote class="npm_url svelte-1widkfd"> </blockquote>'),Be=Z('<div class="package_summary svelte-1widkfd"><header class="box svelte-1widkfd"><!>  <!></header> <!> <!> <!> <!> <div class="links svelte-1widkfd"><!> <!> <!></div> <!></div>');function We(m,l){pe(l,!0);const s=Pe(),d=()=>ze(Ie,"$page",s),c=ue(()=>l.pkg.package_json);var _=Be(),w=g(_),i=g(w);P(i,()=>l.repo_name,a=>{var e=q(),r=D(e);Y(r,()=>l.repo_name,()=>l.pkg.repo_name),b(a,e)},a=>{var e=Le(),r=g(e);p(e),O(()=>B(r,l.pkg.repo_name)),b(a,e)});var F=f(i,2);P(F,()=>l.pkg.logo_url,a=>{var e=q(),r=D(e);P(r,()=>l.logo,n=>{var t=q(),o=D(t);Y(o,()=>l.logo,()=>l.pkg.logo_url,()=>l.pkg.logo_alt),b(n,t)},n=>{var t=Me();O(()=>{V(t,"src",l.pkg.logo_url),V(t,"alt",l.pkg.logo_alt),fe(t,"width","var(--size, var(--icon_size_xl2))"),fe(t,"height","var(--size, var(--icon_size_xl2))")}),b(n,t)}),b(a,e)}),p(w);var S=f(w,2);P(S,()=>E(c).motto,a=>{var e=q(),r=D(e);P(r,()=>l.motto,n=>{var t=q(),o=D(t);Y(o,()=>l.motto,()=>E(c).motto,()=>E(c).glyph),b(n,t)},n=>{var t=Re(),o=g(t);p(t),O(()=>B(o,`${E(c).motto??""}
				${E(c).glyph??""}`)),b(n,t)}),b(a,e)});var L=f(S,2);P(L,()=>E(c).description,a=>{var e=q(),r=D(e);P(r,()=>l.description,n=>{var t=q(),o=D(t);Y(o,()=>l.description,()=>E(c).description,()=>E(c).glyph),b(n,t)},n=>{var t=qe(),o=g(t),v=f(o);P(v,()=>!E(c).motto,u=>{var k=ye();O(()=>B(k,E(c).glyph)),b(u,k)}),p(t),O(()=>B(o,`${E(c).description??""} `)),b(n,t)}),b(a,e)});var j=f(L,2);Y(j,()=>l.children??we);var C=f(j,2);P(C,()=>l.pkg.homepage_url,a=>{var e=q(),r=D(e);P(r,()=>l.homepage_url,n=>{var t=q(),o=D(t);Y(o,()=>l.homepage_url,()=>l.pkg.homepage_url),b(n,t)},n=>{var t=Oe(),o=g(t),v=g(o);O(()=>B(v,Ae(l.pkg.homepage_url))),p(o),p(t),O(()=>{V(o,"href",l.pkg.homepage_url),ke(o,"selected",l.pkg.homepage_url===d().url.href)}),b(n,t)}),b(a,e)});var z=f(C,2),I=g(z);P(I,()=>l.pkg.repo_url,a=>{var e=Ze();O(()=>V(e,"href",l.pkg.repo_url)),b(a,e)});var y=f(I,2);P(y,()=>l.pkg.changelog_url,a=>{var e=Ge(),r=g(e);p(e),O(()=>{V(e,"href",l.pkg.changelog_url),B(r,E(c).version)}),b(a,e)});var h=f(y,2);P(h,()=>l.pkg.npm_url,a=>{var e=He();O(()=>V(e,"href",l.pkg.npm_url)),b(a,e)}),p(z);var x=f(z,2);P(x,()=>l.pkg.npm_url,a=>{var e=q(),r=D(e);P(r,()=>l.npm_url,n=>{var t=q(),o=D(t);Y(o,()=>l.npm_url,()=>l.pkg.npm_url),b(n,t)},n=>{var t=Ue(),o=g(t);p(t),O(()=>B(o,`npm i -D ${E(c).name??""}`)),b(n,t)}),b(a,e)}),p(_),b(m,_),ve()}var Je=Z("<code><a> </a></code>");function ae(m,l){const s=ge(l,"extension",3,".svelte");var d=Je(),c=g(d),_=g(c);p(c),p(d),O(()=>{V(c,"href",`https://github.com/ryanatkn/fuz_code/blob/main/src/lib/${l.name??""}${s()??""}`),B(_,l.name)}),b(m,d)}var me=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Xe(m){return m&&m.__esModule&&Object.prototype.hasOwnProperty.call(m,"default")?m.default:m}var xe={exports:{}};(function(m){var l=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var s=function(d){var c=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,_=0,w={},i={manual:d.Prism&&d.Prism.manual,disableWorkerMessageHandler:d.Prism&&d.Prism.disableWorkerMessageHandler,util:{encode:function a(e){return e instanceof F?new F(e.type,a(e.content),e.alias):Array.isArray(e)?e.map(a):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(a){return Object.prototype.toString.call(a).slice(8,-1)},objId:function(a){return a.__id||Object.defineProperty(a,"__id",{value:++_}),a.__id},clone:function a(e,r){r=r||{};var n,t;switch(i.util.type(e)){case"Object":if(t=i.util.objId(e),r[t])return r[t];n={},r[t]=n;for(var o in e)e.hasOwnProperty(o)&&(n[o]=a(e[o],r));return n;case"Array":return t=i.util.objId(e),r[t]?r[t]:(n=[],r[t]=n,e.forEach(function(v,u){n[u]=a(v,r)}),n);default:return e}},getLanguage:function(a){for(;a;){var e=c.exec(a.className);if(e)return e[1].toLowerCase();a=a.parentElement}return"none"},setLanguage:function(a,e){a.className=a.className.replace(RegExp(c,"gi"),""),a.classList.add("language-"+e)},currentScript:function(){if(typeof document>"u")return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(n){var a=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(n.stack)||[])[1];if(a){var e=document.getElementsByTagName("script");for(var r in e)if(e[r].src==a)return e[r]}return null}},isActive:function(a,e,r){for(var n="no-"+e;a;){var t=a.classList;if(t.contains(e))return!0;if(t.contains(n))return!1;a=a.parentElement}return!!r}},languages:{plain:w,plaintext:w,text:w,txt:w,extend:function(a,e){var r=i.util.clone(i.languages[a]);for(var n in e)r[n]=e[n];return r},insertBefore:function(a,e,r,n){n=n||i.languages;var t=n[a],o={};for(var v in t)if(t.hasOwnProperty(v)){if(v==e)for(var u in r)r.hasOwnProperty(u)&&(o[u]=r[u]);r.hasOwnProperty(v)||(o[v]=t[v])}var k=n[a];return n[a]=o,i.languages.DFS(i.languages,function(T,H){H===k&&T!=a&&(this[T]=o)}),o},DFS:function a(e,r,n,t){t=t||{};var o=i.util.objId;for(var v in e)if(e.hasOwnProperty(v)){r.call(e,v,e[v],n||v);var u=e[v],k=i.util.type(u);k==="Object"&&!t[o(u)]?(t[o(u)]=!0,a(u,r,null,t)):k==="Array"&&!t[o(u)]&&(t[o(u)]=!0,a(u,r,v,t))}}},plugins:{},highlightAll:function(a,e){i.highlightAllUnder(document,a,e)},highlightAllUnder:function(a,e,r){var n={callback:r,container:a,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};i.hooks.run("before-highlightall",n),n.elements=Array.prototype.slice.apply(n.container.querySelectorAll(n.selector)),i.hooks.run("before-all-elements-highlight",n);for(var t=0,o;o=n.elements[t++];)i.highlightElement(o,e===!0,n.callback)},highlightElement:function(a,e,r){var n=i.util.getLanguage(a),t=i.languages[n];i.util.setLanguage(a,n);var o=a.parentElement;o&&o.nodeName.toLowerCase()==="pre"&&i.util.setLanguage(o,n);var v=a.textContent,u={element:a,language:n,grammar:t,code:v};function k(H){u.highlightedCode=H,i.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,i.hooks.run("after-highlight",u),i.hooks.run("complete",u),r&&r.call(u.element)}if(i.hooks.run("before-sanity-check",u),o=u.element.parentElement,o&&o.nodeName.toLowerCase()==="pre"&&!o.hasAttribute("tabindex")&&o.setAttribute("tabindex","0"),!u.code){i.hooks.run("complete",u),r&&r.call(u.element);return}if(i.hooks.run("before-highlight",u),!u.grammar){k(i.util.encode(u.code));return}if(e&&d.Worker){var T=new Worker(i.filename);T.onmessage=function(H){k(H.data)},T.postMessage(JSON.stringify({language:u.language,code:u.code,immediateClose:!0}))}else k(i.highlight(u.code,u.grammar,u.language))},highlight:function(a,e,r){var n={code:a,grammar:e,language:r};if(i.hooks.run("before-tokenize",n),!n.grammar)throw new Error('The language "'+n.language+'" has no grammar.');return n.tokens=i.tokenize(n.code,n.grammar),i.hooks.run("after-tokenize",n),F.stringify(i.util.encode(n.tokens),n.language)},tokenize:function(a,e){var r=e.rest;if(r){for(var n in r)e[n]=r[n];delete e.rest}var t=new j;return C(t,t.head,a),L(a,t,e,t.head,0),I(t)},hooks:{all:{},add:function(a,e){var r=i.hooks.all;r[a]=r[a]||[],r[a].push(e)},run:function(a,e){var r=i.hooks.all[a];if(!(!r||!r.length))for(var n=0,t;t=r[n++];)t(e)}},Token:F};d.Prism=i;function F(a,e,r,n){this.type=a,this.content=e,this.alias=r,this.length=(n||"").length|0}F.stringify=function a(e,r){if(typeof e=="string")return e;if(Array.isArray(e)){var n="";return e.forEach(function(k){n+=a(k,r)}),n}var t={type:e.type,content:a(e.content,r),tag:"span",classes:["token",e.type],attributes:{},language:r},o=e.alias;o&&(Array.isArray(o)?Array.prototype.push.apply(t.classes,o):t.classes.push(o)),i.hooks.run("wrap",t);var v="";for(var u in t.attributes)v+=" "+u+'="'+(t.attributes[u]||"").replace(/"/g,"&quot;")+'"';return"<"+t.tag+' class="'+t.classes.join(" ")+'"'+v+">"+t.content+"</"+t.tag+">"};function S(a,e,r,n){a.lastIndex=e;var t=a.exec(r);if(t&&n&&t[1]){var o=t[1].length;t.index+=o,t[0]=t[0].slice(o)}return t}function L(a,e,r,n,t,o){for(var v in r)if(!(!r.hasOwnProperty(v)||!r[v])){var u=r[v];u=Array.isArray(u)?u:[u];for(var k=0;k<u.length;++k){if(o&&o.cause==v+","+k)return;var T=u[k],H=T.inside,N=!!T.lookbehind,re=!!T.greedy,se=T.alias;if(re&&!T.pattern.global){var ie=T.pattern.toString().match(/[imsuy]*$/)[0];T.pattern=RegExp(T.pattern.source,ie+"g")}for(var oe=T.pattern||T,A=n.next,M=t;A!==e.tail&&!(o&&M>=o.reach);M+=A.value.length,A=A.next){var W=A.value;if(e.length>a.length)return;if(!(W instanceof F)){var J=1,G;if(re){if(G=S(oe,M,a,N),!G||G.index>=a.length)break;var K=G.index,ce=G.index+G[0].length,U=M;for(U+=A.value.length;K>=U;)A=A.next,U+=A.value.length;if(U-=A.value.length,M=U,A.value instanceof F)continue;for(var X=A;X!==e.tail&&(U<ce||typeof X.value=="string");X=X.next)J++,U+=X.value.length;J--,W=a.slice(M,U),G.index-=M}else if(G=S(oe,0,W,N),!G)continue;var K=G.index,$=G[0],ee=W.slice(0,K),te=W.slice(K+$.length),ne=M+W.length;o&&ne>o.reach&&(o.reach=ne);var le=A.prev;ee&&(le=C(e,le,ee),M+=ee.length),z(e,le,J);var Fe=new F(v,H?i.tokenize($,H):$,se,$);if(A=C(e,le,Fe),te&&C(e,A,te),J>1){var de={cause:v+","+k,reach:ne};L(a,e,r,A.prev,M,de),o&&de.reach>o.reach&&(o.reach=de.reach)}}}}}}function j(){var a={value:null,prev:null,next:null},e={value:null,prev:a,next:null};a.next=e,this.head=a,this.tail=e,this.length=0}function C(a,e,r){var n=e.next,t={value:r,prev:e,next:n};return e.next=t,n.prev=t,a.length++,t}function z(a,e,r){for(var n=e.next,t=0;t<r&&n!==a.tail;t++)n=n.next;e.next=n,n.prev=e,a.length-=t}function I(a){for(var e=[],r=a.head.next;r!==a.tail;)e.push(r.value),r=r.next;return e}if(!d.document)return d.addEventListener&&(i.disableWorkerMessageHandler||d.addEventListener("message",function(a){var e=JSON.parse(a.data),r=e.language,n=e.code,t=e.immediateClose;d.postMessage(i.highlight(n,i.languages[r],r)),t&&d.close()},!1)),i;var y=i.util.currentScript();y&&(i.filename=y.src,y.hasAttribute("data-manual")&&(i.manual=!0));function h(){i.manual||i.highlightAll()}if(!i.manual){var x=document.readyState;x==="loading"||x==="interactive"&&y&&y.defer?document.addEventListener("DOMContentLoaded",h):window.requestAnimationFrame?window.requestAnimationFrame(h):window.setTimeout(h,16)}return i}(l);m.exports&&(m.exports=s),typeof me<"u"&&(me.Prism=s),s.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},s.languages.markup.tag.inside["attr-value"].inside.entity=s.languages.markup.entity,s.languages.markup.doctype.inside["internal-subset"].inside=s.languages.markup,s.hooks.add("wrap",function(d){d.type==="entity"&&(d.attributes.title=d.content.replace(/&amp;/,"&"))}),Object.defineProperty(s.languages.markup.tag,"addInlined",{value:function(c,_){var w={};w["language-"+_]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:s.languages[_]},w.cdata=/^<!\[CDATA\[|\]\]>$/i;var i={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:w}};i["language-"+_]={pattern:/[\s\S]+/,inside:s.languages[_]};var F={};F[c]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return c}),"i"),lookbehind:!0,greedy:!0,inside:i},s.languages.insertBefore("markup","cdata",F)}}),Object.defineProperty(s.languages.markup.tag,"addAttribute",{value:function(d,c){s.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+d+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[c,"language-"+c],inside:s.languages[c]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),s.languages.html=s.languages.markup,s.languages.mathml=s.languages.markup,s.languages.svg=s.languages.markup,s.languages.xml=s.languages.extend("markup",{}),s.languages.ssml=s.languages.xml,s.languages.atom=s.languages.xml,s.languages.rss=s.languages.xml,function(d){var c=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;d.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+c.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+c.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+c.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+c.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:c,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},d.languages.css.atrule.inside.rest=d.languages.css;var _=d.languages.markup;_&&(_.tag.addInlined("style","css"),_.tag.addAttribute("style","css"))}(s),s.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},s.languages.javascript=s.languages.extend("clike",{"class-name":[s.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),s.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,s.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:s.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:s.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:s.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:s.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:s.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),s.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:s.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),s.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),s.languages.markup&&(s.languages.markup.tag.addInlined("script","javascript"),s.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),s.languages.js=s.languages.javascript,function(){if(typeof s>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var d="Loading…",c=function(y,h){return"✖ Error "+y+" while fetching file: "+h},_="✖ Error: File does not exist or is empty",w={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},i="data-src-status",F="loading",S="loaded",L="failed",j="pre[data-src]:not(["+i+'="'+S+'"]):not(['+i+'="'+F+'"])';function C(y,h,x){var a=new XMLHttpRequest;a.open("GET",y,!0),a.onreadystatechange=function(){a.readyState==4&&(a.status<400&&a.responseText?h(a.responseText):a.status>=400?x(c(a.status,a.statusText)):x(_))},a.send(null)}function z(y){var h=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(y||"");if(h){var x=Number(h[1]),a=h[2],e=h[3];return a?e?[x,Number(e)]:[x,void 0]:[x,x]}}s.hooks.add("before-highlightall",function(y){y.selector+=", "+j}),s.hooks.add("before-sanity-check",function(y){var h=y.element;if(h.matches(j)){y.code="",h.setAttribute(i,F);var x=h.appendChild(document.createElement("CODE"));x.textContent=d;var a=h.getAttribute("data-src"),e=y.language;if(e==="none"){var r=(/\.(\w+)$/.exec(a)||[,"none"])[1];e=w[r]||r}s.util.setLanguage(x,e),s.util.setLanguage(h,e);var n=s.plugins.autoloader;n&&n.loadLanguages(e),C(a,function(t){h.setAttribute(i,S);var o=z(h.getAttribute("data-range"));if(o){var v=t.split(/\r\n?|\n/g),u=o[0],k=o[1]==null?v.length:o[1];u<0&&(u+=v.length),u=Math.max(0,Math.min(u-1,v.length)),k<0&&(k+=v.length),k=Math.max(0,Math.min(k,v.length)),t=v.slice(u,k).join(`
`),h.hasAttribute("data-start")||h.setAttribute("data-start",String(u+1))}x.textContent=t,s.highlightElement(x)},function(t){h.setAttribute(i,L),x.textContent=t})}}),s.plugins.fileHighlight={highlight:function(h){for(var x=(h||document).querySelectorAll(j),a=0,e;e=x[a++];)s.highlightElement(e)}};var I=!1;s.fileHighlight=function(){I||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),I=!0),s.plugins.fileHighlight.highlight.apply(this,arguments)}}()})(xe);var Ye=xe.exports;const _e=Xe(Ye);(function(m){m.languages.typescript=m.languages.extend("javascript",{"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,lookbehind:!0,greedy:!0,inside:null},builtin:/\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/}),m.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/,/\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,/\btype\b(?=\s*(?:[\{*]|$))/),delete m.languages.typescript.parameter,delete m.languages.typescript["literal-property"];var l=m.languages.extend("typescript",{});delete l["class-name"],m.languages.typescript["class-name"].inside=l,m.languages.insertBefore("typescript","function",{decorator:{pattern:/@[$\w\xA0-\uFFFF]+/,inside:{at:{pattern:/^@/,alias:"operator"},function:/^[\s\S]+/}},"generic-function":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,greedy:!0,inside:{function:/^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,generic:{pattern:/<[\s\S]+/,alias:"class-name",inside:l}}}}),m.languages.ts=m.languages.typescript})(Prism);const be="(if|else if|await|then|catch|each|html|debug)";Prism.languages.svelte=Prism.languages.extend("markup",{each:{pattern:new RegExp("{[#/]each(?:(?:\\{(?:(?:\\{(?:[^{}])*\\})|(?:[^{}]))*\\})|(?:[^{}]))*}"),inside:{"language-javascript":[{pattern:/(as[\s\S]*)\([\s\S]*\)(?=\s*\})/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(as[\s]*)[\s\S]*(?=\s*)/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(#each[\s]*)[\s\S]*(?=as)/,lookbehind:!0,inside:Prism.languages.javascript}],keyword:/[#/]each|as/,punctuation:/{|}/}},block:{pattern:new RegExp("{[#:/@]/s"+be+"(?:(?:\\{(?:(?:\\{(?:[^{}])*\\})|(?:[^{}]))*\\})|(?:[^{}]))*}"),inside:{punctuation:/^{|}$/,keyword:[new RegExp("[#:/@]"+be+"( )*"),/as/,/then/],"language-javascript":{pattern:/[\s\S]*/,inside:Prism.languages.javascript}}},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?:"[^"]*"|'[^']*'|{[\s\S]+?}(?=[\s/>])))|(?=[\s/>])))+)?\s*\/?>/i,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"language-javascript":{pattern:/\{(?:(?:\{(?:(?:\{(?:[^{}])*\})|(?:[^{}]))*\})|(?:[^{}]))*\}/,inside:Prism.languages.javascript},"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,inside:{punctuation:[/^=/,{pattern:/^(\s*)["']|["']$/,lookbehind:!0}],"language-javascript":{pattern:/{[\s\S]+}/,inside:Prism.languages.javascript}}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},"language-javascript":{pattern:/\{(?:(?:\{(?:(?:\{(?:[^{}])*\})|(?:[^{}]))*\})|(?:[^{}]))*\}/,lookbehind:!0,inside:Prism.languages.javascript}});Prism.languages.svelte.tag.inside["attr-value"].inside.entity=Prism.languages.svelte.entity;Prism.hooks.add("wrap",m=>{m.type==="entity"&&(m.attributes.title=m.content.replace(/&amp;/,"&"))});Object.defineProperty(Prism.languages.svelte.tag,"addInlined",{value:function(l,s){const d={};d["language-"+s]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:Prism.languages[s]},d.cdata=/^<!\[CDATA\[|\]\]>$/i;const c={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:d}};c["language-"+s]={pattern:/[\s\S]+/,inside:Prism.languages[s]};const _={};_[l]={pattern:RegExp(/(<__[\s\S]*?>)(?:<!\[CDATA\[[\s\S]*?\]\]>\s*|[\s\S])*?(?=<\/__>)/.source.replace(/__/g,l),"i"),lookbehind:!0,greedy:!0,inside:c},Prism.languages.insertBefore("svelte","cdata",_)}});Prism.languages.svelte.tag.addInlined("style","css");Prism.languages.svelte.tag.addInlined("script","javascript");var Ve=Z("<pre><code><!></code></pre>");function R(m,l){pe(l,!0);const s=ge(l,"lang",3,"svelte"),d=ge(l,"inline",3,!1),c=ue(()=>s()===null?null:_e.languages[s()]),_=ue(()=>E(c)===null?null:l.content&&_e.highlight(l.content,E(c),s())),w=ue(()=>E(_)??l.content);var i=Ve();let F;var S=g(i);let L;var j=g(S);P(j,()=>l.children,C=>{var z=q(),I=D(z);Y(I,()=>l.children,()=>E(w)),b(C,z)},C=>{var z=q(),I=D(z);P(I,()=>E(_)!==null,y=>{var h=q(),x=D(h);je(x,()=>E(_),!1,!1),b(y,h)},y=>{var h=ye();O(()=>B(h,l.content)),b(y,h)},!0),b(C,z)}),p(S),p(i),O(()=>{F=he(i,F,{...l.pre_attrs},"svelte-1a6bj2n"),ke(i,"inline",d()),L=he(S,L,{...l.code_attrs},"svelte-1a6bj2n")}),b(m,i),ve()}var Ke=Z(`<section class="svelte-1plormd"><p>The <!> component supports syntax highlighting with <a href="https://prismjs.com/">Prism</a> (<a href="https://github.com/PrismJS/prism">repo</a>).</p> <p>It depends on two packages that you must install yourself:</p> <!> <p>Then import the styles:</p> <!> <p>then use <!>:</p> <!> <p>outputs:</p> <!></section> <section class="svelte-1plormd"><aside>⚠️ Performing syntax highlighting at runtime like this is wasteful. The API's efficiency is
		work-in-progress - you can use <code></code> with pre-highligted text but the
		component will still import <code>prismjs</code> and <code>prism-svelte</code>.</aside></section> <section class="svelte-1plormd"><p><!> highlights <a href="https://svelte.dev/">Svelte</a> by default:</p> <div class="mb_lg"><!></div> <p>highlighted:</p> <div><!></div></section> <section class="svelte-1plormd"><p><!> supports TypeScript with <code>lang="ts"</code>:</p> <div class="mb_lg"><!></div> <div><!></div></section> <section class="svelte-1plormd"><p>Passing <code></code> disables syntax highlighting:</p> <!> <div class="mb_lg"><!></div></section> <section class="svelte-1plormd"><p><!> is a block by default:</p> <div>ab<!></div> <!></section> <section class="svelte-1plormd"><div><!> can be inlined with <!></div></section> <section class="svelte-1plormd"><p>The <code><a href="https://github.com/ryanatkn/fuz_code/blob/main/src/lib/remove_prism_css_vite_plugin.ts">remove_prism_css</a></code> Vite plugin is an optimization that excludes the builtin Prism theme, letting you use a minimal theme
		that doesn't need selectors for overrides like <code><a href="https://github.com/ryanatkn/fuz_code/blob/main/src/lib/prism.css">@ryanatkn/fuz_code/prism.css</a></code>, while also avoiding waste:</p> <div><!></div></section>`,1);function Qe(m){var l=Ke(),s=D(l),d=g(s),c=f(g(d));ae(c,{name:"Code"}),Q(5),p(d);var _=f(d,4);R(_,{content:"npm i -D prismjs prism-svelte",lang:null});var w=f(_,4);R(w,{lang:"ts",content:`// +layout.svelte
import '@ryanatkn/moss/style.css';
import '@ryanatkn/moss/theme.css'; // or your own
// add this:
import '@ryanatkn/fuz_code/prism.css'; // add this`});var i=f(w,2),F=f(g(i));ae(F,{name:"Code"}),Q(),p(i);var S=f(i,2);R(S,{content:`<script>
	// Something.svelte
	import Code from '@ryanatkn/fuz_code/Code.svelte';
<\/script>

<Code content="<header>hello world</header>" />`});var L=f(S,4);R(L,{content:"<header>hello world</header>"}),p(s);var j=f(s,2),C=g(j),z=f(g(C));z.textContent="lang={null}",Q(5),p(C),p(j);var I=f(j,2),y=g(I),h=g(y);ae(h,{name:"Code"}),Q(3),p(y);var x=f(y,2),a=g(x);R(a,{content:'<Code content="<scr..." />'}),p(x);var e=f(x,4),r=g(e);R(r,{content:`<script>
	import Card from '@fuz.dev/fuz-library/Card.svelte';
	console.log('hello Card', Card);
<\/script>

<Card>
	<div class="greeting">hi {friend}</div>
</Card>`}),p(e),p(I);var n=f(I,2),t=g(n),o=g(t);ae(o,{name:"Code"}),Q(3),p(t);var v=f(t,2),u=g(v);R(u,{content:`<Code lang="ts" content="export type A<T> = ('b' | 3) & T;" />`}),p(v);var k=f(v,2),T=g(k);R(T,{lang:"ts",content:"export type A<T> = ('b' | 3) & T;"}),p(k),p(n);var H=f(n,2),N=g(H),re=f(g(N));re.textContent="lang={null}",Q(),p(N);var se=f(N,2);R(se,{lang:null,content:"<aside>all is gray</aside>"});var ie=f(se,2),oe=g(ie);R(oe,{content:'<Code lang={null} content="..." />'}),p(ie),p(H);var A=f(H,2),M=g(A),W=g(M);ae(W,{name:"Code"}),Q(),p(M);var J=f(M,2),G=f(g(J));R(G,{content:"c"}),p(J);var ce=f(J,2);R(ce,{content:'<div>ab<Code content="c" /></div>'}),p(A);var U=f(A,2),X=g(U),K=g(X);ae(K,{name:"Code"});var $=f(K,2);R($,{inline:!0,content:'<Code inline content="..." />'}),p(X),p(U);var ee=f(U,2),te=f(g(ee),2),ne=g(te);R(ne,{lang:"ts",content:`import type {UserConfig} from 'vite';
import {sveltekit} from '@sveltejs/kit/vite';
import {remove_prism_css} from '@ryanatkn/fuz_code/remove_prism_css_vite_plugin.js';

const config: UserConfig = {
	plugins: [sveltekit(), remove_prism_css()],
};

export default config;`}),p(te),p(ee),b(m,l)}var Ne=Z('<main class="box w_100 svelte-vb6o61"><div class="box width_md"><section class="svelte-vb6o61"><!></section> <section class="svelte-vb6o61"><blockquote class="width_sm">⚠️ this library is going to <a href="https://github.com/ryanatkn/fuz_code/issues/8">replace</a> <code>prismjs</code> with <code><a href="https://github.com/shikijs/shiki">shiki</a></code></blockquote></section> <section class="svelte-vb6o61"><!></section> <section class="box svelte-vb6o61"><a class="chip">about</a></section> <section class="svelte-vb6o61"><!></section></div></main>');function oa(m,l){pe(l,!0);const s=Se(Te,Ce);var d=Ne(),c=g(d),_=g(c),w=g(_);We(w,{pkg:s}),p(_);var i=f(_,4),F=g(i);Qe(F),p(i);var S=f(i,2),L=g(S);V(L,"href",`${De??""}/about`),p(S);var j=f(S,2),C=g(j);Ee(C,{pkg:s,root_url:"https://www.fuz.dev/"}),p(j),p(c),p(d),b(m,d),ve()}export{oa as component};