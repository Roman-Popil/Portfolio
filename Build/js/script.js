/*
var button = document.getElementById("button");
button.onclick = function () {
    if  (button.style.backgroundImage != "url(photo.png)" ) {
        button.style.backgroundImage = "url(photo2.png)";
    }
}*/
let HIDDEN_CLASS_NAME = 'hidden'
let TARGET_CLASS_NAME = 'target'
let SOURCE_CLASS_NAME = 'source'

let targetIdToShow = 1
let counter = 0;

let order = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    length: function () {
        let buf = 0;
        for (i = 0; i < 6; i++) {
            buf += this[i].length;
        }
        return buf;
    },
    dispatch: function () {
        let buf = []
        for (i = 0; i < 6; i++) {
            for (let j = 0; j < this[i].length; j++) {
                buf.push(this[i][j].replace(/\r?\n/g, ""))
            }
        }
        return buf.join('. ')
    }
};

let activeTabNumber;



function main() {
    let targets = getElements(TARGET_CLASS_NAME)
    let sources = getElements(SOURCE_CLASS_NAME)
    sources.forEach(function (sourceNode) {
        let sourceNodeId = extractId(sourceNode, SOURCE_CLASS_NAME)
        sourceNode.addEventListener('click', function () {
            showTarget(targets, sourceNodeId)
        })
    })
    showTarget(targets, targetIdToShow)
}

function getElements(type) {
    return [].slice.call(document.querySelectorAll('.' + type)).sort(function (targetNode1, targetNode2) {
        let target1Num = extractId(targetNode1, TARGET_CLASS_NAME)
        let target2Num = extractId(targetNode2, TARGET_CLASS_NAME)
        return target1Num > target2Num
    })
}

function extractId(targetNode, baseClass) {
    let currentClassIndex = targetNode.classList.length
    while (currentClassIndex--) {
        let currentClass = targetNode.classList.item(currentClassIndex)
        let maybeIdNum = parseInt(currentClass.split('-')[1])
        if (isNaN(maybeIdNum)) {
            continue
        }
        let classStrinToValidate = baseClass + '-' + maybeIdNum
        if (classStrinToValidate === currentClass) {
            return maybeIdNum
        }
    }
}

function showTarget(targets, targetId) {
    targets.forEach(function (targetNode, targetIndex) {
        let currentTargetNodeId = extractId(targetNode, TARGET_CLASS_NAME)
        if (currentTargetNodeId === targetId) {
            targetNode.classList.remove(HIDDEN_CLASS_NAME)
        } else {
            targetNode.classList.add(HIDDEN_CLASS_NAME)
        }
    })
}

main()

/*
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; length++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener('click', function (e){
            const popupName = popupLink.getAttribute('href').replace('#','');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}*/


$(document).ready(function () {

    textBuildFuture();

    $("#menu").on("click", "a", function (event) {
        event.preventDefault();
        $(document).on('mousedown wheel DOMMouseScroll mousewheel keyup touchmove', function () {
            $('body,html').stop(true)
            $(document).unbind()
        });
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top
        }, 500);
    });
});

$(document).ready(function () {
    $("#menu2").on("click", "a", function (event) {
        event.preventDefault();
        $(document).on('mousedown wheel DOMMouseScroll mousewheel keyup touchmove', function () {
            $('body,html').stop(true)
            $(document).unbind()
        });
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top
        }, 800);
    });
});

$(document).ready(function () {
    $("#menu3").on("click", "a", function (event) {
        event.preventDefault();
        $(document).on('mousedown wheel DOMMouseScroll mousewheel keyup touchmove', function () {
            $('body,html').stop(true)
            $(document).unbind()
        });
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top
        }, 900);
    });

});



