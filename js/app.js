document.addEventListener('DOMContentLoaded', function () {
  function menu() {
    const menuBG = document.querySelector('.header');
    const menuBody = document.querySelector('.header__body');
    const mobileMenuBody = document.querySelector('.burger-menu__content');
    const linksBody = document.querySelector('.nav__links');
    const links = document.querySelectorAll('.nav__link');

    const checkbox = document.querySelector('.checkbox');
    const mobileMenuButton = document.querySelector('.burger-menu__button');
    const backdrop = document.querySelector('.backdrop');

    const backgroundColor = 'rgb(34, 34, 34)';

    // Переміщаю навігацію до бургер меню
    function moveLinksToOtherBlock() {
      $(window).on('load resize', () => {
        if ($(this).width() <= 992) {
          $(linksBody).prependTo($(mobileMenuBody));
        } else {
          $(linksBody).prependTo($(menuBody));
        }
      });
    }
    moveLinksToOtherBlock();

    // Відкриваю меню при нажимані
    function showMenuMobile() {
      // Анімація відкриття для меню
      function slideRight() {
        // Ширина від 992px до 376px
        if ($(window).width() <= 992 && $(window).width() > 400) {
          if ($(checkbox).prop('checked') === false) {
            $(mobileMenuBody).css('transform', 'translateX(0px)');
            $(backdrop).addClass('backdrop-active');
            $(menuBG).css('background', 'none');
          } else {
            $(mobileMenuBody).css('transform', 'translateX(-300px)');
            $(backdrop).removeClass('backdrop-active');
            $(menuBG).css('background', 'rgba(255, 255, 255, 0.8)');
          }
        }

        // Ширина від 376px до 0px
        else if ($(window).width() <= 400) {
          if ($(checkbox).prop('checked') === false) {
            $(mobileMenuBody).css('transform', 'translateX(0px)');
            $(backdrop).addClass('backdrop-active');
            $(menuBG).css('background', 'none');
          } else {
            $(mobileMenuBody).css('transform', 'translateX(-395px)');
            $(backdrop).removeClass('backdrop-active');
            $(menuBG).css('background', 'rgba(255, 255, 255, 0.8)');
          }
        }

        // Ширина від 992px і вище
        else {
          $(backdrop).removeClass('backdrop-active');
          $(menuBG).css('background', backgroundColor);
        }
      }

      // Ховаю меню при ресайзі
      function closeMenuHover() {
        $(window).on('resize', function () {
          $(checkbox).prop('checked', false);

          // Ширина від 992px до 376px
          if ($(window).width() <= 992 && $(window).width() > 400) {
            $(mobileMenuBody).css('transform', 'translateX(-300px)');
            $(backdrop).removeClass('backdrop-active');
            $(menuBG).css('background', 'rgba(255, 255, 255, 0.8)');
          }

          // Ширина від 376px до 0px
          else if ($(window).width() < 400) {
            $(mobileMenuBody).css('transform', 'translateX(-395px)');
            $(backdrop).removeClass('backdrop-active');
            $(menuBG).css('background', 'rgba(255, 255, 255, 0.8)');
          }

          // Ширина від 992px і вище
          else {
            $(mobileMenuBody).css('transform', 'translateX(0px)');
            $(backdrop).removeClass('backdrop-active');
            $(menuBG).css('background', backgroundColor);
          }
        });
      }
      closeMenuHover();

      // Показую меню при нажиманні на кнопку
      mobileMenuButton.addEventListener('click', function () {
        slideRight();
        $(checkbox).prop('checked', !$(checkbox).prop('checked'));
      });

      // Ховаю меню при нажиманні на силку
      links.forEach(function (link, i) {
        link.addEventListener('click', function () {
          slideRight();
          $(checkbox).prop('checked', !$(checkbox).prop('checked'));
        });
      });

      backdrop.addEventListener('click', function () {
        slideRight();
        $(checkbox).prop('checked', !$(checkbox).prop('checked'));
      });
    }
    showMenuMobile();
  }
  menu();

  function benefitsBlockWidth() {
    const container = document.querySelector('.container');
    const benefitsBody = document.querySelector('.benefits__body');
    const benefitsSection = document.querySelectorAll('.benefits__section');
    const sectionLeftBlock = document.querySelectorAll('.section-block__body_left');
    const sectionRightBlock = document.querySelector('.section-block__body_right');

    $(window).on('load resize', () => {
      const padingValue = calcPadding(benefitsBody, container); // (section-width, container-width)
      const widthValue = calcWidth(benefitsBody, sectionRightBlock, padingValue, 60); // (section-width, text-block, text-block padding, margin)
      const benefitsSectionLeft = [];
      const benefitsSectionRight = [];

      // Calculate padding
      function calcPadding(benefitsBody, container) {
        return (benefitsBody.clientWidth - container.clientWidth) / 2;
      }

      // Calculate width
      function calcWidth(benefitsBody, sectionRightBlock, padingValue, margin) {
        return benefitsBody.clientWidth - sectionRightBlock.clientWidth - padingValue - margin;
      }

      // set width for image block
      function setWidthForImage() {
        if ($(window).width() > 918) {
          sectionLeftBlock.forEach((sectionLeftBlock) => {
            sectionLeftBlock.style.width = widthValue + 'px';
          });
        } else {
          sectionLeftBlock.forEach((sectionLeftBlock) => {
            sectionLeftBlock.style.width = '100%';
          });
        }
      }
      setWidthForImage();

      function setPaddingforTextBlock() {
        benefitsSectionLeft.push(benefitsSection[0], benefitsSection[2]);
        benefitsSectionRight.push(benefitsSection[1], benefitsSection[3]);

        if ($(window).width() > 1250) {
          benefitsSectionLeft.forEach((leftBlock) => {
            leftBlock.style.paddingRight = padingValue + 'px';
          });

          benefitsSectionRight.forEach((rightBlock) => {
            rightBlock.style.paddingLeft = padingValue + 'px';
          });
        } else if ($(window).width() < 1250 && $(window).width() > 918) {
          benefitsSectionLeft.forEach((leftBlock) => {
            leftBlock.style.paddingRight = '20px';
          });

          benefitsSectionRight.forEach((rightBlock) => {
            rightBlock.style.paddingLeft = '20px';
          });
        } else {
          benefitsSectionLeft.forEach((leftBlock) => {
            leftBlock.style.padding = '0';
          });

          benefitsSectionRight.forEach((rightBlock) => {
            rightBlock.style.padding = '0';
          });
        }
      }
      setPaddingforTextBlock();
    });
  }
  benefitsBlockWidth();

  function connectBlockWidth() {
    const container = document.querySelector('.container');
    const connectBody = document.querySelector('.connect__body');
    const leftBlock = document.querySelector('.connect__body_left');
    const rightBlock = document.querySelector('.connect__body_right');

    $(window).on('load resize', () => {
      const padingValue = calcPadding(connectBody, container); // (section-width, container-width)
      const widthValue = calcWidth(connectBody, rightBlock, padingValue, 60); // (section-width, text-block, text-block padding, margin)

      // Calculate padding
      function calcPadding(connectBody, container) {
        return (connectBody.clientWidth - container.clientWidth) / 2;
      }

      // Calculate width
      function calcWidth(connectBody, rightBlock, padingValue, margin) {
        return connectBody.clientWidth - rightBlock.clientWidth - padingValue - margin;
      }

      // set width for image block
      function setWidthForImage() {
        if ($(window).width() > 918) {
          leftBlock.style.width = widthValue + 'px';
        } else {
          leftBlock.style.width = '100%';
        }
      }
      setWidthForImage();

      function setPaddingforTextBlock() {
        if ($(window).width() > 1250) {
          connectBody.style.paddingRight = padingValue + 'px';
        } else if ($(window).width() < 1250 && $(window).width() > 918) {
          connectBody.style.paddingRight = '20px';
        } else {
          connectBody.style.padding = '0';
        }
      }
      setPaddingforTextBlock();
    });
  }
  connectBlockWidth();

  function gallery() {
    Fancybox.bind('.fancybox-img-single', {
      dragToClose: false,

      Toolbar: false,
      closeButton: 'outside',

      Image: {
        zoom: false,
        click: false,
        wheel: 'slide',
      },
    });

    Fancybox.bind('.gallery_images_image img', {
      dragToClose: false,
      groupAll: true,

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

  // // Активний клас для меню при скролі
  // function activeClassMenu() {
  //   const menuLinks = document.querySelectorAll('.link a[href^="#s-"]');
  //   const sections = document.querySelectorAll('.section-anchor');
  //   $(window).on('scroll load', () => {
  //     const scrollTop = scrollY;

  //     sections.forEach((section) => {
  //       if (section.offsetTop <= scrollTop + 500) {
  //         menuLinks.forEach((link) => {
  //           if (link.getAttribute('href').replace('#', '') === section.getAttribute('id')) {
  //             link.classList.add('link-active');
  //           } else {
  //             link.classList.remove('link-active');
  //           }
  //         });
  //       }
  //     });
  //   });
  // }
  // activeClassMenu();

  AOS.init({
    // Global settings:
    once: true,
    duration: 1000,
    delay: 100,
    anchorPlacement: 'top',
  });
});
