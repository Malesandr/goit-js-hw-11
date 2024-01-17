import{i as c,S as m}from"./assets/vendor-18365dff.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const u="41862655-84ddc1d5da0620d7ed5964b7a",l=document.querySelector(".loader");l.style.display="none";const d=async s=>{l.style.display="block";try{const r=await fetch(`https://pixabay.com/api/?key=${u}&q=${encodeURIComponent(s)}&image_type=photo&orientation=horizontal&safesearch=true`);if(!r.ok)throw new Error(r.status);return await r.json()}finally{l.style.display="none"}},f=document.querySelector(".form"),i=document.querySelector(".gallery");f.addEventListener("submit",s=>{s.preventDefault();const r=s.currentTarget.elements.query.value.trim();d(r).then(o=>{if(o.hits.length===0){i.innerHTML="",c.error({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#fff",backgroundColor:"#EF4040",position:"topRight"});return}i.innerHTML="";const n=o.hits.map(e=>`<li class="gallery-item">
                <a class="gallery-link" href="${e.largeImageURL}">
                    <img
                        class="gallery-image"
                        src="${e.webformatURL}"
                        alt="${e.tags}"
                    />
                    <ul class="list">
                        <li class="list-item"><h3>likes</h3><span>${e.likes}</span></li>
                        <li class="list-item"><h3>views</h3><span>${e.views}</span></li>
                        <li class="list-item"><h3>comments</h3><span>${e.comments}</span></li>
                        <li class="list-item"><h3>downloads</h3><span>${e.downloads}</span></li>
                    </ul>
                </a>
            </li>`).join("");i.insertAdjacentHTML("beforeend",n),g.refresh()}).catch(o=>{console.error("Error fetching images:",o),c.error({message:"Failed to fetch images. Please try again later.",messageColor:"#fff",backgroundColor:"#EF4040",position:"topRight"})})});const p={captionsData:"title",captionDelay:250},g=new m(".gallery a",p);
//# sourceMappingURL=commonHelpers.js.map
