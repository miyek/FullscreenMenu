$(document).ready(function(){ 
    
    //variables to toggle
    var navToggle = $('.nav-toggle');
    var active = 'section-active';
    var animation = 'section-animation';    
    var doc = $(document);
    var handler = $('.handler');
    
    //slide and toggle
    var SlideToggle = function(){
        doc.find('.nav-main').slideToggle(500).toggleClass('active');
        navToggle.toggleClass('active');
    }
    
    //Animation toggle ang go to link
    var AnimationToggleLink = function(link){
        //add class active and animation to section
        handler.find('.'+active).removeClass(active).removeClass(animation);
        handler.find(link).addClass(active).addClass(animation);
        //go to link
        window.location = link;
    };
    
    //go Next
    var goNext = function(currentEl, nextEl, lastEl, link){
        nextEl = currentEl.prev();
        if(nextEl.length == 0){
             nextEl = lastEl.last();
        }
        link = '#'+nextEl.attr('id');
        AnimationToggleLink(link);
    }
    
    //go Previous
    var goPrev= function(currentEl, nextEl, lastEl, link){
        nextEl = currentEl.next();
        if(nextEl.length == 0){
            nextEl =lastEl.first();
        }
        link = '#'+nextEl.attr('id');
        AnimationToggleLink(link);
    }
    
    //show menu on click
    navToggle.on('click', function(e){
        e.preventDefault();
        SlideToggle();
    });
    
    //when click on menu go to section
    $('.nav-main').on('click', 'a',function(e, link){
        e.preventDefault;
        //get link 
        link = $(this).attr('href');
        //delay when click
        setTimeout(function(){
            SlideToggle();
            AnimationToggleLink(link);
        },300)     
    });
    
    //on keypress jump to section
    doc.keyup(function(key, currentEl, nextEl, lastEl, link){
        //find all section and count?       
        currentEl = handler.find('.'+active);   
        lastEl = currentEl.parent().find('section');
        //key arrow up
        if(key.keyCode == 38 ){
            goNext(currentEl, nextEl, lastEl);
        }
        //key arrow down
        if(key.keyCode == 40){
            goPrev(currentEl, nextEl, lastEl)
        }
    });
    
    //mousewheel Up or Down
    doc.bind('mousewheel', function(e,currentEl, nextEl, lastEl){
        e.preventDefault();
        //find all section and count?       
        currentEl = handler.find('.'+active);   
        lastEl = currentEl.parent().find('section');
        
        if(e.originalEvent.wheelDelta /120 > 0) {
            goNext(currentEl, nextEl, lastEl);
        }
        else{
           goPrev(currentEl, nextEl, lastEl)
        }
    });
        
    //Enable swiping...
    doc.swipe( {
        //Generic swipe handler for all directions
        swipe:function(event, direction, currentEl, nextEl, lastEl) {
            //find all section and count?       
            currentEl = handler.find('.'+active);   
            lastEl = currentEl.parent().find('section');
            
            if(direction=='left' || direction=="up"){
                goPrev(currentEl, nextEl, lastEl)
            } else{
                goNext(currentEl, nextEl, lastEl);
            }
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
        threshold:75
    });
    
})