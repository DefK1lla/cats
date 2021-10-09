document.addEventListener('DOMContentLoaded', () => {
    // Menu
    const menuBtn = document.querySelector('.menu-btn'),
        menu = document.querySelector('.menu');

    menuBtn.addEventListener('click', () => {
        if (menuBtn.classList.contains('menu-btn--active')) {
            menuBtn.classList.remove('menu-btn--active');
        } else {
            menuBtn.classList.add('menu-btn--active');
        }

        if (menu.classList.contains('menu--active')) {
            menu.classList.remove('menu--active');
        } else {
            menu.classList.add('menu--active');
        }
    });


    // Scroll to top
    const scrollBtn = document.querySelector('.scroll-top');

    scrollBtn.addEventListener('click', (e) => {
        e.preventDefault();

        window.scrollBy({
            top: document.body.getBoundingClientRect().top,
            behavior: "smooth"
        });
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > window.innerHeight) {
            scrollBtn.classList.add('scroll-top--active');
        } else {
            scrollBtn.classList.remove('scroll-top--active');
        }
    });


    // Add to fav
    const AddFavBtns = document.querySelectorAll('.products__to-fav');

    AddFavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            let nots = document.createElement('div');
            nots.className = 'nots';
            nots.textContent = 'Добавлено в избранное'

            document.body.append(nots);
            setTimeout(() => {
                nots.remove();
            }, 4000);
        });
    });


    // Validation
    const form = document.querySelector('.form'),
        regExpEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+[A-Z]{2,4}$/i;


    const validateElem = elem => {
        if (elem.name == "email") {
            if (!regExpEmail.test(elem.value) && elem.value != '') {
                elem.nextElementSibling.textContent = '* Введите корректный Email!';
            } else {
                elem.nextElementSibling.textContent = '';
            }
        }
    };

    for (let elem of form.elements) {
        if (!elem.classList.contains('form__check') && elem.tagName != 'BUTTON') {
            elem.addEventListener('blur', () => {
                validateElem(elem);
            });
        }
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
        for (let elem of form.elements) {
            if (!elem.classList.contains('form__check') && elem.tagName != 'BUTTON') {
                if (elem.value == '') {
                    elem.nextElementSibling.textContent = '* Заполните это поле!';
                } else {
                    validateElem(elem);
                }
            }
        }

        form.reset();
    });


    // Sort
    const products = document.querySelector('.products__items'),
        sortByPrice = document.querySelector('.filter__by-price'),
        sortByAge = document.querySelector('.filter__by-age');

    for (let i = 0; i < products.children.length; i++) {
        products.children[i].setAttribute('data-price', products.children[i].querySelector('.products__price').textContent.replace(/\D/g, ''));
        products.children[i].setAttribute('data-age', products.children[i].querySelector('.prodcuts__age').textContent.replace(/\D/g, ''));
    }


    const insertAfter = (elem, refElem) => {
        return refElem.parentNode.insertBefore(elem, refElem.nextElementSibling);
    }

    const sortInc = sortType => {
        for (let i = 0; i < products.children.length; i++) {
            for (let j = i; j < products.children.length; j++) {
                if (+products.children[i].getAttribute(sortType) > +products.children[j].getAttribute(sortType)) {
                    let replacedNode = products.replaceChild(products.children[j], products.children[i]);
                    insertAfter(replacedNode, products.children[i]);
                }
            }
        }
    }

    const sortDec = sortType => {
        for (let i = 0; i < products.children.length; i++) {
            for (let j = i; j < products.children.length; j++) {
                if (+products.children[i].getAttribute(sortType) < +products.children[j].getAttribute(sortType)) {
                    let replacedNode = products.replaceChild(products.children[j], products.children[i]);
                    insertAfter(replacedNode, products.children[i]);
                }
            }
        }
    }

    sortByPrice.addEventListener('input', e => {
        if (e.target.value == 'inc') {
            sortInc('data-price');
        } else if (e.target.value == 'dec') {
            sortDec('data-price');
        }
    });

    sortByAge.addEventListener('input', e => {
        if (e.target.value == 'inc') {
            sortInc('data-age');
        } else if (e.target.value == 'dec') {
            sortDec('data-age');
        }
    });
});