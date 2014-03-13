var myMap;

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

function init () {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    myMap = new ymaps.Map('mapPlaces', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center:[55.76, 37.64], // Москва
        zoom:10
    });
    
    myPlacemark1 = new ymaps.Placemark([55.76, 37.64], {
        // Свойства.
        hintContent: ''
    }, {
        // Опции.
        // Своё изображение иконки метки.
        iconImageHref: 'images/place-pin-free.png',
        // Размеры метки.
        iconImageSize: [40, 46],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-16, -41]
    });
    
    myPlacemark2 = new ymaps.Placemark([55.75, 37.65], {
        // Свойства.
        hintContent: ''
    }, {
        // Опции.
        // Своё изображение иконки метки.
        iconImageHref: 'images/place-pin-free.png',
        // Размеры метки.
        iconImageSize: [42, 48],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-21, -48]
    });
    
    myPlacemark3 = new ymaps.Placemark([55.73, 37.63], {
        // Свойства.
        hintContent: ''
    }, {
        // Опции.
        // Своё изображение иконки метки.
        iconImageHref: 'images/place-pin-free.png',
        // Размеры метки.
        iconImageSize: [42, 48],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-21, -48]
    });
    
    myMap.geoObjects
        .add(myPlacemark1)
        .add(myPlacemark2)
        .add(myPlacemark3);
        
    MyButtonLayout = ymaps.templateLayoutFactory.createClass(
            '<button style="display:none;" class="btn btn-large[if state.selected] active[endif]" title="$[data.title]">' +
                '<i class="icon-fullscreen icon-large"/>' +
            '</button>', {
                build: function () {
                    this.constructor.superclass.build.apply(this, arguments);

                    this._button = this.getData().control;
                    this._container = $('#mapPlaces');
                    this._smallSize = {
                        position: 'relative',
                        width: 1200,
                        height: 340,
                        marginLeft:-110
                    };
                    this._fullSize = {
                        position: 'fixed',
                        top: 0,
                        left:0,
                        width : $(window).width(),
                        height : $(window).height(),
                        zIndex: 10,
                        marginLeft: 0
                    }

                    this._attachHandlers();
                },
                clear: function () {
                    this._detachHandlers();

                    this.constructor.superclass.clear.apply(this, arguments);
                },
                _attachHandlers: function () {
                    this._button.events
                        .add(['select', 'deselect'], this._onButtonClick, this);
                },
                _detachHandlers: function () {
                    this._button.events
                        .remove(['select', 'deselect'], this._onButtonClick, this);
                },
                _onButtonClick: function (e) {
                    var map = this._button.getMap(),
                        state = this._button.state;

                    if(state.get('selected')) {
                        this._container
                            .css(this._fullSize);
                    }
                    else {
                        this._container
                            .css(this._smallSize);
                    }

                    map.container.fitToViewport();
                }
                
                
                
            }
        ),

        // Создание кнопки полноэкранного режима просмотра карты.
        button = new ymaps.control.Button({
            data: {
                title: 'Разворачивает карту на весь экран'
            }
        }, {
            // selectOnClick: false,
            layout: MyButtonLayout
        });
        
        $(".fullscreen-button").on("click",function() {
          $(".btn-large").click();
          $(this).find(".fullscreen-ico").toggleClass("fullscreen-ico-act");
          if ($(".fullscreen-ico").hasClass("fullscreen-ico-act")) {
            $(this).find("span").html("Свернуть");
            myMap.behaviors.enable('scrollZoom');
          } else {
            $(this).find("span").html("На весь экран");
            myMap.behaviors.disable('scrollZoom');
          }
        });

    // Добавление панели инструментов на карту
    myMap.controls.add(button, { top : 10, left : 10 });
    
    
    
    
    
    $(".map-buttons .map-button").click(function() {
      $(".map-buttons .map-button").removeClass("map-button-act");
      $(this).addClass("map-button-act");
      
      if ($(this).hasClass("map-mkad")) {
        myMap.setCenter([55.76, 37.64]);
        myMap.setZoom(10)
      }
      
      if ($(this).hasClass("map-ttk")) {
        myMap.setCenter([55.76, 37.64]);
        myMap.setZoom(11)
      }
      
      if ($(this).hasClass("map-all")) {
        myMap.setCenter([55.76, 37.64]);
        myMap.setZoom(8)
      }
      
    })

}