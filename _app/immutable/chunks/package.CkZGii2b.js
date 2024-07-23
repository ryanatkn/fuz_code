import{h as G,D as K,E as Q,F as U,c as b,a as m,G as V,r as C,s as h,t as I,A as L,f as z}from"./disclose-version.DmqFFlDb.js";import{A as q,T as Y,j as M,U as Z,t as j,f as P,x as W,p as J,k as X}from"./runtime.FmDKBwYY.js";import{c as B,d as $,s as tt}from"./render.DnMpFBUO.js";import{p as E,i as k}from"./props.CyqmOE7U.js";import{s as T}from"./snippet.Czwopv54.js";function st(t,s){if(s){const e=document.body;t.autofocus=!0,q(()=>{document.activeElement===e&&t.focus()})}}function D(t,s,e){e=e==null?null:e+"";var r=t.__attributes??(t.__attributes={});G&&(r[s]=t.getAttribute(s),s==="src"||s==="href"||s==="srcset")||r[s]!==(r[s]=e)&&(s==="loading"&&(t[Y]=e),e===null?t.removeAttribute(s):t.setAttribute(s,e))}function et(t,s,e,r,i){var v=i.length!==0,l=s||{},u=t.tagName==="OPTION";for(var p in s)p in e||(e[p]=null);v&&!e.class&&(e.class="");var d=F.get(t.nodeName);d||F.set(t.nodeName,d=it(t));var w=t.__attributes??(t.__attributes={}),f=[];for(const a in e){let n=e[a];if(u&&a==="value"&&n==null){t.value=t.__value="",l[a]=n;continue}var o=l[a];if(n!==o){l[a]=n;var c=a[0]+a[1];if(c!=="$$")if(c==="on"){const y={},N="$$"+a;let g=a.slice(2);var A=U.includes(g);if(K(g)&&(g=g.slice(0,-7),y.capture=!0),!A&&o){if(n!=null)continue;t.removeEventListener(g,l[N],y),l[N]=null}if(n!=null)if(A)t[`__${g}`]=n,$([g]);else{let S=function(R){l[a].call(this,R)};s?l[N]=B(g,t,S,y):f.push([a,n,()=>l[N]=B(g,t,S,y)])}}else if(n==null)w[a]=null,t.removeAttribute(a);else if(a==="style")t.style.cssText=n+"";else if(a==="autofocus")st(t,!!n);else if(a==="__value"||a==="value")t.value=t[a]=t.__value=n;else{var _=a;r&&(_=_.toLowerCase(),_=Q[_]||_),d.includes(_)?G&&(_==="src"||_==="href"||_==="srcset")||(t[_]=n):typeof n!="function"&&(v&&_==="class"&&(n&&(n+=" "),n+=i),D(t,_,n))}}}return s||q(()=>{if(t.isConnected)for(const[a,n,y]of f)l[a]===n&&y()}),l}var rt=["width","height"],F=new Map;function it(t){for(var s=[],e,r=M(t);r.constructor.name!=="Element";){e=Z(r);for(var i in e)e[i].set&&!rt.includes(i)&&s.push(i);r=M(r)}return s}function yt(t,s){var e=t.__className,r=at(s);G&&t.className===r?t.__className=r:(e!==r||G&&t.className!==r)&&(s==null?t.removeAttribute("class"):t.className=r,t.__className=r)}function at(t){return t??""}function ot(t,s,e){e?t.classList.add(s):t.classList.remove(s)}function H(t,s,e,r){const i=t.style,v=i.getPropertyValue(s);e==null?v!==""&&i.removeProperty(s):v!==e&&i.setProperty(s,e,"")}const x=(t,s)=>!s||!t.startsWith(s)?t:t.substring(s.length),O=(t,s)=>!s||!t.endsWith(s)?t:t.substring(0,t.length-s.length),nt=(t,s)=>t.endsWith(s)?t:t+s,lt=t=>O(x(x(t,"https://"),"www."),"/");var ct=V(`<svg><path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02
		15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32
		12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12
		11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33
		11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74
		5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95
		7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31
		12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12
		7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01
		13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71
		14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)"></path></svg>`);function ut(t,s){const e=E(s,"fill",3,"var(--text_color, #000)"),r=E(s,"size",3,"var(--space_xl7, 64px)"),i=E(s,"label",3,"the GitHub icon, an octocat silhouette"),v=W(()=>s.width??r()),l=W(()=>s.height??r());var u=ct();let p;var d=b(u);C(u),j(()=>{p=et(u,p,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024",...s.attrs,"aria-label":i(),class:s.classes},!1,"svelte-16ciom8"),ot(u,"inline",s.inline),H(u,"width",P(v)),H(u,"height",P(l)),D(d,"fill",e())}),m(t,u)}var ft=I('<div class="root_url svelte-cs8o0f"><a> </a></div>'),vt=I('<footer class="box"><!> <div class="logo box panel p_lg shadow_inset_xs svelte-cs8o0f"><!> <a rel="me" title="source code on GitHub" class="svelte-cs8o0f"><!></a> <!></div> <!></footer>');function bt(t,s){J(s,!0);const e=E(s,"root_url",3,null);var r=vt(),i=b(r);k(i,()=>s.children,f=>{var o=L(),c=z(o);T(c,()=>s.children),m(f,o)});var v=h(h(i,!0)),l=b(v);k(l,()=>s.logo_header,f=>{var o=L(),c=z(o);T(c,()=>s.logo_header),m(f,o)});var u=h(h(l,!0)),p=b(u);k(p,()=>s.logo,f=>{var o=L(),c=z(o);T(c,()=>s.logo),m(f,o)},f=>{ut(f,{})}),C(u);var d=h(h(u,!0));k(d,()=>s.logo_footer,f=>{var o=L(),c=z(o);T(c,()=>s.logo_footer),m(f,o)}),C(v);var w=h(h(v,!0));k(w,e,f=>{var o=ft(),c=b(o),A=b(c);j(()=>tt(A,lt(e()))),C(c),C(o),j(()=>D(c,"href",e())),m(f,o)}),C(r),j(()=>D(u,"href",s.pkg.repo_url)),m(t,r),X()}const Ct=(t,s)=>{const{name:e}=t,i=(c=>c?O(x(O(c,".git"),"git+"),"/"):null)(t.repository?typeof t.repository=="string"?t.repository:t.repository.url:null);if(!i)throw new Error("failed to parse package_meta - `repo_url` is required in package_json");const v=t.homepage??null,l=!t.private&&!!t.exports&&t.version!=="0.0.1",u=l?"https://www.npmjs.com/package/"+t.name:null,p=l&&i?i+"/blob/main/CHANGELOG.md":null,d=_t(e),w=i?x(i,"https://github.com/").split("/")[0]:null,f=v?nt(v,"/")+(t.logo?x(t.logo,"/"):"favicon.png"):null,o=t.logo_alt??`logo for ${d}`;return{package_json:t,src_json:s,name:e,repo_name:d,repo_url:i,owner_name:w,homepage_url:v,logo_url:f,logo_alt:o,npm_url:u,changelog_url:p,published:l}},_t=t=>t[0]==="@"?t.split("/")[1]:t,wt={name:"@ryanatkn/fuz_code",version:"0.17.0",description:"syntax highlighting using prismjs for Svelte, SvelteKit, TypeScript, and Fuz",glyph:"🎨",logo:"logo.svg",logo_alt:"a friendly pink spider facing you",public:!0,license:"MIT",homepage:"https://code.fuz.dev/",repository:"https://github.com/ryanatkn/fuz_code",author:{name:"Ryan Atkinson",email:"mail@ryanatkn.com",url:"https://www.ryanatkn.com/"},bugs:"https://github.com/ryanatkn/fuz_code/issues",funding:"https://www.ryanatkn.com/funding",scripts:{start:"gro dev",dev:"gro dev",build:"gro build",check:"gro check",test:"gro test",preview:"vite preview",deploy:"gro deploy"},type:"module",engines:{node:">=20.12"},peerDependencies:{"@ryanatkn/moss":"*","prism-svelte":"^0.5",prismjs:"^1",svelte:"^5.0.0-next.0"},devDependencies:{"@changesets/changelog-git":"^0.2.0","@ryanatkn/belt":"^0.24.11","@ryanatkn/eslint-config":"^0.4.2","@ryanatkn/fuz":"^0.118.1","@ryanatkn/gro":"^0.133.4","@ryanatkn/moss":"^0.11.1","@sveltejs/adapter-static":"^3.0.2","@sveltejs/kit":"^2.5.18","@sveltejs/package":"^2.3.2","@sveltejs/vite-plugin-svelte":"^3.1.1","@types/prismjs":"^1.26.4",eslint:"^9.7.0","eslint-plugin-svelte":"^2.43.0",prettier:"^3.3.3","prettier-plugin-svelte":"^3.2.6","prism-svelte":"^0.5.0",prismjs:"^1.29.0",svelte:"^5.0.0-next.195","svelte-check":"^3.8.4",tslib:"^2.6.3",typescript:"^5.5.4","typescript-eslint":"^8.0.0-alpha.44",uvu:"^0.5.6"},prettier:{plugins:["prettier-plugin-svelte"],useTabs:!0,printWidth:100,singleQuote:!0,bracketSpacing:!1,overrides:[{files:"package.json",options:{useTabs:!1}}]},sideEffects:["**/*.css"],files:["dist","src/lib/**/*.ts","!src/lib/**/*.test.*","!dist/**/*.test.*"],exports:{"./package.json":"./package.json","./Code.svelte":{types:"./dist/Code.svelte.d.ts",svelte:"./dist/Code.svelte",default:"./dist/Code.svelte"},"./prism.css":{default:"./dist/prism.css"},"./remove_prism_css_vite_plugin.js":{types:"./dist/remove_prism_css_vite_plugin.d.ts",default:"./dist/remove_prism_css_vite_plugin.js"}}},kt={name:"@ryanatkn/fuz_code",version:"0.17.0",modules:{"./package.json":{path:"package.json",declarations:[]},"./Code.svelte":{path:"Code.svelte",declarations:[]},"./prism.css":{path:"prism.css",declarations:[]},"./remove_prism_css_vite_plugin.js":{path:"remove_prism_css_vite_plugin.ts",declarations:[{name:"remove_prism_css",kind:"function"}]}}};export{bt as L,H as a,et as b,kt as c,wt as d,nt as e,lt as f,x as g,yt as h,O as i,Ct as p,D as s,ot as t};
