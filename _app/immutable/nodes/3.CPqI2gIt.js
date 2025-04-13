import{t as j,b as d,e as A,d as $}from"../chunks/DSoiYCM3.js";import{a0 as qe,E as $e,aD as ea,aE as aa,ae as ta,a as ra,aF as sa,aG as na,a2 as ia,n as X,Z as je,_ as Fe,$ as oa,af as va,G as la,p as ue,t as N,o as fe,v as p,q as i,r as s,m as P,x as u,y as M,w as I}from"../chunks/C0lNcMS6.js";import{f as da,w as ca,s as W}from"../chunks/Cdo0vGeP.js";import{p as _a,i as S,s as ua,a as fa}from"../chunks/BBdQa1Ch.js";import{g as ze,c as Se,f as Ee,s as G,b as Ce,d as Le,e as Te,a as re,p as ga}from"../chunks/DPMtRYzY.js";import{s as B}from"../chunks/BakLm11Z.js";import{f as ma,S as oe,g as pa,m as ha,b as wa,c as ka,p as ya,L as xa,s as ba,a as qa}from"../chunks/BYv_7lOo.js";import{B as Ne}from"../chunks/CgA33GfL.js";const ja=()=>performance.now(),R={tick:o=>requestAnimationFrame(o),now:()=>ja(),tasks:new Set};function We(){const o=R.now();R.tasks.forEach(e=>{e.c(o)||(R.tasks.delete(e),e.f())}),R.tasks.size!==0&&R.tick(We)}function Fa(o){let e;return R.tasks.size===0&&R.tick(We),{promise:new Promise(n=>{R.tasks.add(e={c:o,f:n})}),abort(){R.tasks.delete(e)}}}function ve(o,e){ca(()=>{o.dispatchEvent(new CustomEvent(e))})}function za(o){if(o==="float")return"cssFloat";if(o==="offset")return"cssOffset";if(o.startsWith("--"))return o;const e=o.split("-");return e.length===1?e[0]:e[0]+e.slice(1).map(n=>n[0].toUpperCase()+n.slice(1)).join("")}function Pe(o){const e={},n=o.split(";");for(const v of n){const[h,a]=v.split(":");if(!h||a===void 0)break;const y=za(h.trim());e[y]=a.trim()}return e}const Sa=o=>o;function Ea(o,e,n,v){var h=(o&sa)!==0,a="both",y,F=e.inert,C=e.style.overflow,l,c;function z(){var E=oa,b=qe;je(null),Fe(null);try{return y??(y=n()(e,(v==null?void 0:v())??{},{direction:a}))}finally{je(E),Fe(b)}}var L={is_global:h,in(){e.inert=F,ve(e,"introstart"),l=_e(e,z(),c,1,()=>{ve(e,"introend"),l==null||l.abort(),l=y=void 0,e.style.overflow=C})},out(E){e.inert=!0,ve(e,"outrostart"),c=_e(e,z(),l,0,()=>{ve(e,"outroend"),E==null||E()})},stop:()=>{l==null||l.abort(),c==null||c.abort()}},k=qe;if((k.transitions??(k.transitions=[])).push(L),da){var q=h;if(!q){for(var w=k.parent;w&&(w.f&$e)!==0;)for(;(w=w.parent)&&(w.f&ea)===0;);q=!w||(w.f&aa)!==0}q&&ta(()=>{ra(()=>L.in())})}}function _e(o,e,n,v,h){var a=v===1;if(na(e)){var y,F=!1;return ia(()=>{if(!F){var E=e({direction:a?"in":"out"});y=_e(o,E,n,v,h)}}),{abort:()=>{F=!0,y==null||y.abort()},deactivate:()=>y.deactivate(),reset:()=>y.reset(),t:()=>y.t()}}if(n==null||n.deactivate(),!(e!=null&&e.duration))return h(),{abort:X,deactivate:X,reset:X,t:()=>v};const{delay:C=0,css:l,tick:c,easing:z=Sa}=e;var L=[];if(a&&n===void 0&&(c&&c(0,1),l)){var k=Pe(l(0,1));L.push(k,k)}var q=()=>1-v,w=o.animate(L,{duration:C});return w.onfinish=()=>{var E=(n==null?void 0:n.t())??1-v;n==null||n.abort();var b=v-E,D=e.duration*Math.abs(b),J=[];if(D>0){var ee=!1;if(l)for(var K=Math.ceil(D/16.666666666666668),V=0;V<=K;V+=1){var se=E+b*z(V/K),ae=Pe(l(se,1-se));J.push(ae),ee||(ee=ae.overflow==="hidden")}ee&&(o.style.overflow="hidden"),q=()=>{var Y=w.currentTime;return E+b*z(Y/D)},c&&Fa(()=>{if(w.playState!=="running")return!1;var Y=q();return c(Y,1-Y),!0})}w=o.animate(J,{duration:D,fill:"forwards"}),w.onfinish=()=>{q=()=>v,c==null||c(v,1-v),h()}},{abort:()=>{w&&(w.cancel(),w.effect=null,w.onfinish=X)},deactivate:()=>{h=X},reset:()=>{v===0&&(c==null||c(1,0))},t:()=>q()}}function Ca(o,e,n,v,h){var a=()=>{v(n[o])};n.addEventListener(e,a),h?va(()=>{n[o]=h()}):a(),(n===document.body||n===window||n===document)&&la(()=>{n.removeEventListener(e,a)})}function La(o){const e=o-1;return e*e*e+1}function Ta(o,{delay:e=0,duration:n=400,easing:v=La,axis:h="y"}={}){const a=getComputedStyle(o),y=+a.opacity,F=h==="y"?"height":"width",C=parseFloat(a[F]),l=h==="y"?["top","bottom"]:["left","right"],c=l.map(b=>`${b[0].toUpperCase()}${b.slice(1)}`),z=parseFloat(a[`padding${c[0]}`]),L=parseFloat(a[`padding${c[1]}`]),k=parseFloat(a[`margin${c[0]}`]),q=parseFloat(a[`margin${c[1]}`]),w=parseFloat(a[`border${c[0]}Width`]),E=parseFloat(a[`border${c[1]}Width`]);return{delay:e,duration:n,easing:v,css:b=>`overflow: hidden;opacity: ${Math.min(b*20,1)*y};${F}: ${b*C}px;padding-${l[0]}: ${b*z}px;padding-${l[1]}: ${b*L}px;margin-${l[0]}: ${b*k}px;margin-${l[1]}: ${b*q}px;border-${l[0]}-width: ${b*w}px;border-${l[1]}-width: ${b*E}px;min-${F}: 0`}}var Na=j("<div><!></div>"),Pa=j("<details><summary><!></summary> <!></details>");function Wa(o,e){ue(e,!0);let n=_a(e,"open",15);var v=Pa();let h;var a=i(v);let y;var F=i(a);B(F,()=>e.summary),s(a);var C=p(a,2);{var l=z=>{var L=A(),k=P(L);B(k,()=>e.children),d(z,L)},c=(z,L)=>{{var k=q=>{var w=Na(),E=i(w);B(E,()=>e.children),s(w),Ea(3,w,()=>Ta),d(q,w)};S(z,q=>{n()&&q(k)},L)}};S(C,z=>{e.eager?z(l):z(c,!1)})}s(v),N(()=>{h=ze(v,h,{...e.attrs}),y=ze(a,y,{...e.summary_attrs})}),Ca("open","toggle",v,n,n),d(o,v),fe()}var Ga=j('<div class="repo_name svelte-w7xguq"> <!></div>'),Oa=j('<div class="description svelte-w7xguq"> </div>'),Aa=j('<div class="motto svelte-w7xguq"> </div>'),Ma=j('<blockquote class="npm_url svelte-w7xguq"> </blockquote>'),Ba=j('<span class="title svelte-w7xguq">homepage</span> <div class="content svelte-w7xguq"><a><img> </a></div>',1),Ra=j('<span class="title svelte-w7xguq">repo</span> <div class="content svelte-w7xguq"><a class="chip svelte-w7xguq" title="repo"> </a></div>',1),Da=j('<span class="title svelte-w7xguq">npm</span> <div class="content svelte-w7xguq"><a class="chip svelte-w7xguq" title="npm"> </a></div>',1),Ia=j('<span class="title svelte-w7xguq">version</span> <div class="content svelte-w7xguq"><a class="chip svelte-w7xguq" title="version"> </a></div>',1),Ka=j('<span class="title svelte-w7xguq">license</span> <div class="content svelte-w7xguq"><a class="chip svelte-w7xguq" title="license"> </a></div>',1),Ua=j('<span class="title svelte-w7xguq">data</span> <div class="content svelte-w7xguq"><a class="chip svelte-w7xguq" title="data">package.json</a> <a class="chip svelte-w7xguq" title="data">src.json</a></div>',1),Ha=j('<div class="logo svelte-w7xguq"><img></div>'),Ja=j("<li> </li>"),Va=j('<ul class="declarations unstyled svelte-w7xguq"></ul>'),Ya=j('<li><div class="module_content svelte-w7xguq"><a class="chip"> </a> <!></div></li>'),Za=j('<section class="svelte-w7xguq"><menu class="unstyled"></menu></section>'),Qa=j("<pre><code> </code></pre>"),Xa=j('<div class="package_detail svelte-w7xguq"><div class="info svelte-w7xguq"><div class="flex flex_1"><div><header class="svelte-w7xguq"><!></header> <!> <!> <!> <!> <section class="properties svelte-w7xguq"><!> <!> <!> <!> <!> <!></section></div></div> <!></div> <!> <section class="svelte-w7xguq"><!></section></div>');function $a(o,e){ue(e,!0);const[n,v]=ua(),h=()=>fa(ga,"$page",n),a=M(()=>e.pkg.package_json),y=M(()=>e.pkg.src_json),F=M(()=>u(y).modules),C=M(()=>u(a).repository?Se(Ee(Ee(typeof u(a).repository=="string"?u(a).repository:u(a).repository.url,".git"),"/"),"git+"):null),l=M(()=>u(a).license&&u(C)?u(C)+"/blob/main/LICENSE":null),c=(t,r)=>t+"/blob/main/src/lib/"+(r.endsWith(".js")?r.slice(0,-3)+".ts":r),z=M(()=>u(a).exports&&Object.keys(u(a).exports)),L=M(()=>u(a).exports?Object.keys(u(a).exports).map(t=>{const r=Se(t,"./");return r==="."?"index.js":r}):null);var k=Xa(),q=i(k),w=i(q),E=i(w),b=i(E),D=i(b);{var J=t=>{var r=A(),f=P(r);B(f,()=>e.repo_name,()=>e.pkg.repo_name),d(t,r)},ee=t=>{var r=Ga(),f=i(r,!0),m=p(f);{var x=g=>{var _=$();N(()=>W(_,` ${u(a).glyph??""}`)),d(g,_)};S(m,g=>{u(a).glyph&&g(x)})}s(r),N(()=>W(f,e.pkg.repo_name)),d(t,r)};S(D,t=>{e.repo_name?t(J):t(ee,!1)})}s(b);var K=p(b,2);B(K,()=>e.children??X,()=>e.pkg);var V=p(K,2);{var se=t=>{var r=A(),f=P(r);{var m=g=>{var _=A(),T=P(_);B(T,()=>e.description,()=>u(a).description),d(g,_)},x=g=>{var _=Oa(),T=i(_,!0);s(_),N(()=>W(T,u(a).description)),d(g,_)};S(f,g=>{e.description?g(m):g(x,!1)})}d(t,r)};S(V,t=>{u(a).description&&t(se)})}var ae=p(V,2);{var Y=t=>{var r=A(),f=P(r);{var m=g=>{var _=A(),T=P(_);B(T,()=>e.motto,()=>u(a).motto),d(g,_)},x=g=>{var _=Aa(),T=i(_,!0);s(_),N(()=>W(T,u(a).motto)),d(g,_)};S(f,g=>{e.motto?g(m):g(x,!1)})}d(t,r)};S(ae,t=>{u(a).motto&&t(Y)})}var ge=p(ae,2);{var Ge=t=>{var r=A(),f=P(r);{var m=g=>{var _=A(),T=P(_);B(T,()=>e.npm_url,()=>e.pkg.npm_url),d(g,_)},x=g=>{var _=Ma(),T=i(_);s(_),N(()=>W(T,`npm i -D ${u(a).name??""}`)),d(g,_)};S(f,g=>{e.npm_url?g(m):g(x,!1)})}d(t,r)};S(ge,t=>{e.pkg.npm_url&&t(Ge)})}var me=p(ge,2),pe=i(me);{var Oe=t=>{var r=A(),f=P(r);{var m=g=>{var _=A(),T=P(_);B(T,()=>e.homepage_url,()=>e.pkg.homepage_url),d(g,_)},x=g=>{var _=Ba(),T=p(P(_),2),U=i(T);let te;var H=i(U);Le(H,"",{},{width:"16px",height:"16px","margin-right":"var(--space_xs)"});var ne=p(H);s(U),s(T),N((Z,le)=>{te=re(U,1,"chip svelte-w7xguq",null,te,Z),G(U,"href",e.pkg.homepage_url),G(H,"src",e.pkg.logo_url),G(H,"alt",e.pkg.logo_alt),W(ne,` ${le??""}`)},[()=>({selected:e.pkg.homepage_url===h().url.href}),()=>ma(e.pkg.homepage_url)]),d(g,_)};S(f,g=>{e.homepage_url?g(m):g(x,!1)})}d(t,r)};S(pe,t=>{e.pkg.homepage_url&&t(Oe)})}var he=p(pe,2);{var Ae=t=>{var r=Ra(),f=p(P(r),2),m=i(f),x=i(m);s(m),s(f),N(()=>{G(m,"href",e.pkg.repo_url),W(x,`${e.pkg.owner_name??""}/${e.pkg.repo_name??""}`)}),d(t,r)};S(he,t=>{e.pkg.repo_url&&t(Ae)})}var we=p(he,2);{var Me=t=>{var r=Da(),f=p(P(r),2),m=i(f),x=i(m,!0);s(m),s(f),N(()=>{G(m,"href",e.pkg.npm_url),W(x,u(a).name)}),d(t,r)};S(we,t=>{e.pkg.npm_url&&t(Me)})}var ke=p(we,2);{var Be=t=>{var r=Ia(),f=p(P(r),2),m=i(f),x=i(m,!0);s(m),s(f),N(()=>{G(m,"href",e.pkg.changelog_url),W(x,u(a).version)}),d(t,r)};S(ke,t=>{e.pkg.changelog_url&&t(Be)})}var ye=p(ke,2);{var Re=t=>{var r=Ka(),f=p(P(r),2),m=i(f),x=i(m,!0);s(m),s(f),N(()=>{G(m,"href",u(l)),W(x,u(a).license)}),d(t,r)};S(ye,t=>{u(l)&&t(Re)})}var De=p(ye,2);{var Ie=t=>{var r=Ua(),f=p(P(r),2),m=i(f),x=p(m,2);s(f),N((g,_)=>{G(m,"href",`${g??""}.well-known/package.json`),G(x,"href",`${_??""}.well-known/src.json`)},[()=>Ce(e.pkg.homepage_url,"/"),()=>Ce(e.pkg.homepage_url,"/")]),d(t,r)};S(De,t=>{e.pkg.homepage_url&&t(Ie)})}s(me),s(E),s(w);var Ke=p(w,2);{var Ue=t=>{var r=Ha(),f=i(r);Le(f,"",{},{width:"var(--size, var(--icon_size_xl2))",height:"var(--size, var(--icon_size_xl2))"}),s(r),N(()=>{G(f,"src",e.pkg.logo_url),G(f,"alt",e.pkg.logo_alt)}),d(t,r)};S(Ke,t=>{e.pkg.logo_url&&t(Ue)})}s(q);var xe=p(q,2);{var He=t=>{var r=Za(),f=i(r);Te(f,22,()=>u(L),m=>m,(m,x,g)=>{var _=Ya();const T=M(()=>c(e.pkg.repo_url,x)),U=M(()=>{var O;return(O=u(z))==null?void 0:O[u(g)]}),te=M(()=>{var O;return u(U)?(O=u(F))==null?void 0:O[u(U)]:void 0});let H;var ne=i(_),Z=i(ne),le=i(Z,!0);s(Z);var Ve=p(Z,2);{var Ye=O=>{var Q=Va();Te(Q,21,()=>u(te).declarations,({name:de,kind:ce})=>de,(de,ce)=>{let Ze=()=>u(ce).name,Qe=()=>u(ce).kind;var ie=Ja(),Xe=i(ie,!0);s(ie),N(()=>{re(ie,1,`declaration chip ${Qe()??""}_declaration`,"svelte-w7xguq"),W(Xe,Ze())}),d(de,ie)}),s(Q),d(O,Q)};S(Ve,O=>{var Q;(Q=u(te))!=null&&Q.declarations.length&&O(Ye)})}s(ne),s(_),N(O=>{H=re(_,1,"module svelte-w7xguq",null,H,O),G(Z,"href",u(T)),W(le,x)},[()=>({ts:x.endsWith(".js"),svelte:x.endsWith(".svelte"),css:x.endsWith(".css"),json:x.endsWith(".json")})]),d(m,_)}),s(f),s(r),d(t,r)};S(xe,t=>{u(L)&&e.pkg.repo_url&&t(He)})}var be=p(xe,2),Je=i(be);Wa(Je,{summary:r=>{I();var f=$("raw package metadata");d(r,f)},children:(r,f)=>{var m=Qa(),x=i(m),g=i(x,!0);s(x),s(m),N(_=>W(g,_),[()=>JSON.stringify(e.pkg,null,"	")]),d(r,m)},$$slots:{summary:!0,default:!0}}),s(be),s(k),d(o,k),fe(),v()}var et=j('<ul><li><a rel="me" href="https://www.ryanatkn.com/">ryanatkn.com</a> - my homepage<!></li> <li>GitHub as <a rel="me" href="https://github.com/ryanatkn">@ryanatkn</a> and Bluesky as <a href="https://bsky.app/profile/ryanatkn.com">@ryanatkn.com</a></li> <li>Mastodon as <a rel="me" href="https://fosstodon.org/@ryanatkn">@ryanatkn@fosstodon.org</a> and <a rel="me" href="https://fosstodon.org/@webdevladder">@webdevladder@fosstodon.org</a></li> <li><a rel="me" href="https://www.webdevladder.net/">webdevladder.net</a> - realworld webdev with TypeScript and Svelte, <a href="https://www.webdevladder.net/blog">blog</a> and YouTube channels <a rel="me" href="https://youtube.com/@webdevladder">@webdevladder</a> and <a rel="me" href="https://youtube.com/@webdevladder_vods">@webdevladder_vods</a><!></li> <li>@webdevladder on <a rel="me" href="https://www.reddit.com/user/webdevladder/">Reddit</a> and <a href="https://news.ycombinator.com/user?id=webdevladder">Hacker News</a></li></ul>');function at(o,e){var n=et(),v=i(n),h=i(v);let a;var y=p(h,2);{var F=k=>{var q=$(", you are here");d(k,q)};S(y,k=>{e.selected==="ryanatkn.com"&&k(F)})}s(v);var C=p(v,6),l=i(C);let c;var z=p(l,7);{var L=k=>{var q=$(", you are here");d(k,q)};S(z,k=>{e.selected==="webdevladder.net"&&k(L)})}s(C),I(2),s(n),N((k,q)=>{a=re(h,1,"",null,a,k),c=re(l,1,"",null,c,q)},[()=>({selected:e.selected==="ryanatkn.com"}),()=>({selected:e.selected==="webdevladder.net"})]),d(o,n)}var tt=j('<a class="project_link svelte-1bpnvy9" title="Gro - task runner and toolkit extending SvelteKit" href="https://gro.ryanatkn.com/"><!><span class="name svelte-1bpnvy9">Gro</span></a> <a class="project_link svelte-1bpnvy9" title="Moss - CSS framework" href="https://moss.ryanatkn.com/"><!><span class="name svelte-1bpnvy9">Moss</span></a> <a class="project_link svelte-1bpnvy9" title="Fuz - Svelte UI library" href="https://www.fuz.dev/"><!><span class="name svelte-1bpnvy9">Fuz</span></a> <a class="project_link svelte-1bpnvy9" title="fuz_template - a static web app and Node library template with TypeScript, Svelte, SvelteKit, Vite, esbuild, Fuz, and Gro" href="https://template.fuz.dev/"><!><span class="name svelte-1bpnvy9">fuz_template</span></a>',1);function rt(o){const e="var(--icon_size_lg)";var n=tt(),v=P(n),h=i(v);oe(h,{data:pa,size:e}),I(),s(v);var a=p(v,2),y=i(a);oe(y,{data:ha,size:e}),I(),s(a);var F=p(a,2),C=i(F);oe(C,{data:wa,size:e}),I(),s(F);var l=p(F,2),c=i(l);oe(c,{data:ka,size:e}),I(),s(l),d(o,n)}var st=j('<h2 class="mt_0 mb_lg">Links</h2>'),nt=j('<section class="panel p_lg"><!> <!> <div class="box row"><!></div></section>');function it(o,e){var n=nt(),v=i(n);{var h=l=>{var c=A(),z=P(c);B(z,()=>e.children),d(l,c)},a=l=>{var c=st();d(l,c)};S(v,l=>{e.children?l(h):l(a,!1)})}var y=p(v,2);at(y,{});var F=p(y,2),C=i(F);rt(C),s(F),s(n),d(o,n)}var ot=j('<div class="mb_lg"><!></div>'),vt=j('<main class="width_md svelte-1pyh03k"><section class="box svelte-1pyh03k"><header><h1 class="mt_xl5 svelte-1pyh03k"> </h1></header> <!></section> <!> <section class="box w_100 mb_lg svelte-1pyh03k"><div class="panel p_md width_md"><!></div></section> <section class="box svelte-1pyh03k"><!></section></main>');function pt(o,e){ue(e,!0);const n=ya(qa,ba);var v=vt(),h=i(v),a=i(h),y=i(a),F=i(y,!0);s(y),s(a);var C=p(a,2);Ne(C,{children:(w,E)=>{I();var b=$("🎨");d(w,b)},$$slots:{default:!0}}),s(h);var l=p(h,2);it(l,{});var c=p(l,2),z=i(c),L=i(z);$a(L,{pkg:n}),s(z),s(c);var k=p(c,2),q=i(k);xa(q,{pkg:n,children:(w,E)=>{var b=ot(),D=i(b);Ne(D,{children:(J,ee)=>{I();var K=$("🎨");d(J,K)},$$slots:{default:!0}}),s(b),d(w,b)},$$slots:{default:!0}}),s(k),s(v),N(()=>W(F,n.repo_name)),d(o,v),fe()}export{pt as component};
