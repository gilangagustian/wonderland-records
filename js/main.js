(function() {

    var bodyEl = document.body,
        content = document.querySelector( '.content' ),
        openbtn = document.getElementById( 'menu-button' ),
        closebtn = document.getElementById( 'close-button' ),
        isOpen = false;

    function init() {
        initEvents();
    }

    function initEvents() {
        // openbtn.addEventListener( 'click', toggleMenu );
        if( closebtn ) {
            closebtn.addEventListener( 'click', toggleMenu );
        }

        // close the menu element if the target it´s not the menu element or one of its descendants..
        content.addEventListener( 'click', function(ev) {
            var target = ev.target;
            if( isOpen && target !== openbtn ) {
                toggleMenu();
            }
        } );
    }

    function toggleMenu() {
        if( isOpen ) {
            classie.remove( bodyEl, 'show-menu' );
        }
        else {
            classie.add( bodyEl, 'show-menu' );
        }
        isOpen = !isOpen;
    }

    init();

    // window.onscroll = function() { stickyFunction() };
    // var navbar = document.getElementById("navigation-bar");
    // var sticky = navbar.offsetTop;
    // function stickyFunction() {
    //     if (window.pageYOffset >= sticky) {
    //         navbar.classList.add("sticky")
    //     } else {
    //         navbar.classList.remove("sticky");
    //     }
    // }

    $('#menu-button').click(function () {
        $(this).toggleClass('open');
    });

    setInterval(handleNext, 8000);
    function handleNext() {

        var $radios = $('input[class*="slide-radio"]');
        var $activeRadio = $('input[class*="slide-radio"]:checked');

        var currentIndex = $activeRadio.index();
        var radiosLength = $radios.length;

        $radios
            .attr('checked', false);

        if (currentIndex >= radiosLength - 1) {
            $radios
                .first()
                .attr('checked', true);

        } else {
            $activeRadio
                .next('input[class*="slide-radio"]')
                .attr('checked', true);

        }
    }

    $('#pk_download').click(function (e) {
        $('#pk_download').prop("disabled", true);
        e.preventDefault();
        $.ajax({
            url: "/download_press_kit.php",
            method: "POST",
            data: {email: $("#pk_email").val()},
            success: function ( data ) {
                window.location.href = '/press-kits/Press-Kit-b5739da7785f72df8833982b040e0cc9.zip';
                $('#pk_download').prop("disabled", false);
            },
            error: function ( error ) {
                $("#pk-error-response").fadeIn();
                setTimeout(function () {
                    $("#pk-error-response").fadeOut();
                    $('#pk_download').prop("disabled", false);
                }, 3000);
            }
        });
    });
})();