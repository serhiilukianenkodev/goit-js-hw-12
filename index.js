import{a as p,S as d,i as c}from"./assets/vendor-BqSmJx-A.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const m="29142435-196ab0ea47673651fa34d9a29",f="https://pixabay.com/api/";function y(o){const r={key:m,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0};return p.get(f,{params:r})}function g(o){return o.map(r=>h(r)).join("")}function h(o){const{webformatURL:r,largeImageURL:i,tags:s,likes:e,views:t,comments:a,downloads:u}=o;return`        
        <li class = "gallery-card">
          <a href="${i}">
            <img src="${r}" alt="${s}" width="360" height="200" class = "card-img" />
            <ul class = "card-stats">
              <li class = "card-stat">
                <p>Likes</p>
                <span>${e}</span>
              </li>
              <li class = "card-stat">
                <p>Views</p>
                <span>${t}</span>
                </li>
              <li class = "card-stat">
                <p>Comments</p>
                <span>${a}</span>
              </li>
              <li class = "card-stat">
                <p>Downloads</p>
                <span>${u}</span>
              </li>
            </ul>
          </a>
        </li>`}const l=document.querySelector(".loader");function L(){l.classList.remove("hide")}function w(){l.classList.add("hide")}const n={form:document.querySelector(".js-form"),galleryList:document.querySelector(".js-gallery")};n.form.addEventListener("submit",q);const b={captionSelector:"img",captionsData:"alt",captionDelay:250},S=new d(".gallery a",b);function q(o){o.preventDefault();const r=o.target.elements.query.value.trim();if(!r)return c.warning({position:"center",message:"Your query is empty"});n.galleryList.innerHTML="",L(),y(r).then(({data:s})=>{if(s.hits.length===0)throw new Error("Sorry, there are no images matching your search query. Please try again!");return s.hits}).then(s=>{n.galleryList.innerHTML=g(s),S.refresh()}).catch(({message:s})=>{c.error({position:"center",messageColor:"red",message:s})}).finally(()=>w()),o.target.reset()}
//# sourceMappingURL=index.js.map
