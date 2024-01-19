import{S as p,i as c}from"./assets/vendor-18365dff.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const u="41862655-84ddc1d5da0620d7ed5964b7a",l=document.querySelector(".loader");l.style.display="none";const d=async s=>{l.style.display="block";try{const r=await fetch(`https://pixabay.com/api/?key=${u}&q=${encodeURIComponent(s)}&image_type=photo&orientation=horizontal&safesearch=true`);if(!r.ok)throw new Error(r.status);return await r.json()}finally{l.style.display="none"}},m=document.querySelector(".form"),i=document.querySelector(".gallery"),f={captionsData:"title",captionDelay:250},g=new p(".gallery a",f);m.addEventListener("submit",s=>{s.preventDefault();const r=s.currentTarget.elements.query.value.trim();d(r).then(o=>{if(o.hits.length===0){i.innerHTML="",c.error({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#fff",backgroundColor:"#EF4040",position:"topRight"});return}i.innerHTML="";const n=o.hits.map(e=>`<li class="gallery-item">
                <a class="gallery-link" href="${e.largeImageURL}">
                    <img
                        class="gallery-image"
                        src="${e.webformatURL}"
                        alt="${e.tags}"
                    />
                    <ul class="list">
                        <li><p class='list-item'>💗Likes<span>${e.likes}</span></p></li>
                        <li><p class='list-item'>👁️Views<span>${e.views}</span></p></li>
                        <li><p class='list-item'>💬Comments<span>${e.comments}</span></p></li>
                        <li><p class='list-item'>💌Downloads<span>${e.downloads}</span></p></li>
                    </ul>
                </a>
            </li>`).join("");i.insertAdjacentHTML("beforeend",n),g.refresh(),m.reset()}).catch(o=>{console.error("Error fetching images:",o),c.error({message:"Failed to fetch images. Please try again later.",messageColor:"#fff",backgroundColor:"#EF4040",position:"topRight"})})});
//# sourceMappingURL=commonHelpers.js.map
