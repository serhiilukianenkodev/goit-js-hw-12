import{a as h,S as f,i as l}from"./assets/vendor-Dpd1z_xS.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();class L{constructor(){this.baseURL="https://pixabay.com/api/",this.API_KEY="29142435-196ab0ea47673651fa34d9a29",this.page=1,this.perPage=40,this.query=""}setQuery(t){this.query=t,this.page=1}setNextPage(){this.page+=1}async getData(){const t={key:this.API_KEY,q:this.query,per_page:this.perPage,page:this.page,image_type:"photo",orientation:"horizontal",safesearch:!0};return await(await h.get(this.baseURL,{params:t})).data}}function d(s){return s.map(t=>w(t)).join("")}function w(s){const{webformatURL:t,largeImageURL:o,tags:a,likes:e,views:r,comments:i,downloads:y}=s;return`        
        <li class = "gallery-card">
          <a href="${o}">
            <img src="${t}" alt="${a}" width="360" height="200" class = "card-img" />
            <ul class = "card-stats">
              <li class = "card-stat">
                <p>Likes</p>
                <span>${e}</span>
              </li>
              <li class = "card-stat">
                <p>Views</p>
                <span>${r}</span>
                </li>
              <li class = "card-stat">
                <p>Comments</p>
                <span>${i}</span>
              </li>
              <li class = "card-stat">
                <p>Downloads</p>
                <span>${y}</span>
              </li>
            </ul>
          </a>
        </li>`}const u=document.querySelector(".loader");function g(){u.classList.remove("hide")}function m(){u.classList.add("hide")}const n={form:document.querySelector(".js-form"),galleryList:document.querySelector(".js-gallery"),loadMoreBtn:document.querySelector(".js-load-more")};n.form.addEventListener("submit",b);n.loadMoreBtn.addEventListener("click",P);const q={captionSelector:"img",captionsData:"alt",captionDelay:250},c=new L,p=new f(".gallery a",q);async function b(s){s.preventDefault();const t=s.target.elements.query.value.trim();if(!t)return l.warning({position:"center",message:"Your query is empty"});n.galleryList.innerHTML="",g();try{c.setQuery(t);const a=await c.getData();if(console.log(a),a.hits.length===0)throw new Error("Sorry, there are no images matching your search query. Please try again!");const e=await a.hits;n.galleryList.innerHTML=d(e),p.refresh()}catch({message:a}){l.error({position:"center",messageColor:"red",message:a,iconUrl:"img/toast-icon.svg"})}m(),s.target.reset()}async function P(){c.setNextPage(),g();try{const s=await c.getData();console.log(s);const t=await s.hits;n.galleryList.insertAdjacentHTML("beforeend",d(t)),p.refresh()}catch({message:s}){l.error({position:"center",messageColor:"red",message:s,iconUrl:"/img/toast-icon.svg"})}m()}
//# sourceMappingURL=index.js.map
