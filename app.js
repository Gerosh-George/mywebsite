window.addEventListener("load", function(){
    const loader=document.querySelector(".loader");
    loader.className+=" hidden";
});

document.addEventListener('DOMContentLoaded',init); 

var currentPageIndex=0;

const typewriter=function(txtElement,words,wait=3000){
    this.txtElement=txtElement;
    this.words=words;
    this.wait=parseInt(wait);
    this.txt="";
    this.wordIndex=0;
    this.type();
    this.isDeleting=false;
}

typewriter.prototype.type=function(){
    
    const index=this.wordIndex % this.words.length;
    const currentWord=this.words[index];
    
    if(this.isDeleting){
     this.txt=currentWord.substring(0,this.txt.length - 1);
 
    } else{
        this.txt=currentWord.substring(0,this.txt.length + 1);
    }
 
    this.txtElement.innerHTML=`<span class="cursor">${this.txt}</span>`;
 
    //Initial Type Speed
    let typespeed=200;
    
    //varying the speed
    if(this.isDeleting){
        typespeed=50;
    }
 
    //check is word is complete
    if(this.txt===currentWord && !this.isDeleting){
        typespeed=this.wait;
        this.isDeleting=true;
    } else if(this.isDeleting && this.txt===''){
        this.isDeleting=false;
        this.wordIndex++;
        typespeed=500;
    }
 
 
 
    setTimeout(()=>this.type(),typespeed);
}

function init(){
    const txtElement=document.querySelector('.typing');
    const words=JSON.parse(txtElement.getAttribute('data-words'));
    const wait=txtElement.getAttribute('data-wait');
   
    new typewriter(txtElement,words,wait); 

    aboutbtn=document.querySelector('.about-button a')
    aboutbtn.addEventListener('click',aboutChange)

}

function aboutChange(event)
{
  const navlinks=document.querySelectorAll('.link')
  id=event.target.getAttribute('href')

  navlinks.forEach((link,index)=>{
      if(link.getAttribute('href')===id){
        link.classList+=" active"
        displaySection(link.getAttribute('href'),index)
      } else{
          link.classList.remove('active')
      }
  })

}

function change(event){
  event.classList.toggle('change')
  const container=document.querySelector(".nav-container");
  const navbar=document.querySelector(".nav-links");
 
  if(navbar.style.display==='flex'){
    container.style.width=`50px`;
    container.style.height=`50px`;
    navbar.style.display=`none`;
  } else{
    container.style.width=`100px`;
    container.style.height=`350px`;
    navbar.style.display=`flex`;
  }

  const navlinks=document.querySelectorAll(".nav-links li")

  navlinks.forEach((link)=>{
    if(link.style.animation==='navLinkFade .8s ease forwards'){
        link.style.animation='';
    } else{
        link.style.animation=`navLinkFade .8s ease-in forwards`;
        link.addEventListener('click',activeChange)
    }
  })
}

function activeChange(event){
    const updatelink=event.target
    const navlinks=document.querySelectorAll('.link')
    navlinks.forEach((link,index)=>{
       link.classList.remove("active")
       if(link===updatelink)
       displaySection(updatelink.getAttribute('href'),index)
       
    })

    updatelink.classList+=" active"  
    change(document.querySelector('.burger'))
}

function displaySection(id,index){
   const pages=document.querySelectorAll('section')
   const currentPage=pages[currentPageIndex]
  
   const nextPage=document.querySelector(id)
  
    currentPage.classList.remove('active')
    //currentPage.style.display=`none`
   
    // nextPage.style.display=`block`
    nextPage.classList+=" active"

   currentPageIndex=index 

}