$(document).ready(function () {

    $('.popup-link').each(function () {
        $(this).on('click', function () {
            $('.popup').css({
                'opacity': 1,
                'visibility': 'visible'
            })
            $('.header__top').fadeOut();
            $('.button_add').text(`${$(`.button_add`).text().replace(/ \([0-99]\)/g, '')} (${order.length()})`);
            $('.popup').fadeIn('slow');
        });
    })


    $('.close-popup_modal').on('click', function () {
        $('.popup').css({
            'opacity': 0,
            'visibility': 'hidden'
        });
        $('.header__top').fadeIn();
        $('.button_add').text(`${$(`.button_add`).text().replace(/ \([0-99]\)/g, '')} (${order.length()})`)
    });


    $('form').submit(function (e) { // form submit action and server communication
        e.preventDefault();
        console.log(order)
        $.ajax({
            type: 'POST',
            url: 'mailer/smart.php',
            data: $(this).serialize() + '&add=' + encodeURIComponent(order.dispatch()) + '&lang='+ encodeURIComponent(lang)
        }).done(function () {
            $(this).find('input').val('');
            $('form').trigger('reset');
            $('.button_add').text(`${$('.button_add').text().replace(/ \([0-99]\)/g, '')}`);
            $('.popup').css({
                'opacity': 0,
                'visibility': 'hidden'
            });
            $('.popup').fadeOut('slow');
            $('.header__top').fadeIn();
            for (let i = 0; i < 6; i++) {
                order[i] = [];
                $(`.popup__body .target-${i+1} .portfolio__modal__text`).each(function (j) {
                    $(this).removeClass('portfolio__modal__text__active');
                    $(`.target-${i+1} .portfolio__modal__text input`).eq(j).removeAttr('checked');
                });
                $(`.popup__body .portfolio__item`).removeClass('portfolio__item-add');
            }
            $('.header__top').fadeIn();
        });
        return false;
    });


    $(".portfolio").clone().appendTo(".popup__body:last").fadeOut('fast'); //  initialization popup portfolio
    $(`<div class="popup__button mt-50 lang" key='popup portfolio button back'>
    <a href="#popup">
    <button class="button button_close">НАЗАД</button>
    </a>
    </div>`).appendTo(".popup__body .portfolio").fadeOut('fast');


    for (let i = 0; i < 6; i++) { // initialazing popup window with text
        $(`.original .target-${i+1}`).clone().addClass(`popup_manipulate popup_manipulate-${i+1}`).removeClass('hidden').appendTo(".popup__body:last").fadeOut();
        $(`
        <div class="popup__button button_added">
        <a href="#popup">
        <button class="button button_added_btn lang" key='popup window button add'>ДОДАТИ (0)</button>
        </a>
        </div>
        <div class="popup__button button_manipulate">
        <a href="#popup">
        <button class="button button_close_inner lang" key='popup window button back'>НАЗАД</button>
        </a>
        </div>`).appendTo(`.popup__body .target-${i+1}`).fadeOut();
    }


    $('.button_added_btn').click(function (e) { // add something to your order (portfolio button)

        e.stopPropagation();

        $(".popup__body .portfolio").fadeIn();
        $(".popup__body .popup__button").fadeIn()



        if (activeTabNumber == 0 || activeTabNumber == 5) {
            if (order[activeTabNumber].length == 1) {
                order[activeTabNumber] = [];
                $('.popup__body .portfolio__item').eq(activeTabNumber).removeClass('portfolio__item-add');
                // if (activeTabNumber == 0) {
                //     $('.portfolio_button_add-modal').eq(0).text('ДОДАТИ В ЗАМОВЛЕННЯ');
                // } else {
                //     $('.portfolio_button_add-modal').eq(1).text('ДОДАТИ В ЗАМОВЛЕННЯ');
                // }
            } else {
                order[activeTabNumber][0] = dict['manager'][activeTabNumber];
                $('.popup__body .portfolio__item').eq(activeTabNumber).addClass('portfolio__item-add');
                // if (activeTabNumber == 0) {
                //     $('.portfolio_button_add-modal').eq(0).text('ВИДАЛИТИ З ЗАМОВЛЕННЯ');
                // } else {
                //     $('.portfolio_button_add-modal').eq(1).text('ВИДАЛИТИ З ЗАМОВЛЕННЯ');
                // }
            }
        } else {
            if (order[activeTabNumber].length !== 0) {
                $('.popup__body .portfolio__item').eq(activeTabNumber).addClass('portfolio__item-add');
            } else {
                $('.popup__body .portfolio__item').eq(activeTabNumber).removeClass('portfolio__item-add');
            }
        }

        $('.popup__body .popup_manipulate').fadeOut();
        $('.button_manipulate').fadeOut();
        $('.popup__body .portfolio').fadeIn();
        $('.popup__body .portfolio .popup__button').fadeIn();

    });


    $('.popup__body .portfolio__item').each(function (i) { // onclick for tabs

        $(this).on('click', function (e) {
            // counter++
            e.preventDefault();
            activeTabNumber = i;

            $(`.popup__body .target-${i+1}`).fadeIn();
            $(`.popup__body .target-${i+1} .popup__button`).fadeIn();
            $('.popup__body .portfolio').fadeOut();
            $('.popup__body .portfolio .popup__button').fadeOut();

            if (i == 0) {
                $('.popup__body .portfolio__security__button__element').remove()
            }
            if (i == 5) {
                $('.popup__body .portfolio__window__button__element').remove()
            }

            if ($(`.target-${i+1}`).children('.button_manipulate').length > 1) {
                $(`.target-${i+1} .button_manipulate`).eq(1).remove();
            }

            if ((i == 0 || i == 5)) {
                if (order[i].length == 1) {
                    if (lang == 'ru') {
                        $(`.target-${i+1} .button_added_btn`).text('УДАЛИТЬ');
                    } else if (lang == 'en') {
                        $(`.target-${i+1} .button_added_btn`).text('REMOVE');
                    } else {
                        $(`.target-${i+1} .button_added_btn`).text('ВИДАЛИТИ');
                    }
                } else {
                    if (lang == 'ru') {
                        $(`.target-${i+1} .button_added_btn`).text('ДОБАВИТЬ (1)');
                    } else if (lang == 'en') {
                        $(`.target-${i+1} .button_added_btn`).text('ADD (1)');
                    } else {
                        $(`.target-${i+1} .button_added_btn`).text('ДОДАТИ (1)');
                    }
                }
            } else {
                if (order[i].length == 0) {
                    $(`.target-${i+1} .button_added_btn`).text(`${$(`.target-${i+1} .button_added_btn`).text().replace(/ \([0-99]\)/g, '')} (0)`);
                } else {
                    $(`.target-${i+1} .button_added_btn`).text(`${$(`.target-${i+1} .button_added_btn`).text().replace(/ \([0-99]\)/g, '')} (${order[i].length})`);
                }
            }

        });
    });


    for (let i = 0; i < 6; i++) { // onclick for tab text
        $(`.popup__body .target-${i+1} .portfolio__modal__text`).each(function (j) {
            $(this).html(`
                <input type="checkbox" id='${i}-${j}' class='popup__modal-checkbox'> ${$(this).html()}
            `)
            $(this).on('click', function () {
                $('.target a').on('click', function (evn) {
                    evn.preventDefault();
                });
                if ($(this).hasClass('portfolio__modal__text__active') || isInArray(order[i], lookText(i, j))) {
                    $(`.target-${i+1} .portfolio__modal__text input`).eq(j).removeAttr('checked');
                    $(this).removeClass('portfolio__modal__text__active');
                    contains(order[i], lookText(i, j));
                    $('.button_added_btn').text(`${$(`.target-${i+1} .button_added_btn`).text().replace(/ \([0-99]\)/g, '')} (${order[i].length})`);
                } else {
                    $(`.target-${i+1} .portfolio__modal__text input`).eq(j).attr('checked', 'checked');
                    $(this).addClass('portfolio__modal__text__active');
                    contains(order[i], lookText(i, j));
                    $('.button_added_btn').text(`${$(`.target-${i+1} .button_added_btn`).text().replace(/ \([0-99]\)/g, '')} (${order[i].length})`);
                }
            });
        });
    }


    


    $('.img__show').each(function () {
        $(this).on('click', function () {
            let tmp = $(this).attr("src");
            $('.photo__container img').attr({
                src: tmp
            });
            $('.photo__container').fadeIn('slow').css({
                'display': 'flex'
            });
        });
    });

    $('.img__show1').each(function () {
        $(this).on('click', function () {
            let tmp = $(this).attr("src");
            $('.photo__container img').attr({
                src: tmp
            });
            $('.photo__container').fadeIn('slow').css({
                'display': 'flex'
            });
            $('.photo__container img').addClass('img__show-modify');
        });
    });

    $('.photo__container').on('click', function () {
        $(this).fadeOut();
        $('.photo__container img').removeClass('img__show-modify');
    });





    $('.button_close_inner').click(function (e) { // button that will close tab with text

        e.stopPropagation();

        if (activeTabNumber != 0 && activeTabNumber != 5) {
            if (order[activeTabNumber].length == 0) {
                $('.popup__body .portfolio__item').eq(activeTabNumber).removeClass('portfolio__item-add');
            } else {
                $('.popup__body .portfolio__item').eq(activeTabNumber).addClass('portfolio__item-add');
            }
        }

        $('.popup__body .popup_manipulate').fadeOut();
        $('.button_manipulate').fadeOut();
        $('.popup__body .portfolio').fadeIn()
        $('.popup__body .portfolio .popup__button').fadeIn()

    });


    $('.button_add').click(function (event) {

        event.preventDefault();

        $(".popup__body .portfolio").fadeIn();
        $('.popup__body .portfolio .popup__button').fadeIn('slow');
        $('.popup__content').fadeOut();
        $('.button_add').text(`${$(`.button_add`).text().replace(/ \([0-99]\)/g, '')} (${order.length()})`)
    });


    $('.button_close').click(function (e) {

        e.stopPropagation();

        $('.button_add').text(`${$(`.button_add`).text().replace(/ \([0-99]\)/g, '')} (${order.length()})`)
        $('.header__top').fadeOut();
        $('.popup__content').fadeIn();
        $(".popup__body .portfolio").fadeOut();
        $('.popup__body .portfolio .popup__button').fadeOut();
    });


    // $('.popup-link').on('click', function () {

    //     $('.button_add').text(`${$(`.button_add`).text().replace(/ \([0-99]\)/g, '')} (${order.length()})`)

    //     $('.popup').fadeIn('slow')
    // });

    // $('.original .')



    





});

function contains(arr, elem) {
    let isDel = false;
    if (!arr) {
        arr[0] = elem;
        return false;
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
            arr.splice(i, 1);
            isDel = true;
        }
    }
    if (!isDel) {
        arr.push(elem);
    }
}

function isInArray(arr, elem) {
    if (!arr) {
        return false;
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
            return true;
        }
    }
    return false
}

function textBuildFuture() {
    $(".child").click(function () {
        $(".child").slideToggle(300);
        $("#del").fadeIn('fast');
    });

    $('.close-div').on('click', function () {
        $("#del").fadeOut('fast');
        $(".child").slideToggle(300);
    });

    $(".child1").click(function () {
        $(".child1").slideToggle(300);
        $("#del1").fadeIn('fast');
    });

    $('.close-div1').on('click', function () {
        $("#del1").fadeOut('fast');
        $(".child1").slideToggle(300);
    });
}

function lookText(index, jndex) {
    return dict['manager'][$(`.target-${index+1} .portfolio__modal__text .lang`).eq(jndex).attr('key')]
}