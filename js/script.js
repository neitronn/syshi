document.addEventListener("DOMContentLoaded", () => {
    function initScroll(){
        const scroll_blocks = document.querySelectorAll('.scroll-block');
        scroll_blocks.forEach(function(scroll_block){
            const thumb = document.createElement('div'),
                  content_block = scroll_block.parentNode,
                  top = 20;
            let is_style, scroll_bar_h, thumb_h, scrollbar_track, top_init, k;   
            function setOptions(){
                is_style = content_block.currentStyle || window.getComputedStyle(content_block, null),
                scroll_bar_h = scroll_block.offsetHeight - top*2,
                thumb_h = Math.pow(scroll_bar_h, 2)/scroll_block.scrollHeight,
                scrollbar_track = scroll_bar_h - thumb_h,
                top_init = parseInt(is_style.paddingTop, 10) + top,
                k = scrollbar_track/(scroll_block.scrollHeight - scroll_block.offsetHeight);
                thumb.className = 'thumb';
                thumb.style.height = thumb_h + 'px';
                thumb.style.top =  top_init + 'px';
                content_block.append(thumb);
                thumb.style.top =  top_init +  scroll_block.scrollTop*k + 'px';
            }
            setOptions();
            window.addEventListener("resize", setOptions);      
           
            scroll_block.addEventListener('scroll', () => {
                thumb.style.top =  top_init +  scroll_block.scrollTop*k + 'px';
                thumb.classList.add("backlight");
                setTimeout(() => thumb.classList.remove("backlight"), 700);
            })
        });
    }

    initScroll();
    

  });