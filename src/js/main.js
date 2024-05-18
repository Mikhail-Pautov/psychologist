

window.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelectorAll('.btn');
    const modal = document.querySelector('.modal');
    const close = document.querySelector('.modal__wrapper-close');
    
    
//modal
    btn.forEach(button => {
        if(!button.classList.contains('modal__btn')){
            button.addEventListener('click', () => {
                showModal();
            })
        }
    })

    close.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
            if(e.key === 'Escape' && modal.classList.contains('modal_active')){
                closeModal();
            }
    });  
    

    function showModal() {
        modal.classList.add('modal_active');
        document.body.style.overflow = 'hidden'; 
         modal.addEventListener('click', (e) => {
            if(e.target.classList.contains('modal_active')){
                closeModal();
            }
        });
    }
    
    function closeModal() {
        modal.classList.remove('modal_active');
        document.body.style.overflow = ''; 
        contForm.classList.remove('modal__info_inactive');
        modalInfo.classList.add('modal__info_inactive');   
    }
  
//form
    const contForm = document.querySelector('.modal__form');
    const modalInfo = document.querySelector('.modal__info');
    const modalInfoBtn = document.querySelector('.modal__btn');
    const input = document.querySelectorAll('.modal__form input');
    
    const postDate = async (url, data) => {
        let res =  await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

    input.forEach((item, i) => {
        item.addEventListener('input', (e) => {
            if(input[i].name == 'phone'){
                let message = document.querySelector('.modal__notification');
                if(!/[0-9]/g.test(e.data)){
                    input[i].style.borderColor = 'red';
                    message.style.display = 'block';   
                } else {
                    input[i].textContent = '';
                    input[i].style.borderColor = '';
                    message.style.display = '';
                }
                input[i].value = input[i].value.replace(/\D/, "");
            }
        });
    });

    const clearInputs = () => {
        input.forEach(item => {
            item.value = '';
        });
    };
    
    contForm.addEventListener('submit', (e) => {
        e.preventDefault();
        contForm.classList.add('modal__info_inactive');
        modalInfo.classList.remove('modal__info_inactive');
        
        const formData = new FormData(contForm);

        postDate('server.php', formData)
            .then(res => {
                console.log(res);
            })
            .catch(() => {
                let error = new Error();
                console.log(error.message);
            })
            .finally(() => {
                clearInputs();
                setTimeout(() => {
                    closeModal();
                }, 5000);
            })
    });
    
    modalInfoBtn.addEventListener('click', closeModal);


//servicesItems
    const servicesItem = document.querySelectorAll('.services__item');
    const servicesText = document.querySelectorAll('.services__text');
    const mQuery = window.matchMedia('(max-width: 577px)');
    const screenWidth = window.visualViewport.width;

    let block = document.createElement('div');
    block.classList.add('services__item-ar');
    if(screenWidth > 576) {
        servicesItem[0].append(block);
    } else {
        servicesText[0].classList.add('services__text_hidden');
    }
    

    mQuery.addEventListener('change', () => { 
        if(mQuery.matches){
            block.classList.remove('services__item-ar');
            servicesText.forEach(item => {
                item.classList.add('services__text_hidden');
            });  
        } else {
            servicesItem[0].append(block);
            block.classList.add('services__item-ar');
            servicesText.forEach(item => {
                item.classList.add('services__text_hidden');
            });
        }   
    });
    
    servicesItem.forEach((item, i) => {
        item.addEventListener('click', (e) => {
            let elem = e.target;
            elem.append(block);

            servicesText.forEach(item => {
                item.classList.add('services__text_hidden');
            });

            servicesText[i].classList.remove('services__text_hidden');

        //servicesItems max-width: 576px
            if(mQuery.matches){
                block.remove();
                let addContent = servicesText[i];
                servicesItem[i].after(addContent);
            };
           
        });
    });


//slider feedback

    const reviewsItem = document.querySelectorAll('.reviews__item');
    const next = document.querySelector('.reviews__next');
    const back = document.querySelector('.reviews__back');
    let coun = 0;
    const reviewsCircles = document.querySelector('.reviews__circles');
    

    //<div class="reviews__circles_activ"></div>
    for(let i = 0; i < reviewsItem.length; i++){
        const div = document.createElement('div');
        div.classList.add('reviews__circle');
        reviewsCircles.append(div);
    }
    

    const circles = reviewsCircles.children;
    circles[0].classList.add('reviews__circles_activ');
   
    function sliderNext() {
        reviewsItem.forEach((item, i) => {
            item.classList.add('reviews__item_display');
        });

        for(let i = 0; i < circles.length; i++){
            circles[i].classList.remove('reviews__circles_activ');
        }

        if(coun < reviewsItem.length - 1){
            coun++;
            reviewsItem[coun].classList.remove('reviews__item_display');
            circles[coun].classList.add('reviews__circles_activ'); 
        } else{
            reviewsItem[0].classList.remove('reviews__item_display');
            circles[0].classList.add('reviews__circles_activ');  
            coun = 0;
        }; 
    }

    function sliderBack() {
        reviewsItem.forEach((item, i) => {
            item.classList.add('reviews__item_display');
        });

        for(let i = 0; i < circles.length; i++){
            circles[i].classList.remove('reviews__circles_activ');
        }

        if(coun <= 0){
            reviewsItem[reviewsItem.length - 1].classList.remove('reviews__item_display'); 
            circles[reviewsItem.length - 1].classList.add('reviews__circles_activ'); 
            coun = reviewsItem.length - 1;   
        } else {
            coun--;
            reviewsItem[coun].classList.remove('reviews__item_display');
            circles[coun].classList.add('reviews__circles_activ');  
        }
    }

    next.addEventListener('click', () => {
        sliderNext();
    });


    back.addEventListener('click', () => {
        sliderBack();
    });



    //slider swipe
    const reviewsWrapper = document.querySelector('.reviews__wrapper');

    //console.log(reviewsWrapper);
    let touchStr;

    reviewsWrapper.addEventListener('touchstart', (e) => {
        touchStr = e.changedTouches[0].screenX;

        console.log(touchStr);
    });

    reviewsWrapper.addEventListener('touchend', (e) => {
        let toucheEnd = e.changedTouches[0].screenX
        
        console.log(`End ${toucheEnd}`);
        if (toucheEnd < (touchStr - 100)){
            console.log('psina');
            sliderNext();
        }

        if (toucheEnd > (touchStr + 100)){
            console.log('svin');
            sliderBack();
        }
        //console.log(e.changedTouches[0].screenX);

    });


    
}); //psc