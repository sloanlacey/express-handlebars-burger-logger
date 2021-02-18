$(function() {
    $('.change-status').on('click', function(event) {
        const id = $(this).data('id');

        const burgerStatus = {
            devoured: true
        };

        console.log(burgerStatus);

        $.ajax('/api/burgers/' + id, {
            type: 'PUT',
            data: burgerStatus
        }).then(
            function() {
                console.log('Changed burger status to ', burgerStatus.devoured);
                location.reload();
            }
        )
    })

    $('.newBurgerForm').on('submit', function(event) {
        event.preventDefault();

        $('.burgersContainer').show();

        const newBurger = {
            burger_name: $('#newBurgerName').val().trim(),
            devoured: 0
        }

        console.log(newBurger);

        $.ajax('/api/burgers/', {
            type: 'POST',
            data: newBurger
        }).then(
            function() {
                console.log('Created new burger');
                location.reload();
            }
        )
    })
});