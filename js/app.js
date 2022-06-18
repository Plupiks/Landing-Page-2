document.addEventListener('DOMContentLoaded', function () {
  function burgerMenu() {
    const burgerMenuButton = document.querySelector('.burger-menu');
    const checkboxInput = document.querySelector('.checkbox');
    const burgerMenuBody = document.querySelector('.header');
    const links = document.querySelectorAll('.link__items');
    const backdrop = document.querySelector('.backdrop');

    // Слайд вправо дл меню (тільки для моб. пристроїв)
    function slideRight() {
      // Ширина від 992px до 376px
      if ($(window).width() < 992 && $(window).width() > 376) {
        if ($(checkboxInput).prop('checked') === false) {
          $(burgerMenuBody).css('transform', 'translateX(0px)');
          $(backdrop).addClass('backdrop-active');
        } else {
          $(burgerMenuBody).css('transform', 'translateX(-300px)');
          $(backdrop).removeClass('backdrop-active');
        }
      }

      // Ширина від 376px до 0px
      else if ($(window).width() < 376) {
        if ($(checkboxInput).prop('checked') === false) {
          $(burgerMenuBody).css('transform', 'translateX(0px)');
          $(backdrop).addClass('backdrop-active');
        } else {
          $(burgerMenuBody).css('transform', 'translateX(-375px)');
          $(backdrop).removeClass('backdrop-active');
        }
      }

      // Ширина від 992px і вище
      else {
        $(backdrop).removeClass('backdrop-active');
      }
    }

    // Ховаю меню при ресайзі
    $(window).on('resize', function () {
      $(checkboxInput).prop('checked', false);

      // Ширина від 992px до 376px
      if ($(window).width() < 992 && $(window).width() > 376) {
        $(burgerMenuBody).css('transform', 'translateX(-300px)');
        $(backdrop).removeClass('backdrop-active');
      }

      // Ширина від 376px до 0px
      else if ($(window).width() < 376) {
        $(burgerMenuBody).css('transform', 'translateX(-375px)');
        $(backdrop).removeClass('backdrop-active');
      }

      // Ширина від 992px і вище
      else {
        $(burgerMenuBody).css('transform', 'translateX(0px)');
        $(backdrop).removeClass('backdrop-active');
      }
    });

    // Показую меню при нажиманні на кнопку
    burgerMenuButton.addEventListener('click', function () {
      slideRight();
      $(checkboxInput).prop('checked', !$(checkboxInput).prop('checked'));
    });

    // Ховаю меню при нажиманні на силку
    links.forEach(function (link, i) {
      link.addEventListener('click', function () {
        slideRight();
        $(checkboxInput).prop('checked', !$(checkboxInput).prop('checked'));
      });
    });

    backdrop.addEventListener('click', function () {
      slideRight();
      $(checkboxInput).prop('checked', !$(checkboxInput).prop('checked'));
    });
  }
  burgerMenu();

  // API Type JS
  function typeJs() {
    const stringArray = $('.typed').data('typed-items').split(',');
    const typed = new Typed('#typed', {
      strings: [...stringArray],
      typeSpeed: 100,
      backSpeed: 80,
      loop: true,
      backDelay: 1800,
    });
  }
  typeJs();

  // API CountUp JS
  function countOnScroll() {
    if ($('section').hasClass('facts')) {
      // Плавність option
      const easingFn = function (t, b, c, d) {
        var ts = (t /= d) * t;
        var tc = ts * t;
        return b + c * (tc + -3 * ts + 3 * t);
      };

      // Опції option
      const options = {
        easingFn,
        duration: 1.2,
        // enableScrollSpy: false,
        scrollSpyOnce: true,
      };

      const countText = document.querySelectorAll('.facts-ci__number'); // Вибираю елемент який буде мінятись

      //Виконую скріпт count для кожного з текстів
      for (let i = 0; i < countText.length; i++) {
        const countTextValue = countText[i].getAttribute('data-count'); // Отримую значення з дата атрибудів для кожного елементу
        const countUp = new CountUp(countText[i], countTextValue, options); // 1 - елемент в якому міняється число; 2 - наше число

        // Анімації починається тільки коли видно елемент
        $(window).on('load scroll', function () {
          let scrollOffset = scrollY;
          let factsOffset = $('.facts').offset().top - 550;

          if (scrollOffset > factsOffset) {
            countUp.start();
          }
        });
      }
    }
  }
  countOnScroll();

  // API Count JS (for progress bar)
  function ProgressOnScroll() {
    if ($('section').hasClass('skills')) {
      // заповнення прогресбару
      const progressBodyFill1 = document.querySelector('.progress__bar_fill1');
      const progressBodyFill2 = document.querySelector('.progress__bar_fill2');
      const progressBodyFill3 = document.querySelector('.progress__bar_fill3');

      // значення заповнення прогресбару (у відсотках)
      const progressBodyFillValue1 = +progressBodyFill1.getAttribute('data-percent');
      const progressBodyFillValue2 = +progressBodyFill2.getAttribute('data-percent');
      const progressBodyFillValue3 = +progressBodyFill3.getAttribute('data-percent');

      // текст заповнення прогресбару
      const progressTextValue1 = document.querySelector('.progress__label_value1');
      const progressTextValue2 = document.querySelector('.progress__label_value2');
      const progressTextValue3 = document.querySelector('.progress__label_value3');

      // Плавність
      const easingFn = function (t, b, c, d) {
        var ts = (t /= d) * t;
        var tc = ts * t;
        return b + c * (tc + -3 * ts + 3 * t);
      };

      // Опції
      const options = {
        easingFn,
        suffix: '%',
        duration: 1.2,
        enableScrollSpy: false,
        scrollSpyOnce: true,
      };

      // Функція збільшення числа
      const countUp1 = new CountUp(progressTextValue1, progressBodyFillValue1, options);
      const countUp2 = new CountUp(progressTextValue2, progressBodyFillValue2, options);
      const countUp3 = new CountUp(progressTextValue3, progressBodyFillValue3, options);

      // Активую анімацію заповнення при скролі
      $(window).on('load scroll', function () {
        let scrollOffset = scrollY;
        let skillsOffset = $('.skills').offset().top - 650;

        if (scrollOffset > skillsOffset) {
          $(progressBodyFill1).animate({ width: progressBodyFillValue1 + '%' }, 1200);
          $(progressBodyFill2).animate({ width: progressBodyFillValue2 + '%' }, 1200);
          $(progressBodyFill3).animate({ width: progressBodyFillValue3 + '%' }, 1200);

          countUp1.start();
          countUp2.start();
          countUp3.start();
        }
      });
    }
  }
  ProgressOnScroll();

  // Добавляю активний клас при кліку для меню фільтра
  function addActiveClass() {
    let filterItems = document.getElementsByClassName('filter__item');
    let active = document.getElementsByClassName('filter__item_active');
    for (i = 0; filterItems.length > i; i++) {
      filterItems[i].onclick = function () {
        let currentActive = active[0]; //отримуємо той елемент у якого є активний клас

        //При кліку ми удаляємо активний клас у елемента у якого був активний клас
        if (currentActive) {
          currentActive.classList.remove('filter__item_active');
        }

        // Добавляємо активний клас тому елементу на який нажали якщо у нього немає активного класу
        if (filterItems[i] !== currentActive) {
          this.classList.add('filter__item_active');
        }
      };
    }
  }
  addActiveClass();

  // Галлерея фото
  function gallery() {
    //Таким чином вибираю тільки не відфільтровані елементи
    Fancybox.bind('.filtr-item:not(.filteredOut) > img', {
      dragToClose: false,

      Toolbar: false,
      closeButton: 'outside',

      Image: {
        zoom: false,
        click: false,
        wheel: 'slide',
      },

      on: {
        initCarousel: (fancybox) => {
          const slide = fancybox.Carousel.slides[fancybox.Carousel.page];

          fancybox.$container.style.setProperty('--bg-image', `url("${slide.$thumb.src}")`);
        },
        'Carousel.change': (fancybox, carousel, to, from) => {
          const slide = carousel.slides[to];

          fancybox.$container.style.setProperty('--bg-image', `url("${slide.$thumb.src}")`);
        },
      },
    });

    Fancybox.bind('.about__image', {
      dragToClose: false,

      Toolbar: false,
      closeButton: 'outside',

      Image: {
        zoom: false,
        click: false,
        wheel: 'slide',
      },
    });
  }
  gallery();

  // Вирівнюю текст у services по висоті
  function textAlignHeight() {
    // Заголовок
    const servicesTitles = document.querySelectorAll('.services-column__title');
    const servicesTitlesHeight = Array.from(servicesTitles).map((e) => e.offsetHeight);
    const maxHeightTitle = Math.max(...servicesTitlesHeight);
    for (let i = 0; i < servicesTitles.length; i++) {
      servicesTitles[i].style.minHeight = maxHeightTitle + 'px';
    }

    // Текст
    const servicesText = document.querySelectorAll('.services-column__text');
    const servicesTextHeight = Array.from(servicesText).map((e) => e.offsetHeight);
    const maxHeightText = Math.max(...servicesTextHeight);
    for (let i = 0; i < servicesText.length; i++) {
      servicesText[i].style.minHeight = maxHeightText + 'px';
    }
  }
  textAlignHeight();

  //ButtonUp
  function buttonUp() {
    // Показ кнопки
    const buttonUp = document.querySelector('.button-up');
    $(window).on('load resize scroll', function () {
      const offsetTop = scrollY;
      if (offsetTop >= 480) {
        buttonUp.classList.add('button-show');
      } else {
        buttonUp.classList.remove('button-show');
      }
    });

    // Скролл наверх
    buttonUp.addEventListener('click', function () {
      $('html,body').animate({ scrollTop: $('.hero').offset().top + 'px' }, 500);
    });
  }
  buttonUp();

  // Скрол до секції по кліку на силки в меню
  function scrollToSection() {
    const anchors = document.querySelectorAll('a[href^="#s-"]');

    for (let anchor of anchors) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const blockID = anchor.getAttribute('href'); // Отримую силки з назвами блоків до яких буду скролити

        $('html,body').animate({ scrollTop: $('' + blockID).offset().top - 40 + 'px' }, 500);
      });
    }
  }
  scrollToSection();

  // Активний клас для меню при скролі
  function activeClassMenu() {
    const menuLinks = document.querySelectorAll('.link a[href^="#s-"]');
    const sections = document.querySelectorAll('section');
    $(window).on('scroll load', () => {
      const scrollTop = scrollY;

      sections.forEach((section) => {
        if (section.offsetTop <= scrollTop + 500) {
          menuLinks.forEach((link) => {
            if (link.getAttribute('href').replace('#', '') === section.getAttribute('id')) {
              link.classList.add('link-active');
            } else {
              link.classList.remove('link-active');
            }
          });
        }
      });
    });
  }
  activeClassMenu();
});
