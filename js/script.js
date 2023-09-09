document.addEventListener("DOMContentLoaded", () => {
    function initScroll(elem){
        const scroll_blocks = document.querySelectorAll(elem);
        scroll_blocks.forEach(function(scroll_block){
            const thumb = document.createElement('div'),
                  content_block = scroll_block.parentNode,
                  top = 20;
            let is_style, scroll_bar_h, thumb_h, scrollbar_track, top_init, k;   

            function setOptions(){
                content_block.querySelectorAll('.thumb').forEach((e) => {
                    e.remove();
                })

                if (window.screen.width <= 800){
                    document.querySelector('.menu').classList.add('menu-close');
                }

                if (scroll_block.scrollHeight > scroll_block.offsetHeight){
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
            }

            setOptions();

            window.addEventListener("resize", setOptions);      
           
            ['scroll', 'touchmove'].forEach((i) => {
                scroll_block.addEventListener(i, () => {
                    if (scroll_block.scrollHeight > scroll_block.offsetHeight){
                        thumb.style.top =  top_init +  scroll_block.scrollTop*k + 'px';
                        thumb.classList.add("backlight");
                        setTimeout(() => thumb.classList.remove("backlight"), 700);
                    }
                })
            })

            
        });
    }

    initScroll('.scroll-block');

    const tabs = document.querySelectorAll('.menu_categories_items > li');
    tabs.forEach((elem, i) => {
        elem.addEventListener('click', () => {
            if (!elem.classList.contains('tab_active')){
                tabs.forEach((e) => {
                    e.classList.remove("tab_active")
                })
                elem.classList.add("tab_active");
                document.querySelectorAll('.menu_sheet .scroll-block > ul').forEach((e, j) => {
                    e.classList.remove("active_list");
                    if (i == j) e.classList.add("active_list");
                })
                initScroll('.menu_sheet > .scroll-block');
            }
        })
    });

    
    document.querySelector('.sliding-menu__close').addEventListener('click', () => {
        document.querySelector('.menu').classList.add('menu-close');
    });

    document.querySelector('.collapsed-menu').addEventListener('click', () => {
        document.querySelector('.menu').classList.remove('menu-close');
    });
    

    let timer_scrol;
    ['scroll', 'touchmove'].forEach((i) => {
        document.querySelector('.page .scroll-block').addEventListener(i, (e) => {
            const up_arrow = document.querySelector('.up-arrow');
            if (e.target.scrollTop > 200){
                up_arrow.classList.remove('hidden');
            }else{
                up_arrow.classList.add('hidden');
            }
        })
    });
    
    document.querySelector('.up-arrow').addEventListener('click', () => {
        if (timer_scrol) clearInterval(timer_scrol);
        const scroll_block = document.querySelector('.page .scroll-block'),
        scroll = scroll_block.scrollTop;
        timer_scrol = setInterval(function(){
            console.log(scroll_block.scrollTop);
            if (scroll_block.scrollTop > 0) {
                scroll_block.scrollTop -= scroll/50;
            } else {
                clearInterval(timer_scrol);
            }
        }, 15);  
    });


  });

  const detect = new MobileDetect(window.navigator.userAgent);
  if (detect.mobile()){
      document.write('<style>.scroll-block{width: 100%} .thumb{visibility: hidden!important;}</style>');
  }